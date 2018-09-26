// ES5 style
const thorify = require("thorify").thorify;
const Web3 = require("web3");

const web3 = thorify(new Web3(), "http://localhost:8669");
import {
    cry,
    abi,
    RLP,
    Transaction
} from 'thor-devkit'

// web3.eth.getBlock("latest").then(function(res:any){
//     console.log(res)
// });
// Best block info will be displayed

const approver1Add = '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'
const approver1PrivateKey = '0xdce1443bd2ef0c2631adc1c67e5c93f13dc23a41c18b536effbbdcbcdb96fb65'
const approver2Add = '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'
const approver2PrivateKey = '0x321d6443bc6177273b5abf54210fe806d451d6b7973bccc2384ef78bbcd0bf51'
const approver3Add = '0x733b7269443c70de16bbf9b0615307884bcc5636'
const approver3PrivateKey = '0x2d7c882bad2a01105e36dda3646693bc1aaaa45b0ed63fb0ce23c060294f3af2'
const approver4Add = '0x115eabb4f62973d0dba138ab7df5c0375ec87256'
const approver4PrivateKey = '0x593537225b037191d322c3b1df585fb1e5100811b71a6f7fc7e29cca1333483e'
const approver5Add = '0x199b836d8a57365baccd4f371c1fabb7be77d389'
const approver5PrivateKey = '0xca7b25fc980c759df5f3ce17a3d881d6e19a38e651fc4315fc08917edab41058'
const approver6Add = '0x5e4efedf3d71232340280d8bc475421352994b63'
const approver6PrivateKey = '0x88d2d80b12b92feaa0da6d62309463d20408157723f2d7e799b6a74ead9a673b'
const approver7Add = '0x29f72dc07224a4c6270407bfd6b8fec559d29f6c'
const approver7PrivateKey = '0xfbb9e7ba5fe9969a71c6599052237b91adeb1e5fc0c96727b66e56ff5d02f9d0'

const MasterNode1Add = "0x47109a193c49862c89bd76fe2de3585743dd2bb0"
const MasterNode1PrivateKey = "0x547fb081e73dc2e22b4aae5c60e2970b008ac4fc3073aebc27d41ace9c4f53e9"

const MasterNode2Add = "0xa5e255d4c65af201b97210ff4cd9521a46427654"
const MasterNode2PrivateKey = "0xc8c53657e41a8d669349fc287f57457bd746cb1fcfc38cf94d235deb2cfca81b"

const MasterNode3Add = "0x0489a3fff1930b85f1d73eff8a4699281aadb558"
const MasterNode3PrivateKey = "0x87e0eba9c86c494d98353800571089f316740b0cb84c9a7cdf2fe5c9997c7966"

const ExecutorAddress = '0x0000000000000000000000004578656375746f72'
const ExecutorAbi = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "approvers", "outputs": [{ "name": "identity", "type": "bytes32" }, { "name": "inPower", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "approverCount", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_approver", "type": "address" }], "name": "revokeApprover", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes32" }], "name": "proposals", "outputs": [{ "name": "timeProposed", "type": "uint64" }, { "name": "proposer", "type": "address" }, { "name": "quorum", "type": "uint8" }, { "name": "approvalCount", "type": "uint8" }, { "name": "executed", "type": "bool" }, { "name": "target", "type": "address" }, { "name": "data", "type": "bytes" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_approver", "type": "address" }, { "name": "_identity", "type": "bytes32" }], "name": "addApprover", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_target", "type": "address" }, { "name": "_data", "type": "bytes" }], "name": "propose", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_contract", "type": "address" }], "name": "attachVotingContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_proposalID", "type": "bytes32" }], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_contract", "type": "address" }], "name": "detachVotingContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_proposalID", "type": "bytes32" }], "name": "execute", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "votingContracts", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "proposalID", "type": "bytes32" }, { "indexed": false, "name": "action", "type": "bytes32" }], "name": "Proposal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "approver", "type": "address" }, { "indexed": false, "name": "action", "type": "bytes32" }], "name": "Approver", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "contractAddr", "type": "address" }, { "indexed": false, "name": "action", "type": "bytes32" }], "name": "VotingContract", "type": "event" }]
const ExecutorContract = new web3.eth.Contract(ExecutorAbi, ExecutorAddress);

