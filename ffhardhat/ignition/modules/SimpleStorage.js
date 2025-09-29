// ignition/modules/SimpleStorage.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleStorageModule", (m) => {
  // Deploy SimpleStorage with no constructor args
  const simpleStorage = m.contract("SimpleStorage");

  // After deployment, call store(42)
  m.call(simpleStorage, "store", [42]);

  // Add a person to array
  m.call(simpleStorage, "addPerson", ["Alice", 77]);

  // Add a person to mapping
  m.call(simpleStorage, "addPersonMap", ["Bob", 99]);

  return { simpleStorage };
});