//SPDX-License-Identifier: MIT
//use case
//1. structure of the product
//2. Creation of a new Item by admin
//3. Holds DS of the project in a mapper for implementing other functionalities
//4. Generation of a unique address for a product.
//5. trigger delivery upon successfull payment by admin
//6. Account worth in Weis


pragma solidity ^0.6.1;
import './Ownable.sol';
import './Items.sol';
contract ItemManager is Ownable{

    enum ChainState{ created , paid , delivered }
    event SupplyChain(uint itemIndex , uint8 step , address itemAddress);

    struct ItemDetails{
        Items item;
        string identifier;
        uint price;
        ChainState state;
    }

    mapping(uint => ItemDetails) public mapper;
    uint itemIndex=1;

    function createItem(string memory _identifier , uint _price) public OnlyOwner {
        Items _item = new Items(this,itemIndex,_price);
        mapper[itemIndex].item = _item;
        mapper[itemIndex].identifier = _identifier;
        mapper[itemIndex].price = _price;
        mapper[itemIndex].state = ChainState.created;
        emit SupplyChain(itemIndex , uint8(mapper[itemIndex].state) , address(_item));
        itemIndex++;
    }

    function triggerPayment(uint _itemIndex) public payable {
        require(mapper[_itemIndex].price == msg.value,"Payment accepted only in full modes - 1");
        require(mapper[_itemIndex].state == ChainState.created, "payment error triggered");
        mapper[_itemIndex].state = ChainState.paid;
        emit SupplyChain(_itemIndex , uint8(mapper[_itemIndex].state) , address(mapper[_itemIndex].item));
    }

    function triggerDelivery(uint _itemIndex) public OnlyOwner {
        require(mapper[_itemIndex].state == ChainState.paid,"delivery error triggered");
        mapper[_itemIndex].state = ChainState.delivered;
        emit SupplyChain(_itemIndex , uint8(mapper[_itemIndex].state) , address(mapper[_itemIndex].item));
    }

    function get_Contract_Current_Balance() public OnlyOwner view returns(uint){
        return address(this).balance;
    }


}