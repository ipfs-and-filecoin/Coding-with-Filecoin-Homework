//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Dwetransfer {
    address public owner_address;

    uint fileId = 0; //set fileId to 0

    struct File {
        uint id;
        string cid;
        uint amount;
        address uploader;
    } //declaring the File struct

    File file;

    mapping(uint => File) public files; //to store files (fileId, File Object)

    //declaring events to emit to ETH chain
    event FileIdCreated(uint fileId);
    event FileGetCid(string cid);

    receive() external payable {} 

    constructor() {
        owner_address = msg.sender;
    }

    function uploadFile(string memory _filecid) external payable {
        require(msg.value > 0, "Amount must be greater than zero."); //checks the amount

        fileId += 1; //increment fileId

        file.id = fileId;
        file.cid = _filecid;
        file.amount = msg.value;
        file.uploader = msg.sender;

        payable(owner_address).transfer(msg.value);
        
        files[file.id] = file;

        emit FileIdCreated(fileId);
    }

    function downloadFile(uint _file_id) external payable {
        require(msg.value > 0, "Amount must be greater than zero.");

        uint uploaderAmount = files[_file_id].amount * 8 / 10;
        uint ownerAmount    = files[_file_id].amount * 2 / 10;

        payable(files[_file_id].uploader).transfer(uploaderAmount);
        payable(owner_address).transfer(ownerAmount);

        emit FileGetCid(files[_file_id].cid);
    }

    function uploaderWithdraw(uint _amount, uint _file_id) external payable {
        require(msg.sender == files[_file_id].uploader,"You must be the file uploader to withdraw.");
        payable(msg.sender).transfer(_amount);
    }

    function ownerWithdraw(uint _amount) external payable {
        require(msg.sender == owner_address,"Only the owner of the contract can withdraw.");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() view public returns(uint) {
        address acc = msg.sender;
        return acc.balance;
    }
}