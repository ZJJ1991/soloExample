// Copyright (c) 2018 The VeChainThor developers

// Distributed under the GNU Lesser General Public License v3.0 software license, see the accompanying
// file LICENSE or <https://www.gnu.org/licenses/lgpl-3.0.html>

package genesis

import (
	"crypto/ecdsa"
	"math/big"
	"sync/atomic"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/vechain/thor/builtin"
	"github.com/vechain/thor/state"
	"github.com/vechain/thor/thor"
	"github.com/vechain/thor/tx"
	"github.com/vechain/thor/vm"
)

// DevAccount account for development.
type DevAccount struct {
	Address    thor.Address
	PrivateKey *ecdsa.PrivateKey
}

var devAccounts atomic.Value

// DevAccounts returns pre-alloced accounts for solo mode.
// All the devAccounts will be used as either the Authority node endorsor or approver.
func DevAccounts() []DevAccount {
	if accs := devAccounts.Load(); accs != nil {
		return accs.([]DevAccount)
	}

	var accs []DevAccount
	privKeys := []string{
		"dce1443bd2ef0c2631adc1c67e5c93f13dc23a41c18b536effbbdcbcdb96fb65",
		"321d6443bc6177273b5abf54210fe806d451d6b7973bccc2384ef78bbcd0bf51",
		"2d7c882bad2a01105e36dda3646693bc1aaaa45b0ed63fb0ce23c060294f3af2",
		"593537225b037191d322c3b1df585fb1e5100811b71a6f7fc7e29cca1333483e",
		"ca7b25fc980c759df5f3ce17a3d881d6e19a38e651fc4315fc08917edab41058",
		"88d2d80b12b92feaa0da6d62309463d20408157723f2d7e799b6a74ead9a673b",
		"fbb9e7ba5fe9969a71c6599052237b91adeb1e5fc0c96727b66e56ff5d02f9d0",
		"547fb081e73dc2e22b4aae5c60e2970b008ac4fc3073aebc27d41ace9c4f53e9",
		"c8c53657e41a8d669349fc287f57457bd746cb1fcfc38cf94d235deb2cfca81b",
		"87e0eba9c86c494d98353800571089f316740b0cb84c9a7cdf2fe5c9997c7966",
	}
	for _, str := range privKeys {
		pk, err := crypto.HexToECDSA(str)
		if err != nil {
			panic(err)
		}
		addr := crypto.PubkeyToAddress(pk.PublicKey)
		accs = append(accs, DevAccount{thor.Address(addr), pk})
	}
	devAccounts.Store(accs)
	return accs
}

