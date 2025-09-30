const { ethers, network, run } = require("hardhat");

async function main() {
    console.log("📦 Deploying FundMe...");

    const FundMeFactory = await ethers.getContractFactory("FundMe");
    const fundMe = await FundMeFactory.deploy();

    await fundMe.waitForDeployment();

    const contractAddress = await fundMe.getAddress();
    console.log(`✅ FundMe deployed at: ${contractAddress}`);
    console.log("🌐 Network:", network.name);

    // --- Optional: Verify on Etherscan ---
    if (network.name === "sepolia" && process.env.ETHERSCAN_API_KEY) {
        console.log("⏳ Waiting for a few block confirmations before verification...");
        // Wait for a few confirmations so Etherscan indexer catches the deployment
        await fundMe.deploymentTransaction().wait(5);

        console.log("🔍 Verifying contract on Etherscan...");
        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: [], // FundMe has no constructor args
            });
            console.log("✅ Verified successfully!");
        } catch (e) {
            if (e.message.toLowerCase().includes("already verified")) {
                console.log("ℹ️ Contract is already verified.");
            } else {
                console.error("❌ Verification failed:", e);
            }
        }
    } else {
        console.log("ℹ️ Skipping verification (either not on Sepolia or missing API key)");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});