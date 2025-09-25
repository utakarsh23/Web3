// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    //boolean(bool), uint, int, address, bytes, string
    // bool hasfavNo = true; //false,
    // uint favNo = 123;
    // int favNo0 = 1233; // or maybe -1233
    // string faveNo = "123";
    // address myAddress = 0x973F14669fbe2d6E7d94310368196335523130DC;
    // bytes23 by = "cat"; //0x12344588
    // bytes32 bys = "cat"; //0x12344588

    //0xd9145CCE52D386f254917e481eB44e9943F39138


    uint256 public favNo; //default value is zero
//    People public person = People({favNo : 2, name : "Shresth"});


    struct People {
        uint256 favNo;
        string name;
    }

    mapping(string => uint256) public nameToFavNo;

    People[] public people; // dynamic list
    // People[3] public people; // static list of max size 3


    function store(uint256 favNoo) public virtual  { //virtual -> helps with overriding, impossible without it
        favNo = favNoo;
        retrieve();// SPDX-License-Identifier: MIT
        pragma solidity ^0.8.19;

        contract SimpleStorage {
        //boolean(bool), uint, int, address, bytes, string
        // bool hasfavNo = true; //false,
        // uint favNo = 123;
        // int favNo0 = 1233; // or maybe -1233
        // string faveNo = "123";
        // address myAddress = 0x973F14669fbe2d6E7d94310368196335523130DC;
        // bytes23 by = "cat"; //0x12344588
        // bytes32 bys = "cat"; //0x12344588

        //0xd9145CCE52D386f254917e481eB44e9943F39138


        uint256 public favNo; //default value is zero
//    People public person = People({favNo : 2, name : "Shresth"});


        struct People {
        uint256 favNo;
        string name;
        }

        mapping(string => uint256) public nameToFavNo;

        People[] public people; // dynamic list
        // People[3] public people; // static list of max size 3


        function store(uint256 favNoo) public virtual  { //virtual -> helps with overriding, impossible without it
        favNo = favNoo;
        retrieve();
        }


        function retrieve() public view returns(uint256) {
        return favNo;
        }

        function addPerson(string memory names, uint256 favvNo) public  {
        people.push(People(favvNo, names));
        // People memory p1 = People({favNo : favvNo, name : names});
        // People memory p1 = People(favvNo, names)

        //people.push(p1);
        }

        //calldat, memory, storage
        //calldata, memory 0 > temp existance of the variable,
        //storage is not temp, it's stored outside of the execution
        //typically when we define something it's a store
        // i.e
        //uint256 public favNo; -> this is stored in storage

        //   function addPerson(string memory names, uint256 favvNo) public  { --> we don't need the names after the function, we store it temporarity using memory keyword
        //         people.push(People(favvNo, names));
        //   }

        //memory -> if we need to mutate the data in the function
        //calldata -> if we do not need to mutate the data in the function
        //storge -> can be modified

        //   function addPerson(string memory names, uint256 favvNo) public  {
        //         names = "Shresth";
        //         people.push(People(favvNo, names));
        //   }
        // compiles sucessfully


        //   function addPersonq(string calldata namess, uint256 favvNoo) public  {
        //         namess = "Shresth";
        //         people.push(People(favvNoo, namess));
        //   }
        // won't compile, gives an error of mutating something(string is not covertible)



        //another question rises, why didn't we use memory or calldata for the favvNo,
        //it is because, they can only be used for array, struct or mapping types dat types,
        //by default it's in memory


        //   function addPersonq(string storage namess, uint256 favvNoo) public  {
        //         namess = "Shresth";
        //         people.push(People(favvNoo, namess));
        //   }
        //   //we can not d storage here as we know that names is temp and it can't be used outside the func so no need, ironic though


        //mapping
        function addPersonMap(string memory _name, uint256 _favNo) public  {
        nameToFavNo[_name] = _favNo;
        }

        //deployment

        // when calling a func which does not modify data(only view), not txn is required,
        //but if you store/modify data in the blockchain then it asks for funds

        //if we hit favNo, nameToFavNo, retrieve, it's all view so no txn fee required
        //of we hit addPerson, addPersonMap, store, we have to pay

        }


    }


    function retrieve() public view returns(uint256) {
        return favNo;
    }

    function addPerson(string memory names, uint256 favvNo) public  {
        people.push(People(favvNo, names));
        // People memory p1 = People({favNo : favvNo, name : names});
        // People memory p1 = People(favvNo, names)

        //people.push(p1);
    }

    //calldat, memory, storage
    //calldata, memory 0 > temp existance of the variable, 
    //storage is not temp, it's stored outside of the execution
    //typically when we define something it's a store
    // i.e 
    //uint256 public favNo; -> this is stored in storage

    //   function addPerson(string memory names, uint256 favvNo) public  { --> we don't need the names after the function, we store it temporarity using memory keyword
    //         people.push(People(favvNo, names));
    //   }

    //memory -> if we need to mutate the data in the function
    //calldata -> if we do not need to mutate the data in the function
    //storge -> can be modified

    //   function addPerson(string memory names, uint256 favvNo) public  { 
    //         names = "Shresth";
    //         people.push(People(favvNo, names));
    //   } 
    // compiles sucessfully


    //   function addPersonq(string calldata namess, uint256 favvNoo) public  { 
    //         namess = "Shresth";
    //         people.push(People(favvNoo, namess));
    //   } 
    // won't compile, gives an error of mutating something(string is not covertible)



    //another question rises, why didn't we use memory or calldata for the favvNo, 
    //it is because, they can only be used for array, struct or mapping types dat types, 
    //by default it's in memory 


   //   function addPersonq(string storage namess, uint256 favvNoo) public  {  
   //         namess = "Shresth";
   //         people.push(People(favvNoo, namess));
   //   } 
   //   //we can not d storage here as we know that names is temp and it can't be used outside the func so no need, ironic though


    //mapping
        function addPersonMap(string memory _name, uint256 _favNo) public  {
        nameToFavNo[_name] = _favNo;
    }

    //deployment

    // when calling a func which does not modify data(only view), not txn is required, 
    //but if you store/modify data in the blockchain then it asks for funds

    //if we hit favNo, nameToFavNo, retrieve, it's all view so no txn fee required
    //of we hit addPerson, addPersonMap, store, we have to pay

}