// NewDevnet create genesis for solo mode.
func NewDevnet() *Genesis {
	launchTime := uint64(1526400000) // 'Wed May 16 2018 00:00:00 GMT+0800 (CST)'

	initialtestAuthorityNodes := loadtestAuthorityNodes()
	initialtestApprover := loadtestApprovers()

	builder := new(Builder).
		GasLimit(thor.InitialGasLimit).
		Timestamp(launchTime).
		State(func(state *state.State) error {
			// alloc precompiled contracts
			for addr := range vm.PrecompiledContractsByzantium {
				state.SetCode(thor.Address(addr), emptyRuntimeBytecode)
			}

			// setup builtin contracts
			state.SetCode(builtin.Authority.Address, builtin.Authority.RuntimeBytecodes())
			state.SetCode(builtin.Energy.Address, builtin.Energy.RuntimeBytecodes())
			state.SetCode(builtin.Params.Address, builtin.Params.RuntimeBytecodes())
			state.SetCode(builtin.Prototype.Address, builtin.Prototype.RuntimeBytecodes())
			state.SetCode(builtin.Extension.Address, builtin.Extension.RuntimeBytecodes())
			state.SetCode(builtin.Executor.Address, builtin.Executor.RuntimeBytecodes())
			tokenSupply := &big.Int{}
			energySupply := &big.Int{}

			// alloc tokens for approver
			for _, approver := range initialtestApprover {
				tokenSupply.Add(tokenSupply, thor.InitialProposerEndorsement) // here we allocate same amount of VET to approvers
				energy, _ := new(big.Int).SetString("1000000000000000000000000000", 10)

				energySupply.Add(energySupply, energy)

				state.SetBalance(approver.address, thor.InitialProposerEndorsement)
				state.SetEnergy(approver.address, &big.Int{}, launchTime)
			}

			// alloc tokens for authority node endorsor
			for _, anode := range initialtestAuthorityNodes {
				tokenSupply.Add(tokenSupply, thor.InitialProposerEndorsement)
				energy, _ := new(big.Int).SetString("1000000000000000000000000000", 10)

				energySupply.Add(energySupply, energy)

				state.SetBalance(anode.endorsorAddress, thor.InitialProposerEndorsement)
				state.SetEnergy(anode.endorsorAddress, &big.Int{}, launchTime)
			}

			// for _, a := range DevAccounts() {
			// 	bal, _ := new(big.Int).SetString("1000000000000000000000000000", 10)
			// 	state.SetBalance(a.Address, bal)
			// 	state.SetEnergy(a.Address, bal, launchTime)
			// 	tokenSupply.Add(tokenSupply, bal)
			// 	energySupply.Add(energySupply, bal)
			// }
			builtin.Energy.Native(state, launchTime).SetInitialSupply(tokenSupply, energySupply)
			return nil
		}).
		Call(
			tx.NewClause(&builtin.Params.Address).WithData(mustEncodeInput(builtin.Params.ABI, "set", thor.KeyExecutorAddress, new(big.Int).SetBytes(builtin.Executor.Address[:]))),
			thor.Address{}).
		Call(
			tx.NewClause(&builtin.Params.Address).WithData(mustEncodeInput(builtin.Params.ABI, "set", thor.KeyRewardRatio, thor.InitialRewardRatio)),
			builtin.Executor.Address).
		Call(
			tx.NewClause(&builtin.Params.Address).WithData(mustEncodeInput(builtin.Params.ABI, "set", thor.KeyBaseGasPrice, thor.InitialBaseGasPrice)),
			builtin.Executor.Address).
		Call(
			tx.NewClause(&builtin.Params.Address).WithData(mustEncodeInput(builtin.Params.ABI, "set", thor.KeyProposerEndorsement, thor.InitialProposerEndorsement)),
			builtin.Executor.Address)

	// Since the dev accounts are all used as either the approver or authority node endorsors. Once we load those node, there is no need to load dev accounts again.
	// for i, a := range DevAccounts() {
	// 	builder.Call(
	// 		tx.NewClause(&builtin.Authority.Address).WithData(mustEncodeInput(builtin.Authority.ABI, "add", a.Address, a.Address, thor.BytesToBytes32([]byte(fmt.Sprintf("a%v", i))))),
	// 		executor)
	// }

	// add initial authority nodes
	for _, anode := range initialtestAuthorityNodes {
		data := mustEncodeInput(builtin.Authority.ABI, "add", anode.masterAddress, anode.endorsorAddress, anode.identity)
		builder.Call(tx.NewClause(&builtin.Authority.Address).WithData(data), builtin.Executor.Address)
	}

	// add initial approvers (steering committee)
	for _, approver := range loadtestApprovers() {
		data := mustEncodeInput(builtin.Executor.ABI, "addApprover", approver.address, thor.BytesToBytes32([]byte(approver.identity)))
		builder.Call(tx.NewClause(&builtin.Executor.Address).WithData(data), builtin.Executor.Address)
	}

	id, err := builder.ComputeID()
	if err != nil {
		panic(err)
	}

	return &Genesis{builder, id, "devnet"}
}

// Use the first 7 devAccounts to mock up the actual approvers' addresses.
func loadtestApprovers() []*approver {
	return []*approver{
		{DevAccounts()[0].Address, "CY Cheung"},
		{DevAccounts()[1].Address, "George Kang"},
		{DevAccounts()[2].Address, "Jay Zhang"},
		{DevAccounts()[3].Address, "Margaret Rui Zhu"},
		{DevAccounts()[4].Address, "Peter Zhou"},
		{DevAccounts()[5].Address, "Renato Grottola"},
		{DevAccounts()[6].Address, "Sunny Lu"},
	}
}

//Use some fake data to mock up the real Authority nodes. However, in mainnet there are 101 Authority nodes.
func loadtestAuthorityNodes() []*authorityNode {
	all := [...][3]string{
		{"0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22", DevAccounts()[7].Address.String(), "0xb11c5752af4c9ab07e7379e693e47ffba97e1f4f686128cea601b2ea64646732"},
		{"0x6cd336cd6766fc8370821166325fb9e8e4a986b6", DevAccounts()[8].Address.String(), "0x0ff7f5023e49ab9f558d7d9a743fb3a864ebde1f2497b896b527f970a292d7da"},
		{"0x05fbe2524837b5768fbc2c6a4a6741a6ae78546d", DevAccounts()[9].Address.String(), "0x99d558729d67bd21e2a945d4064bc6111e6c9162d41cd0c3384615fb87189e69"},
	}

	candidates := make([]*authorityNode, 0, len(all))
	for _, item := range all {
		candidates = append(candidates, &authorityNode{
			masterAddress:   mustParseAddress(item[0]),
			endorsorAddress: mustParseAddress(item[1]),
			identity:        mustParseBytes32(item[2]),
		})
	}
	return candidates
}
