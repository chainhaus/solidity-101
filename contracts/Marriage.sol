pragma solidity ^0.4.24;

contract Marriage {

    address public owner;
    string public husband;
    string public wife;
    
    constructor() public {
        owner = msg.sender;
    }

    function obtainMarriageLicense(string newHusband, string newWife) public payable {
        require(msg.value > .0001 ether);
        husband = newHusband;
        wife = newWife;
    }

}