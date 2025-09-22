// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


contract FundMe {
    

        uint256 public minimumUsd = 50 * 1e18;


    function fund() payable public {
        //Want to be able to send minimum fund amount in USD
        //1. How do we send ETH to this contract
        //trying to set an minimum amount to be sent as 1 ETH, if less then shows the message
        // require(msg.value > 1e18, "Didn't send enough !!!!");
        //money maths is done in term of WEI so 1 eth is set as 10^18
        // require(msg.value >= minimumUsd, "Didn't send enough !!!!");
        require(getConversionRate(msg.value) >= minimumUsd, "Didn't send enough !!!!");

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



    function getPrice() public view returns(uint256) { //to contact outside of out contrasts(using chainlink/oracle link)
            //ABI
            //address 0x694AA1769357215DE4FAC081bf1f309aDC325306 --address of other contract we wanna interact

            AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
            // (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = priceFeed.latestRoundData();    
            (,int256 answer,,,) = priceFeed.latestRoundData();  
            //thsi will be price, ETH in terms of USD
            // 30000.00000000
            return uint256(answer * 1e10);
    }



    //these interfaces help is to get the offchain data.(eg : oracle nodes)
    // to interact with the contracts outside of out project
    function getVersion() public view returns(uint256)  { 
            AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
            return priceFeed.version();
    }


    function getConversionRate(uint256 ethAmount) public view returns(uint256) {
            uint256 ethPrice = getPrice();
            //3000_0000000000000000000 = ETH / USD price
            //1_0000000000000000000 ETH
            uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
            // 2999.9999999999999999 -> 3000
            return ethAmountInUsd;
    }


}
