const ethers = require("ethers");
const fs = require("fs");

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7575")
    //contract provider network on which the contract is being deployed

    const wallet = new ethers.Wallet( "0x593bb9ebf902381231699871714a389bd40051ecd866724aa5e276350cc1c38c" ,provider);
    //walled private key for signing off contracts, and give permissions to perform operations

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); //abi after compilation of the contract
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8"); //binary after compilation of the contract
    //yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
    //make sure that we have the same version of solc compiler as the solidity version of compiler.(same side)


    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    // creation of the contract


    console.log("Deploying pliss wait");
    const contract = await contractFactory.deploy(); //waiting till deployment completion
    // console.log(contract) //the contract

    const transactionReceipt = await contract.deploymentTransaction().wait(1);
    //the deployed transaction..
    console.log("deployed successfully")
    // console.log("here's the deployed transaction");
    // console.log(contract.deploymentTransaction);
    //
    // console.log("here's the transaction receipt");
    // console.log(transactionReceipt);

}

main().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
})