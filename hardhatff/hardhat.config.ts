import type { HardhatUserConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";
dotenv.config();

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";


const privateKey = process.env.PVT_KEY || "";
const rpcUrl = process.env.SEP_RPC_URL || "";
const etherScanAPiKey = process.env.ETHERSCAN_API_KEY || "";


const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.19",
      },
      production: {
        version: "0.8.19",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    },
  },
  verify: {
    etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: etherScanAPiKey,
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type : "http",
      url: rpcUrl || configVariable("rpc_url"),
      accounts: privateKey ? [privateKey] : [configVariable("SEPOLIA_PRIVATE_KEY")],
      chainId : 11155111,
    },
  },
};

export default config;
