//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CodingNFT is ERC721URIStorage {

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

    constructor() ERC721("demo","DEMO") {
        minted = false;
        owner = msg.sender;
    }

    function setPrice(uint _price) external onlyOwner {
        price = _price;
    }

    function mint() external  payable hasMinted(minted) sufficientPay(price){
        _mint(msg.sender, 0);
        _setTokenURI(0, "ipfs://bafkreiasliac4sxclkzx6zjy3wt35c7oqhr4wostsksiegeubpdvagi5je");
    }

}