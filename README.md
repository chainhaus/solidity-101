# Solidity 101 BlockchainNYC.io Session

This is from the http://blockchainnyc.io Solidity session I gave on June 19th, 2018 at Rise NYC. I use pure programmatic means to compile and deploy a smart contract to Ethereum Ganache, Rinkeby and mainnet. Uses little to no scaffolding code, zero deployment tools. 

# Setup

## Installation

* Download and install Node.js 10.x.x http://nodejs.org

## Required npm Packages

* Windows only: npm install -g --production windows-build-tools
* npm install --save truffle-hdwallet-provider
* npm install --save solc
* npm install --save ganache-cli
* npm install --save web3
* npm install --save config

## Infura
Obtain an access key from Infura http://infura.io

## Config file
In default.json, insert your 12 word mnemonic and Infura access key

## Run
To run: 

node app.js
