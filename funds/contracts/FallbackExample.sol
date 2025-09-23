// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FallbackExample {

    uint public result;


    //we do not add func keyword before this as it's already defines in solidity that revieve() is a special function
    //it gets triggered anytime when the transation is made to this contact
    //Triggers when contract recieves some ETH or token without any calldata
    receive() external payable {
        result = 1;
    }

    //if the data being sent is not defined then this is triggered
    //The contract receives ETH with some data that doesn’t match any function signature
    //There’s no receive() function, and ETH is sent with empty calldata.
    fallback() external payable {
        result = 2;
    }


    /*
    Which function is called, fallback() or receive()?

           send Ether
               |
         msg.data is empty?
              / \
            yes  no
            /     \
      receive()  exists?  fallback()
         /   \
        yes   no
        /      \
    receive()   fallback()
    */




}