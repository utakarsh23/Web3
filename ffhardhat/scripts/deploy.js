const { ethers } = require("hardhat");

async function main() {
    const unlockTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hrs from now

    const FFHardhat = await ethers.getContractFactory("Lock");
    console.log("Deploying FFHardhat...");

    const ffHardhat = await FFHardhat.deploy(unlockTime, { value: ethers.parseEther("0.01") });

    // Instead of ffHardhat.deployed(), just wait for tx confirmation
    await ffHardhat.waitForDeployment();

    console.log("FFHardhat deployed to:", await ffHardhat.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});