//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract YoungNFT is ERC721URIStorage {

    address public owner;
    bool public minted;
    uint public price;
    
    modifier sufficientPay(uint _price) {
        require(msg.value >= _price);
        _;
    }

    modifier hasMinted(bool _minted){
        require(!minted);
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        minted = false;
        owner = msg.sender;
    }

    function setPrice(uint _price) external onlyOwner {
        price = _price;
    }

    function mint() external  payable hasMinted(minted) sufficientPay(price){
        _mint(msg.sender, 0);
        _setTokenURI(0, "ipfs://bafkreieezsjcjbfcrbrj3r4jaevaxok7bxantnhoegstxl53okuvysubg4");
    }

}
