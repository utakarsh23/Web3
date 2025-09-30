// scripts/just-send.js
const { ethers } = require("hardhat");

async function main() {
    const [signer] = await ethers.getSigners();
    const provider = signer.provider;

    // // Sanity: correct network?
    // const chainId = await signer.getChainId();
    // if (chainId !== 11155111) {
    //     throw new Error(`Wrong network. ChainId=${chainId}. Use --network sepolia`);
    // }

    // Destination: set TO in .env or default to self (for testing)
    const to = process.env.TO || signer.address;

    // EIP-1559 fees (with conservative fallbacks)
    const feeData = await provider.getFeeData();
    const maxFeePerGas =
        feeData.maxFeePerGas ?? ethers.parseUnits("60", "gwei");
    const maxPriorityFeePerGas =
        feeData.maxPriorityFeePerGas ?? ethers.parseUnits("1.5", "gwei");

    // Gas for a plain ETH transfer
    const gasLimit = 21000n;

    const balance = await provider.getBalance(signer.address);

    // Keep a small buffer for fee variance
    const buffer = ethers.parseEther("0.0005"); // ~0.0005 ETH

    const maxGasCost = gasLimit * maxFeePerGas;
    const spendable = balance - maxGasCost - buffer;

    if (spendable <= 0n) {
        throw new Error(
            `Insufficient funds. Balance=${ethers.formatEther(balance)} ETH; ` +
            `Need at least ~${ethers.formatEther(maxGasCost + buffer)} ETH for gas.`
        );
    }

    // If you want to cap the send, set SEND_ETH in .env (e.g., 0.005)
    const cap = process.env.SEND_ETH
        ? ethers.parseEther(process.env.SEND_ETH)
        : null;

    const value = cap ? (cap < spendable ? cap : spendable) : spendable;

    console.log(`Sending ${ethers.formatEther(value)} ETH to ${to}...`);

    const tx = await signer.sendTransaction({
        to,
        value,
        gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
    });

    console.log(`Tx sent: ${tx.hash}`);
    const rcpt = await tx.wait();
    console.log(`Mined in block ${rcpt.blockNumber}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});