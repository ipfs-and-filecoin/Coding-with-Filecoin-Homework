//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTDemo is ERC721URIStorage {
    uint256 private tokenCount; // private

    constructor() ERC721("Demo", "DEMO") {}

    function mint(string memory tokenURI) external payable {
        require(msg.sender == tx.origin);
        require(msg.value >= 0.001 ether, "NFTDemo: insufficient funds");
        require(bytes(tokenURI).length > 10, "NFTDemo: URI is wrong");
        require(tokenCount < type(uint256).max, "NFTDemo: token Count overflow");

        tokenCount++;
        _mint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, tokenURI);
    }

    function getTokenCount() external view returns(uint256) {
        return tokenCount;
    }
}