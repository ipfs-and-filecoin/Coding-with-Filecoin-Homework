//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CookingNFT  is ERC721URIStorage {
    constructor() ERC721("Demo", "DEMO"){

    }

    function mint() external  payable {
        require(msg.value >= 0.001 ether, "CookingNFT: insufficient funds");
        _mint(msg.sender, 0);
        _setTokenURI(
            0, 
            "ipfs://bafkreidxwyeptlgcn3collhswtabvto6gwvk5xoizsx4zvdqzeu5tpcroy");
    }
}
