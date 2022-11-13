//use case
//1. Assign owner.
//2. Permission setup

pragma solidity ^0.6.0;
contract Ownable {

    address _Owner;

    constructor() public {
        _Owner = msg.sender;
    }

    modifier OnlyOwner(){
        _;
        require( isOwner(), "Unauthorised Access detected. Contact Owner for more permissions");
    }

    function isOwner() public view returns(bool){
        return _Owner == msg.sender;
    }

}