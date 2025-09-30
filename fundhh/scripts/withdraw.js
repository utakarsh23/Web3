const { ethers } = require("hardhat");

async function main() {
    const CONTRACT_ADDR = process.env.CONTRACT_ADDR;
    if (!CONTRACT_ADDR) throw new Error("Missing CONTRACT_ADDR");
    const [owner] = await ethers.getSigners();
    const c = await ethers.getContractAt("FundMe", CONTRACT_ADDR, owner);
    const tx = await c.withdraw();
    console.log("Withdraw tx:", (await tx.wait())?.hash);
}
main().catch((e) => { console.error(e); process.exit(1); });