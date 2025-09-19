// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage { //is -> entends/implements(inheritance)

    //supports override
    //keywords : virtual override


    function store(uint256 favNoo) public override  {
        favNo = favNoo+5;
    }

}