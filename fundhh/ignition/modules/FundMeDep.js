const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FundMe", (m) => {
    // Deploy SimpleStorage with no constructor args
    const fundMe = m.contract("FundMe");

    // // After deployment, call store(42)
    // m.call(fundMe, "store", [42]);
    //
    // // Add a person to array
    // m.call(fundMe, "addPerson", ["Alice", 77]);
    //
    // // Add a person to mapping
    // m.call(fundMe, "addPersonMap", ["Bob", 99]);


    return { fundMe };
});