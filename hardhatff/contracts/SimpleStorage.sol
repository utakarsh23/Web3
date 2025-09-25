// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 public favNo;

    struct People {
        uint256 favNo;
        string name;
    }

    mapping(string => uint256) public nameToFavNo;
    People[] public people;

    function store(uint256 favNoo) public virtual {
        favNo = favNoo;
    }

    function retrieve() public view returns (uint256) {
        return favNo;
    }

    function addPerson(string memory names, uint256 favvNo) public {
        people.push(People(favvNo, names));
    }

    function addPersonMap(string memory _name, uint256 _favNo) public {
        nameToFavNo[_name] = _favNo;
    }
}