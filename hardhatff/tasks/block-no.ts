// import { task } from "hardhat/config";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
//
// // Define the task
// task("block-number", "Prints the current block number")
//     // .addParam (or similar) would go here if you needed arguments
//     .setAction(
//         async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
//             // taskArgs is the first argument, even if empty (like {})
//
//             console.log("Fetching the current block number...");
//
//             // Access the provider via ethers.js from the Hardhat Runtime Environment (hre)
//             const blockNumber: number = await hre.ethers.provider.getBlockNumber();
//
//             console.log(`Current block number: ${blockNumber}`);
//         }
//     );
//
// // You don't necessarily need 'export {};' unless you are ensuring the file is treated as a module.
// // If this file (e.g., tasks/block-number.ts) is imported in hardhat.config.ts, the task will be registered.