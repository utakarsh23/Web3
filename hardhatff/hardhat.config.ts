import type { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PVT_KEY;
const rpcUrl = process.env.SEP_RPC_URL;


console.log(privateKey)
console.log(rpcUrl)

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";

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