const AuthorityAdd = "0x0000000000000000000000417574686f72697479"
const proposalID = "0xb4dd4eedb83933b6e013971585befe56e26e4f0a875aea0938f406563e53eadb";

const ParamsAdd = "0x0000000000000000000000000000506172616d73"


async function proposeAddMaster() {

    var methodId = web3.eth.abi.encodeFunctionSignature("add(address,address,bytes32)")
    console.log(methodId)
    var signerAdd: string = '3ed57ec5e5576f4940eb73c42b498972bf2d4393'
    var endorsorAdd = '77a171346b890769c28042f633bd79b2077415f5'

    var identity = cry.keccak256('TestIdentityTESTSSSS').toString('hex')
    console.log(identity)

    var parameters = web3.eth.abi.encodeParameters(['address', 'address', 'bytes32'], [signerAdd, endorsorAdd, '0x' + identity])
    console.log(parameters)
    
    var data = methodId + parameters.substr(2)
    console.log(data)


    web3.eth.accounts.wallet.add({
        privateKey: approver1PrivateKey,
        address: approver1Add
    })

    var proposalResult = await ExecutorContract.methods.propose(AuthorityAdd, data).send({ from: approver1Add, gas: 800000 })
    var proposalId = proposalResult.outputs[0].events[0].topics[1]
    return proposalId
}

async function proposeRevokeMaster() {

    var methodId = web3.eth.abi.encodeFunctionSignature("revoke(address)")
    console.log(methodId)
    var signerAdd: string = '3ed57ec5e5576f4940eb73c42b498972bf2d4393'

    var parameter = web3.eth.abi.encodeParameter('address', signerAdd)
    console.log(parameter)
    
    var data = methodId + parameter.substr(2)
    console.log(data)


    web3.eth.accounts.wallet.add({
        privateKey: approver1PrivateKey,
        address: approver1Add
    })

    var proposalResult = await ExecutorContract.methods.propose(AuthorityAdd, data).send({ from: approver1Add, gas: 800000 })
    var proposalId = proposalResult.outputs[0].events[0].topics[1]
    return proposalId
}


async function proposeAddApprover() {
    var methodId = web3.eth.abi.encodeFunctionSignature("addApprover(address,bytes32)")
    var approverAdd = '3ed57ec5e5576f4940eb73c42b498972bf2d4393'
    var identity = cry.keccak256('NewTestApprover').toString('hex')
    var parameters = web3.eth.abi.encodeParameters(['address', 'bytes32'],[approverAdd, '0x' + identity])
    var data = methodId + parameters.substr(2)
    console.log(data)

    web3.eth.accounts.wallet.add({
        privateKey: approver2PrivateKey,
        address: approver2Add
    })
    var proposalResult = await ExecutorContract.methods.propose(ExecutorAddress, data).send({ from: approver2Add, gas: 800000 })
    var proposalId = proposalResult.outputs[0].events[0].topics[1]
    return proposalId
}

async function proposeRevokeApprover() {

    var methodId = web3.eth.abi.encodeFunctionSignature("revokeApprover(address)")
    console.log(methodId)
    var approverAdd = '3ed57ec5e5576f4940eb73c42b498972bf2d4393'

    var parameter = web3.eth.abi.encodeParameter('address', approverAdd)
    console.log(parameter)
    
    var data = methodId + parameter.substr(2)
    console.log(data)


    web3.eth.accounts.wallet.add({
        privateKey: approver1PrivateKey,
        address: approver1Add
    })

    var proposalResult = await ExecutorContract.methods.propose(ExecutorAddress, data).send({ from: approver1Add, gas: 800000 })
    var proposalId = proposalResult.outputs[0].events[0].topics[1]
    return proposalId
}


