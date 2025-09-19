// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";


contract StorageFactory {


    SimpleStorage[] public simpleStorageArray;
    SimpleStorage public simpleStorages;


        function createSimpleStorageContract() public  {
            simpleStorages = new SimpleStorage(); //new - creating a new contract
        }

        function createSimpleStorageContract1() public  {
            SimpleStorage simpleStorage = new SimpleStorage(); //new - creating a new contract
            simpleStorageArray.push(simpleStorage);
        }


        //store and retrieve, array functions in Solidity 

        function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
            //Address
            //ABI - Application Binary Interface
            SimpleStorage simpleStorage =  simpleStorageArray[_simpleStorageIndex];
            simpleStorage.store(_simpleStorageNumber);
            // simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
        }


        function sfget(uint256 _simpleStorageIndex) view public returns(uint256) {
            SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
            return simpleStorage.retrieve();

            //or 
            // return simpleStorageArray[_simpleStorageIndex].retrieve();
        }
}