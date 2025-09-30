require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


const { SEP_RPC_URL, PVT_KEY, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: { url: SEP_RPC_URL },
    },
    sepolia: {
      url: SEP_RPC_URL, // or Infura RPCnpm i
      accounts: PVT_KEY ? [PVT_KEY] : [],
    },

    localhost: { url: "http://127.0.0.1:8545" },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY, // For contract verification
  },
};