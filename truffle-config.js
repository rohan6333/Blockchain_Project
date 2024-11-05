module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost (default: none)
      port: 8545,         // Standard Ethereum port (Ganache CLI default)
      network_id: "*",    // Match any network id
    }
  },
  mocha: {
    // timeout: 100000 can be uncommented if tests require longer than the default Mocha timeout
  },
  compilers: {
    solc: {
      version: "0.8.21",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"  // Try different versions like "petersburg" or "byzantium" if "istanbul" doesn't work
      }
    }
  }
};
