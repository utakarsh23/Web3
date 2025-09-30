const { ethers } = require("hardhat");

async function main() {
    const FFHardhat = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying FFHardhat...");

    const ffHardhat = await FFHardhat.deploy();
    await ffHardhat.waitForDeployment();

    const contractAddress = await ffHardhat.getAddress();
    console.log("✅ FFHardhat deployed to:", contractAddress);

    // --- INTERACT WITH THE CONTRACT ---

    // 1. Store a favorite number
    console.log("Storing favNo = 42...");
    const storeTx = await ffHardhat.store(42);
    await storeTx.wait();

    // 2. Retrieve the stored number
    const currentValue = await ffHardhat.retrieve();
    console.log("📦 Current favNo:", currentValue.toString());

    // 3. Add a person to the array
    console.log("Adding a person: Alice -> 77");
    const addPersonTx = await ffHardhat.addPerson("Alice", 77);
    await addPersonTx.wait();

    // 4. Add a person to the mapping
    console.log("Adding to mapping: Bob -> 99");
    const addPersonMapTx = await ffHardhat.addPersonMap("Bob", 99);
    await addPersonMapTx.wait();

    // 5. Read from mapping
    const bobFavNo = await ffHardhat.nameToFavNo("Bob");
    console.log("🗺️ Bob's favNo from mapping:", bobFavNo.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});