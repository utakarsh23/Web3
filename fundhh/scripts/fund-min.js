const { ethers } = require("hardhat");
require("dotenv").config();

const AGG_ABI = [
    "function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)",
    "function decimals() view returns (uint8)"
];

const FEED_DEFAULT = "0x694AA1769357215DE4FAC081bf1f309aDC325306"; // Sepolia ETH/USD
const MINIMUM_USD = 50n * 10n ** 18n; // 50 USD with 18 decimals

async function main() {
    const CONTRACT_ADDR = process.env.CONTRACT_ADDR;
    if (!CONTRACT_ADDR) throw new Error("Missing CONTRACT_ADDR");

    const [signer] = await ethers.getSigners();

    // 1) Read price from Chainlink (must be Sepolia or a Sepolia fork)
    const feedAddr = process.env.FEED_ADDR || FEED_DEFAULT;
    const feed = new ethers.Contract(feedAddr, AGG_ABI, ethers.provider);

    const [, answer] = await feed.latestRoundData(); // int256-like
    const dec = await feed.decimals();               // typically 8

    // ✅ make everything BigInt before math
    const answerBI   = BigInt(answer.toString());
    const decimalsBI = BigInt(dec.toString());
    const price18    = answerBI * (10n ** (18n - decimalsBI)); // scale to 18d

    if (price18 <= 0n) {
        throw new Error("Price read is zero/invalid. Are you on localhost WITHOUT forking or a mock feed?");
    }

    // 2) Solve for minimal wei: price*eth/1e18 >= 50e18  =>  eth >= 50e36/price
    const weiNeeded = (MINIMUM_USD * 10n ** 18n + (price18 - 1n)) / price18; // ceil-div

    console.log("ETH/USD (18d):", price18.toString());
    console.log("Sending:", ethers.formatEther(weiNeeded), "ETH");

    // 3) Call fund()
    const fundMe = await ethers.getContractAt("FundMe", CONTRACT_ADDR, signer);
    const tx = await fundMe.fund({ value: weiNeeded });
    const rc = await tx.wait();
    console.log("Fund tx:", rc?.hash);

    const bal = await ethers.provider.getBalance(CONTRACT_ADDR);
    console.log("Contract balance:", ethers.formatEther(bal), "ETH");
}

main().catch((e) => { console.error(e); process.exit(1); });