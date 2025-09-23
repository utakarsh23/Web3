// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;


//importing lib 
import "./PriceConverter.sol";

contract FundMe {


    using PriceConverter for uint256;
    

    uint256 public minimumUsd = 50 * 1e18;

    address[] public funders; //list of address of funders
    mapping(address => uint256) public addressToAmountFunded;

    function fund() payable public {
        //Want to be able to send minimum fund amount in USD
        //1. How do we send ETH to this contract
        //trying to set an minimum amount to be sent as 1 ETH, if less then shows the message
        // require(msg.value > 1e18, "Didn't send enough !!!!");
        //money maths is done in term of WEI so 1 eth is set as 10^18

        //with library we can also do msg.value.getConversionRate(), huhhhhhhh (ref : ProceConverter(it's a creted lib))
        // require(msg.value >= minimumUsd, "Didn't send enough !!!!");
        // require(getConversionRate(msg.value) >= minimumUsd, "Didn't send enough !!!!"); //-> msg.val -> eth or blockchain currency being sent
        require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enough !!!!");
        //here getConversionRate is not asking for any parameters but in the getConversionRate() methos, it is asking for uint256
        //here, it(the library function) takes map.value as the first parameter.  
        //this is valid for only first parameter, it the fuction holds more than one parameter then we have to provide the second and more(not 1st) parameter in the function here,
        //                          ~~ refer PriceConverter.sol(getConversionRate()) for referance

        funders.push(msg.sender); //-> msg.sender holds the user address(who calls the fund function)--> 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 //idk how
        addressToAmountFunded[msg.sender] += msg.value;
    }

    //     uint256 favNo;
    //     //revert -> undo any action before and send remaining gas back
    //     function fund() payable public {
    //     favNo = 5;    //if fails then this will not be changed due to revertion
    //     require(msg.value > 1e18, "Didn't send enough !!!!");
    //     -->> if this fails then the gas used till here gets used and the remaining gas by will be given back to the user
    // }
    // image the above method takes 100 gas, and before require it uses 18, the require uses 10, the rest uses the rest,
    // so if the require is false/fails for the consition, then the rest of the(72 gas) is returned back and won't be used.



    function withdraw() public { //withdrawing all the amount in the contract to zero --> remvove funders and amount of address as well

        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        //reset the array
        funders = new address[](0); 
        //withdraw the fund 
        //there are three diff ways to withdraw fund 
        /*
        1 : Transfer
        2 : Send
        3 : Call
        */

        // //Transfer -> max of 2300 gas else fails
        // payable(msg.sender).transfer(address(this).balance); //typecast (msg.sender) type to payable sender type which was an address orginally, 

        // //Send -> max of 2300 gas and returns bool
        // bool sendSucess = payable(msg.sender).send(address(this).balance);
        // require(sendSucess, "Send Failed");

        //Call -> forward all gas or set gas, returns bool
        //native and most used way to send or recieve eth or native token
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call Failed");
    }


}
