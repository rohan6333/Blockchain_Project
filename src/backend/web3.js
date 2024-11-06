require('dotenv').config();
const Web3 = require('web3');
const contractABI = require('../../build/contracts/CredentialVerification.json').abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const credentialContract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { web3, credentialContract };
