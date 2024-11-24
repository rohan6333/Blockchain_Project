require('dotenv').config();
const Web3 = require('web3');
const contractABI = require('../../build/contracts/CredentialVerification.json').abi;

// Validate environment variables
if (!process.env.RPC_URL) throw new Error('RPC_URL is not defined in environment variables');
if (!process.env.PRIVATE_KEY) throw new Error('PRIVATE_KEY is not defined in environment variables');
if (!process.env.CONTRACT_ADDRESS) throw new Error('CONTRACT_ADDRESS is not defined in environment variables');

// Initialize Web3 with a provider derived from environment variables
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

// Securely manage account using environment variables
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const credentialContract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

module.exports = { web3, credentialContract };
