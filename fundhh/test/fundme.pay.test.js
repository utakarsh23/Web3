const { expect } = require("chai");
const { ethers } = require("hardhat");

const FEED = process.env.FEED_ADDR || "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const AGG_ABI = [
    "function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)",
    "function decimals() view returns (uint8)"
];
const MIN_USD = 50n * 10n ** 18n;

describe("FundMe payments (fork)", function () {
    it("fund() meets MINIMUM_USD", async function () {
        const addr = process.env.CONTRACT_ADDR;
        if (!addr) this.skip();

        const [user] = await ethers.getSigners();
        const c = await ethers.getContractAt("FundMe", addr, user);

        const feed = new ethers.Contract(FEED, AGG_ABI, ethers.provider);
        const [, ans] = await feed.latestRoundData();
        const dec = await feed.decimals();

        const price18 = BigInt(ans) * 10n ** BigInt(18 - dec);
        const weiNeeded = (MIN_USD * 10n ** 18n + (price18 - 1n)) / price18;

        const before = await ethers.provider.getBalance(addr);
        await (await c.fund({ value: weiNeeded })).wait();
        const after = await ethers.provider.getBalance(addr);
        expect(after - before).to.equal(weiNeeded);
    });
});