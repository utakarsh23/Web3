const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();
const pvt_key = process.env.PVT_KEY;
const rpc_url = process.env.RPC_URL;
const password = process.env.PASSWORD;
async function main() {

    const provider = new ethers.JsonRpcProvider(rpc_url);
    const wallet = new ethers.Wallet(pvt_key, provider);
    const encryptedJsonKey = await wallet.encrypt(password);
    console.log(encryptedJsonKey)
    fs.writeFileSync("encryptedWallet.json", encryptedJsonKey);
}

main().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
})