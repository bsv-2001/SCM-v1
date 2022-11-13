pragma solidity ^0.6.1;
import "./ItemManager.sol";
contract Items {
    uint index;
    uint price;
    bool public success;
    ItemManager public parentContract;

    constructor(ItemManager _parentContract , uint _index , uint _price) public {
        parentContract = _parentContract;
        index = _index;
        price = _price;
    }

     function fallback() external payable {
         require(price == msg.value,"Payment accepted only in full modes");
        (success,) = address(parentContract).call.value(msg.value)(abi.encodeWithSignature("triggerPayment(uint256)",index));
         require(success , "Payment Unsuccessfull. Try again");
    }
}
