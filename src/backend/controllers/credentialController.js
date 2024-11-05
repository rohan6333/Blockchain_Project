// src/backend/controllers/credentialController.js

const Web3 = require('web3');
const CredentialVerification = require('../../../build/contracts/CredentialVerification.json');



// Setup web3 provider (make sure this matches your Ganache settings)
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

let contract;
const initContract = async () => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = CredentialVerification.networks[networkId];

    if (deployedNetwork) {
        contract = new web3.eth.Contract(
            CredentialVerification.abi,
            deployedNetwork && deployedNetwork.address
        );
    } else {
        throw new Error('CredentialVerification contract not deployed to detected network');
    }
};

// Initialize the contract
initContract().catch(console.error);

// Controller methods

// Get value from contract
exports.getValue = async (req, res) => {
    try {
        const value = await contract.methods.value().call();
        res.status(200).json({ value });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Set value in contract
exports.setValue = async (req, res) => {
    const { newValue } = req.body;

    try {
        // Get the list of accounts
        const accounts = await web3.eth.getAccounts();

        // Send the transaction using the first account from Ganache
        await contract.methods.setValue(newValue).send({ from: accounts[0] });

        res.status(200).json({ message: 'Value updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
