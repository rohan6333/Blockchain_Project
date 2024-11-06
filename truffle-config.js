// truffle-config.js
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost
      port: 7545,         // Port for Ganache
      network_id: "*",    // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",    // Specify the compiler version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
