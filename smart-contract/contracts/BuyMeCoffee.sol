//SPDX-License-Identifier: Unlicense

// contracts/BuyMeACoffee.sol
pragma solidity ^0.8.0;

// Switch this to your own contract address once deployed, for bookkeeping!
// Example Contract Address on Goerli: 0xDBa03676a2fBb6711CB652beF5B7416A53c1421D

contract BuyMeCoffee {
    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    event NewOwner(address oldOwner, address newOwner);
    
    // Memo struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    
    // Address of contract deployer. Marked payable so that
    // we can withdraw to this address later.
    address payable owner;

    // List of all memos received from coffee purchases.
    Memo[] memos;

    constructor() {
        // Store the address of the deployer as a payable address.
        // When we withdraw funds, we'll withdraw here.
        owner = payable(msg.sender);
    }

    /**
     * @dev fetches all stored memos
     */
    function getMemos(uint256 _start, uint256 _length) public view returns (string[] memory name, string[] memory message) {
        uint256 memosLength = memos.length;
        uint256 end;
        
        if(_start >= memosLength) {
            _start = memosLength - 1;
        }

        if(_start < _length) {
            _length = _start + 1;
            
            end = 0;
        } else {
            end = _start - _length + 1;
        }

        name = new string[](_length);
        message = new string[](_length);

        Memo[] memory memosCopy = memos;
        
        uint counter;
        for(uint256 index = _start; index >= end;) {
            name[counter] = memosCopy[index].name;
            message[counter] = memosCopy[index].message;

            counter++;
            if(index == 0) {
                break;
            } 
            index--;
        }

        return (name, message);
    }

    /**
     * @dev buy a coffee for owner (sends an ETH tip and leaves a memo)
     * @param _name name of the coffee purchaser
     * @param _message a nice message from the purchaser
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        // Must accept more than 0 ETH for a coffee.
        require(msg.value > 0, "can't buy coffee for free!");

        // Add the memo to storage!
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // Emit a NewMemo event with details about the memo.
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */
    function withdrawTips() public {
        require(msg.sender == owner, "Only owner is allowed to withdraw");

        owner.transfer(address(this).balance);
    }

    /**
     * @dev Returns the total number of memos
     */
    function getMemosCount() public view returns (uint256) {
        return memos.length;
    }

    /**
     * @dev Sets a new owner
     */
    function setNewOwner(address _newOwner) public {
        require(msg.sender == owner, "Only owner is allowed to withdraw");
        
        address oldOwner = owner;

        owner = payable(_newOwner);

        emit NewOwner(oldOwner, _newOwner);
    }
}