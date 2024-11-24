
# Decentralized Credential Verification Platform
## Problem Statement
Currently, verifying someone's skills or credentials (such as degrees, certifications, or work experience) requires reliance on centralized institutions, organizations, or councils that issue or maintain records. These institutions are often slow, inefficient, and prone to errors, particularly in the context of cross-border verification. The challenge becomes even more significant when dealing with global-level engagements or when skills are acquired outside of formal academic institutions.
This project aims to solve these problems by creating a decentralized, automated platform where individuals can register their credentials and have their records verified by relevant institutions or organizations. These records are securely stored using decentralized technologies, allowing users to confirm their qualifications quickly and reliably when needed.
## Why is this Problem Important?
In today’s job market, skill verification is often centralized, inefficient, and difficult to authenticate across borders. By using a decentralized and automated system, both employers and individuals/freelancers can benefit from a tamper-proof mechanism for the prompt validation of their skills and achievements. This promotes transparency and trust in the hiring and engagement processes, which is crucial for a dynamic global economy.
## Technologies Used
- **Ethereum Blockchain**: For decentralized, immutable storage of credential metadata.
- **Solidity**: Smart contract language to handle credential issuance, storage, and verification.
- **IPFS (InterPlanetary File System)**: To store credential files in a decentralized manner.
- **Web3.js/Ethers.js**: For interaction between the frontend and the Ethereum blockchain.
- **React**: Used for building the frontend interface.
- **Node.js & Express**: For backend API and server-side logic.
- **MetaMask**: To enable users to interact with Ethereum smart contracts via their wallets.
- **Truffle**: For development, testing, and deployment of smart contracts.
- **Ganache**: Local Ethereum blockchain used for testing.
## Project Structure
```plaintext
Decentralized-credential-verification/
│
├── contracts/                    # All Solidity smart contracts
│   └── CredentialVerification.sol
│
├── migrations/                   # Migration scripts for deploying contracts
│   └── 1_initial_migration.js
│
├── test/                         # Smart contract test files
│   └── CredentialVerification.test.js
│
├── src/                          # Main source code directory
│   ├── backend/                  # Backend logic and APIs (Node.js, Express, etc.)
│   │   ├── server.js             # Backend server entry point
│   │   ├── routes/               # API routes for backend
│   │   │   └── credentialRoutes.js
│   │   └── controllers/          # Controllers for managing business logic
│   │       └── credentialController.js
│   │
│   ├── frontend/                 # Frontend code (React)
│   │   ├── public/               # Public assets
│   │   │   ├── index.html
│   │   │   └── favicon.ico
│   │   ├── src/                  # React source files
│   │   │   ├── components/       # UI components
│   │   │   ├── App.js            # Main React app file
│   │   │   └── index.js          # React app entry point
│   │
│   ├── utils/                    # Utility scripts and helpers
│   │   └── ipfsHelper.js         # Helper for interacting with IPFS
│
├── config/                       # Config files for different environments
│   └── config.js                 # Environment variables, API keys, etc.
│
├── build/                        # Build directory for compiled frontend files (created after running build)
│
├── .gitignore                    # List of files/folders to be ignored by Git
├── package.json                  # Node.js dependencies and scripts
├── README.md                     # Project documentation
├── truffle-config.js             # Truffle configuration for smart contract development
└── .env                          # Environment variables
```
## Smart Contract Overview
### CredentialVerification.sol
This Solidity contract handles the core functionality of storing and verifying credentials. When a user uploads a credential, its hash is stored on the Ethereum blockchain, ensuring tamper-proof verification. Employers or institutions can query the blockchain to verify the authenticity of credentials.
### IPFS Integration
We use IPFS for decentralized storage of credential files. The credential file itself is stored on IPFS, while only the hash (generated from the file) is stored on the blockchain. This ensures that the storage remains scalable while keeping the blockchain lightweight.
## How it Works
1. **Credential Submission**: Users upload credentials (e.g., certificates) through the frontend. These documents are uploaded to IPFS, and a hash of the file is generated.
2. **Blockchain Interaction**: The credential's hash is stored on the Ethereum blockchain via the smart contract. The contract associates the hash with the user's Ethereum address.
3. **Verification**: Employers or institutions can query the blockchain to verify the authenticity of credentials by comparing the hash stored on-chain with the document retrieved from IPFS.
4. **Decentralized Proof**: This ensures that credentials are tamper-proof and can be verified without reliance on centralized authorities.
## Setup Instructions
### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your machine.
- **Truffle**: Install Truffle for smart contract development.
- **Ganache**: Install Ganache to run a local Ethereum blockchain.
- **MetaMask**: Install MetaMask in your browser to interact with the Ethereum blockchain.
- **IPFS**: Install IPFS (or use a cloud-based solution like Infura).
## Step-by-Step Guide
### Clone the repository:
```bash
git clone https://github.com/yourusername/decentralized-credential-verification.git
cd decentralized-credential-verification
```
### Install dependencies:
```bash
npm install
```
### Configure environment variables:
Create a `.env` file in the root directory with the necessary environment variables (e.g., Ethereum node URLs, API keys for IPFS).
### Compile smart contracts:
```bash
truffle compile
```
### Deploy smart contracts locally:
Run Ganache to start a local Ethereum blockchain. Deploy the contracts:
```bash
truffle migrate --network development
```
### Run the backend server:
```bash
cd src/backend
node server.js
```
### Run the frontend:
```bash
cd src/frontend
npm start
```
## Running Tests
To run smart contract tests, use the following command:
```bash
truffle test
```
npm start
sudo -u postgres psql