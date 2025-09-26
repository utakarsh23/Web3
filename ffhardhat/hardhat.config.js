require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


const { SEP_RPC_URL, PVT_KEY, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {}, // local Hardhat network
    sepolia: {
      url: SEP_RPC_URL, // or Infura RPCnpm i
      accounts: PVT_KEY ? [PVT_KEY] : [],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY, // For contract verification
  },
};