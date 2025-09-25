require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const pvtKey = process.env.PVT_KEY
const sepRpcUrl = process.env.SEP_RPC_URL
const ethApiKey = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: ethApiKey
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: sepRpcUrl,
      accounts: [`0x${pvtKey}`],
      chainId: 11155111,
    },
    hardhat: {
      // This is the default network when you run `npx hardhat test`
    }
  }
};
