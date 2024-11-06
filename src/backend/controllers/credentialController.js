const { web3, credentialContract } = require('../web3');
require('dotenv').config();

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

// Issue a new credential
exports.issueCredential = async (req, res) => {
    const { holderAddress, credentialHash } = req.body;

    try {
        const result = await credentialContract.methods.issueCredential(holderAddress, credentialHash)
            .send({ from: account.address, gas: 500000 });

        res.status(200).json({ message: 'Credential issued successfully', transaction: result });
    } catch (error) {
        console.error('Error issuing credential:', error);
        res.status(500).json({ message: 'Error issuing credential', error: error.message });
    }
};

// Get credentials for a holder
exports.getCredentials = async (req, res) => {
    const { holderAddress } = req.params;

    console.log('Fetching credentials for:', holderAddress);

    try {
        if (!web3.utils.isAddress(holderAddress)) {
            return res.status(400).json({ message: 'Invalid holder address format.' });
        }

        const credentials = await credentialContract.methods.getCredentials(holderAddress).call();
        console.log('Retrieved credentials:', credentials);

        if (!credentials || credentials.length === 0) {
            return res.status(200).json({ message: 'No credentials found for this holder.', credentials });
        }

        res.status(200).json({ credentials });
    } catch (error) {
        console.error('Error retrieving credentials:', error);
        res.status(500).json({ message: 'Error retrieving credentials', error: error.message });
    }
};

// Verify a credential for a holder
exports.verifyCredential = async (req, res) => {
    const { holderAddress, credentialHash } = req.body;

    try {
        if (!web3.utils.isAddress(holderAddress)) {
            return res.status(400).json({ message: 'Invalid holder address format.' });
        }

        const isValid = await credentialContract.methods.verifyCredential(holderAddress, credentialHash).call();
        res.status(200).json({ isValid });
    } catch (error) {
        console.error('Error verifying credential:', error);
        res.status(500).json({ message: 'Error verifying credential', error: error.message });
    }
};
