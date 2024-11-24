const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config(); 
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", 
    },
    rinkeby: { 
      provider: function() {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY, 
          `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}` 
        );
      },
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY, 
          `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}` 
        );
      },
      network_id: 1, 
      gas: 5500000,
      gasPrice: 10000000000, 
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
