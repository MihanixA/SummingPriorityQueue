require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-solhint')

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {}
  },
  solidity: {
    version: '0.8.7',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
