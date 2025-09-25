import { network } from "hardhat";

// Connect to the desired network.
// Replace "hardhat" with the network name you wish to deploy to,
// as configured in your hardhat.config.ts file.
const { ethers } = await network.connect({
  network: "hardhatOp", // Example: "sepolia", "polygon", etc.
});

async function main() {
  // Get the deployer account.
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy the contract.
  const simpleStorage = await ethers.deployContract("SimpleStorage", [
    /* Add constructor arguments here if any */
  ]);
  await simpleStorage.waitForDeployment();
  console.log(`SimpleStorage deployed to ${simpleStorage.target}`);

  // Call retrieve before updating.
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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});