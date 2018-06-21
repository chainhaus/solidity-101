/*

Written by Jamiel Sheikh
jamiel@overridelabs.com

Node packages required:

Windows only: npm install -g --production windows-build-tools
npm install --save truffle-hdwallet-provider
npm install --save solc
npm install --save ganache-cli
npm install --save web3
npm install --save config


*/

// Prove app starts
console.log('Solidity coding 101');

// Load up libraries
const ganache = require('ganache-cli');
const Web3 = require('web3');
const config = require('config');
const solc = require('solc'); // npm install -g solc
const path = require('path');
const fs = require('fs');

// Locate and load marriage smart contract
const contractLocation = path.resolve(__dirname,'contracts','Marriage.sol');
const contract = fs.readFileSync(contractLocation,'utf8');

// Display text of contract
console.log(contract);

// Anon async function to handle async function calls using await instead of passing callback functions
var run = async() => {

    // Connect to ganache-cli ethereum "simulator" via web3 interface
    web3 = new Web3(ganache.provider());

    // Display accounts
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log(accounts[0]);

    // Compile smart contract and extract
    compiled = solc.compile(contract,1).contracts[':Marriage'];

    // Interface and bytecode are bifurcated
    console.log(compiled.interface);
    console.log(compiled.bytecode);

    // Interface is used to build out object model
    marriageContract = await new web3.eth.Contract(JSON.parse(compiled.interface))
        .deploy({data: '0x' + compiled.bytecode})
        .send({gas:'1000000',from:accounts[0]});
    

    console.log(marriageContract);
    
    // Display hashes
    console.log('Contract hash address',marriageContract.options.address);
    
    // Invoke smart contract
    marriageCertificate = await marriageContract.methods.obtainMarriageLicense('dad','mom').send({from:accounts[0]});
    transactionHash = marriageCertificate.transactionHash;
    console.log('Transaction hash: ', transactionHash);
    
    // Read state of contract
    response = await marriageContract.methods.husband().call();
    console.log('Retrieve husband: ', response);
    
    // Hint: Use getBlock to see merkle roots

    // https://faucet.rinkeby.io/ to get eth into Rinkeby account

    // Deploy now to Rinkeby via Infura
    mnemonic = config.get('mnemonic');
    console.log("My menomic: ", mnemonic);

    mnemonic = config.get('mnemonic');
    infuraAccessKey = config.get('infuraAccessKey');
    console.log("My menomic: ", mnemonic); 
    console.log("My key: ", infuraAccessKey);
    
    // Reset web3 to point to Rinkeby on Infura
    const HDWalletProvider = require('truffle-hdwallet-provider');
    infuraURL = "https://rinkeby.infura.io/" + infuraAccessKey
    provider = new HDWalletProvider(mnemonic,infuraURL);
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();

    // Compile and deploy
    marriageContract = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({data: '0x' + compiled.bytecode})
    .send({gas:'1000000',from:accounts[0]}); 
    console.log('Rinkeby contract hash address',marriageContract.options.address); 

    marriageContract = await new web3.eth.Contract(JSON.parse(compiled.interface),'0x3970abfB6b304f54B6Ac0D0D96DDe33b473d170C');
    marriageCertificate = await marriageContract.methods.obtainMarriageLicense('jack','jill').send({from:accounts[0]});

    // Switch to mainnet - Requires real eth
    infuraURL = "https://mainnet.infura.io/" + infuraAccessKey
    provider = new HDWalletProvider(mnemonic,infuraURL);
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();

    marriageContract = await new web3.eth.Contract(JSON.parse(compiled.interface))
     .deploy({data: '0x' + compiled.bytecode})
     .send({gas:'1000000',from:accounts[0]}); 
    console.log('Mainnet contract hash address',marriageContract.options.address); 
    marriageCertificate = await marriageContract.methods.obtainMarriageLicense('jack','jill').send({gas:'1000000',from:accounts[0]});
}

run();