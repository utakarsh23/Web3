// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;


import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

//library -> similar to contracts but we can not stake or send ether.
//logic section 
library PriceConverter {

        //public if using not in lib and in main file
         function getPrice() internal view returns(uint256) { //to contact outside of out contrasts(using chainlink/oracle link)
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
    function getVersion() internal view returns(uint256)  { 
            AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
            return priceFeed.version();
    }


    function getConversionRate(uint256 ethAmount) internal view returns(uint256) {
            uint256 ethPrice = getPrice();
            //3000_0000000000000000000 = ETH / USD price
            //1_0000000000000000000 ETH
            uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
            // 2999.9999999999999999 -> 3000
            return ethAmountInUsd;
    }

    //okey so here it goes, the interface gives us the minimalistic ABI to interact with contracts outside of contracts with the given address.
    //AggregatorV3Interface -> Interface & ABI
    //AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); interaction with other contracts with the provided Address

}