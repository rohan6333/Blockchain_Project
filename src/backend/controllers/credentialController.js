const csv = require('csv-parser');
const fs = require('fs');
const crypto = require('crypto');
const { web3, credentialContract } = require('../web3');
const credentialsData = {};

function generateCredentialHash(data) {
    const { holderAddress = '', organizationName = '', certificate = '', period = '', cgpa = '' } = data;
    const uniqueDataString = `${holderAddress}-${organizationName}-${certificate}-${period}-${cgpa}`;
    return `0x${crypto.createHash('sha256').update(uniqueDataString).digest('hex')}`;
}

// Manually issue a credential
exports.issueCredentialManual = async (req, res) => {
    const { holderAddress, organizationName, certificate, period, cgpa } = req.body;

    if (!web3.utils.isAddress(holderAddress)) {
        return res.status(400).json({ message: 'Invalid holder address format.' });
    }

    const credentialHash = generateCredentialHash({ holderAddress, organizationName, certificate, period, cgpa });

    try {
        const result = await credentialContract.methods.issueCredential(holderAddress, credentialHash)
            .send({ from: web3.eth.accounts.wallet[0].address, gas: 500000 });

        if (!credentialsData[holderAddress]) {
            credentialsData[holderAddress] = [];
        }

        credentialsData[holderAddress].push({
            issuer: web3.eth.accounts.wallet[0].address,
            holderAddress,
            credentialHash,
            organizationName,
            certificate,
            period,
            cgpa,
            timestamp: Date.now(),
            isRevoked: false,
        });

        res.status(200).json({ message: 'Credential issued successfully', credentialHash, transaction: result });
    } catch (error) {
        console.error('Error issuing credential manually:', error);
        res.status(500).json({ message: `Error issuing credential: ${error.message}` });
    }
};

// Bulk issue credentials from a CSV file
exports.bulkIssueCredential = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded. Please provide a CSV file.' });
    }

    const filePath = req.file.path;
    const credentials = [];
    const results = [];
    const failed = [];

    try {
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => credentials.push(row))
                .on('end', resolve)
                .on('error', reject);
        });

        for (const credential of credentials) {
            const { holderAddress, organizationName, certificate, period, cgpa } = credential;

            if (!web3.utils.isAddress(holderAddress)) {
                console.error(`Invalid address in CSV: ${holderAddress}`);
                failed.push({ ...credential, error: 'Invalid holder address' });
                continue;
            }

            const credentialHash = generateCredentialHash({ holderAddress, organizationName, certificate, period, cgpa });

            try {
                const result = await credentialContract.methods.issueCredential(holderAddress, credentialHash)
                    .send({ from: web3.eth.accounts.wallet[0].address, gas: 500000 });

                if (!credentialsData[holderAddress]) {
                    credentialsData[holderAddress] = [];
                }

                credentialsData[holderAddress].push({
                    issuer: web3.eth.accounts.wallet[0].address,
                    holderAddress,
                    credentialHash,
                    organizationName,
                    certificate,
                    period,
                    cgpa,
                    timestamp: Date.now(),
                    isRevoked: false,
                });

                results.push({ holderAddress, credentialHash, transactionHash: result.transactionHash });
            } catch (error) {
                console.error(`Error issuing credential for ${holderAddress}:`, error);
                failed.push({ ...credential, error: error.message });
            }
        }

        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'Bulk credentials processed', issued: results, failed });
    } catch (error) {
        console.error('Error in bulk credential issuance:', error);
        res.status(500).json({ message: `Bulk credential issuance failed: ${error.message}` });
    }
};

// Retrieve credentials for a holder
exports.getCredentials = async (req, res) => {
    const { holderAddress } = req.params;
  
    if (!web3.utils.isAddress(holderAddress)) {
      return res.status(400).json({ message: 'Invalid holder address format.' });
    }
  
    try {
      const credentials = credentialsData[holderAddress] || [];
      res.status(200).json({ credentials });
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      res.status(500).json({ message: 'Error retrieving credentials', error: error.message });
    }
  };  

// Verify a credential
exports.verifyCredential = async (req, res) => {
    const { holderAddress, credentialHash } = req.body;

    try {
        if (credentialHash) {
            const credentials = Object.values(credentialsData).flat();
            const credential = credentials.find(c => c.credentialHash === credentialHash && !c.isRevoked);

            if (credential) {
                res.status(200).json({
                    isValid: true,
                    ...credential,
                    message: 'Credential verified successfully',
                });
            } else {
                res.status(404).json({ isValid: false, message: 'Credential not found or revoked' });
            }
        } else if (holderAddress) {
            const credentials = credentialsData[holderAddress] || [];
            res.status(200).json({ credentials, message: 'Credentials retrieved successfully' });
        } else {
            res.status(400).json({ message: 'Either holderAddress or credentialHash is required' });
        }
    } catch (error) {
        console.error('Error verifying credential:', error);
        res.status(500).json({ message: `Error verifying credential: ${error.message}` });
    }
};