async function proposeAttach() {
    var methodId = web3.eth.abi.encodeFunctionSignature("attachVotingContract(address)")

    var votingContract = "0x0dcd2f752394c41875e259e00bb44fd505297caf"
    votingContract = votingContract.substr(2)
    console.log('votingContract: ', votingContract)

    var data = methodId + web3.eth.abi.encodeParameter("address", votingContract).substr(2)
    console.log('data: ', data)
    web3.eth.accounts.wallet.add({
        privateKey: approver3PrivateKey,
        address: approver3Add
    })
    var proposalResult = await ExecutorContract.methods.propose(ExecutorAddress, data).send({ from: approver3Add, gas: 800000 })
    var proposalId = proposalResult.outputs[0].events[0].topics[1]
    return proposalId
}

async function proposeDetach() {
    var methodId = web3.eth.abi.encodeFunctionSignature("detachVotingContract(address)")

    var votingContract = "0x0dcd2f752394c41875e259e00bb44fd505297caf"
    votingContract = votingContract.substr(2)
    console.log('votingContract: ', votingContract)

    var data = methodId + web3.eth.abi.encodeParameter("address", votingContract).substr(2)
    console.log('data: ', data)
    web3.eth.accounts.wallet.add({
        privateKey: approver3PrivateKey,
        address: approver3Add
    })
    var proposalResult = await ExecutorContract.methods.propose(ExecutorAddress, data).send({ from: approver3Add, gas: 800000 })
    var proposalId = proposalResult.outputs[0].events[0].topics[1]
    return proposalId
}


async function proposeSetParams(){
    var methodId = web3.eth.abi.encodeFunctionSignature("set(bytes32,uint256)")
    var ParameterHex = web3.utils.asciiToHex('reward-ratio')
    // var key = web3.utils.hexToBytes(ParameterHex)
    var value = 4000

    var parameters = web3.eth.abi.encodeParameters(['bytes32', 'uint256'], [ParameterHex, value])
    var data = methodId + parameters.substr(2)
    console.log('data: ', data)
    web3.eth.accounts.wallet.add({
        privateKey: approver3PrivateKey,
        address: approver3Add
    })
    var proposalResult = await ExecutorContract.methods.propose(ParamsAdd, data).send({ from: approver3Add, gas: 800000 })
    var proposalId = proposalResult.outputs[0].events[0].topics[1]
    return proposalId

}

