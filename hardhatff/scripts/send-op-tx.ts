import { network } from "hardhat";
import hre from "hardhat";
import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

// const hre = require("hardhat");
// const { ethers } = hre;



// Connect to the desired network.
// Replace "hardhat" with the network name you wish to deploy to,
// as configured in your hardhat.config.ts file.
const { ethers } = await network.connect({
  network: "sepolia", // Example: "sepolia", "polygon", etc.
});

async function main() {
  const [deployer] = await ethers.getSigners();
  //getting dep account
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  //deploying
  const simpleStorage = await ethers.deployContract("SimpleStorage", [
  ]);
  await simpleStorage.waitForDeployment();
  console.log(`SimpleStorage deployed to ${simpleStorage.target}`);


  //what happens if we deploy to out hardhat network.
  const chainId = (await ethers.provider.getNetwork()).chainId; //alternate to network.config.chainId
  if(chainId === 11155111n && process.env.ETHERSCAN_API_KEY) { //check if it's already verified or not,
    await simpleStorage?.deploymentTransaction()?.wait(6); //wait for 6 blocks
    await verify(await simpleStorage.getAddress(), []); //do if not
  }


  //interacting with the contract
  //retrieve function
  let currentValue = await simpleStorage.retrieve();
  console.log("Current favNo:", currentValue.toString());

  // Update the stored value.
  const tx = await simpleStorage.store(42); // Example: update favNo to 42
  await tx.wait(); // Wait for the transaction to be mined
  console.log("Updated favNo to 42");

  // Call retrieve again after updating.
  let updatedValue = await simpleStorage.retrieve();
  console.log("Updated favNo after store:", updatedValue.toString());
}


//verification
async function verify(contractAddress : string,  args : any[]) {
  try {
    console.log("Verifying contract...");
    await verifyContract(
        {
          address: contractAddress,
          constructorArgs: args,
          provider: "etherscan", // or "blockscout"
        },
        hre,
    );
    console.log("Verification successful");
  } catch (e : any) {
    const errorMessage = e?.message || e.toString(); // get string from error
    if(errorMessage.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.error("Verification Error" + e);
    }
  }
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});