async function get(){

    var ParameterHex = web3.utils.asciiToHex('reward-ratio')
    var parameters = web3.eth.abi.encodeParameters(['bytes32'], [ParameterHex])

    // convert the hex to bytes, which now should be of length 32
    var rewardRatioBytes = web3.utils.hexToBytes(ParameterHex)

    const ParamsAbi = [{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"executor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"key","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Set","type":"event"}]
    const ParamsContract = new web3.eth.Contract(ParamsAbi, ParamsAdd)
    
    // All the above steps are for getting a proper bytes32 format parameter, so now it's ready to call the contract function.
    ParamsContract.methods.get(rewardRatioBytes).call().then(function(result:any){
        console.log('get reward-ratio parameter result: ', result)
    })
}




async function approve() {
    var proposalId = await proposeSetParams()
    console.log('proposal id: ', proposalId)
    web3.eth.accounts.wallet.add({
        privateKey: approver1PrivateKey,
        address: approver1Add
    })
    web3.eth.accounts.wallet.add({
        privateKey: approver2PrivateKey,
        address: approver2Add
    })
    web3.eth.accounts.wallet.add({
        privateKey: approver3PrivateKey,
        address: approver3Add
    })
    web3.eth.accounts.wallet.add({
        privateKey: approver4PrivateKey,
        address: approver4Add
    })
    web3.eth.accounts.wallet.add({
        privateKey: approver5PrivateKey,
        address: approver5Add
    })
    web3.eth.accounts.wallet.add({
        privateKey: approver6PrivateKey,
        address: approver6Add
    })
    web3.eth.accounts.wallet.add({
        privateKey: approver7PrivateKey,
        address: approver7Add
    })
    await ExecutorContract.methods.approve(proposalId).send({ from: approver1Add, gas: 500000 })
        .then(function (apporveResult: any) {
            console.log('approve result 1: ', apporveResult)
        })
    await ExecutorContract.methods.approve(proposalId).send({ from: approver2Add, gas: 500000 })
        .then(function (apporveResult: any) {
            console.log('approve result 2: ', apporveResult)
        })
    await ExecutorContract.methods.approve(proposalId).send({ from: approver3Add, gas: 500000 })
        .then(function (apporveResult: any) {
            console.log('approve result 3: ', apporveResult)
        })
    await ExecutorContract.methods.approve(proposalId).send({ from: approver4Add, gas: 500000 })
        .then(function (apporveResult: any) {
            console.log('approve result 4: ', apporveResult)
        })
    await ExecutorContract.methods.approve(proposalId).send({ from: approver5Add, gas: 500000 })
        .then(function (apporveResult: any) {
            console.log('approve result 5: ', apporveResult)
        })
    await ExecutorContract.methods.approve(proposalId).send({ from: approver6Add, gas: 500000 })
        .then(function (apporveResult: any) {
            console.log('approve result 6: ', apporveResult)
        })
    await ExecutorContract.methods.approve(proposalId).send({ from: approver7Add, gas: 500000 })
        .then(function (apporveResult: any) {
            console.log('approve result 7: ', apporveResult)
        })
    return proposalId
}


async function exe(){
    web3.eth.accounts.wallet.add({
        privateKey: approver7PrivateKey,
        address: approver7Add
    })
    var proposalId = await approve()
    await ExecutorContract.methods.execute(proposalId).send({ from: approver7Add, gas: 500000 })
    .then(function (executeResult: any) {
        console.log('execute result: ', executeResult)
    })
}

// exe()
get()





function getTx() {
    web3.eth.getTransaction('0xfc5fcd36ea4a367e9c83eae7788c4d60f74bb8a4aefad38ed2a9c8ac54179ca5').then(function (result: any) {
        console.log('tx result 1: ', result)
        // console.log('topic 1: ', result.outputs[0].events[0].topics[1])
        // console.log('outputs: ', result.outputs[0].events[0])

    })


    web3.eth.getTransactionReceipt('0xfc5fcd36ea4a367e9c83eae7788c4d60f74bb8a4aefad38ed2a9c8ac54179ca5').then(function (result: any) {
        console.log('tx result: ', result)
        // console.log('topic 1: ', result.outputs[0].events[0].topics[1])
        // console.log('outputs: ', result.outputs[0].events[0])

    })
}
// getTx()



function getPastLogs() {
    web3.eth.getPastLogs({
        address: "0x0000000000000000000000004578656375746f72",
        topics: [
            '0x7d9bcf5c6cdade398a64a03053a982851ccea20dc827dbc130754b9e78c7c31a',
            '0xb9469a4a2b582ec4bbc4bbbf943e60e0466b35bf2fab99665d5a613ab6bd28bd'
        ]
    }).then(function (logs: any) {
        console.log('past logs: ', logs)
    })
}
// getPastLogs()

function getPastEvents() {
    ExecutorContract.getPastEvents('Proposal', {
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error: any, events: any) { console.log(events); })
        .then(function (events: any) {
            console.log(events) // same results as the optional callback above
        });
}
// getPastEvents()






async function sendTransaction() {

    web3.eth.accounts.wallet.add({
        privateKey: approver3PrivateKey,
        address: approver3Add
    })

    var endorsorAdd = '0x77a171346b890769c28042f633bd79b2077415f5'
    var signerAdd: string = '3ed57ec5e5576f4940eb73c42b498972bf2d4393'

    var _value = 1000000 * Math.pow(10, 18)
    await web3.eth.sendTransaction({
        from: approver3Add,
        to: signerAdd,
        value: '10000000000000000000000000'
    }).then(function (txResult: any) {
        console.log('tx result: ', txResult)
    })

    await web3.eth.getBalance(approver1Add).then(function (balResult: any) {
        console.log('balance result of approver 1 : ', balResult)
    })

    await web3.eth.getBalance(endorsorAdd).then(function (balResult: any) {
        console.log('balance result: ', balResult)
    })
}

// sendTransaction()

