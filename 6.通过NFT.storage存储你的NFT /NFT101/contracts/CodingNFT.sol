//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CodingNFT is ERC721URIStorage {
    constructor() ERC721("Demo", "DEMO") {}

    function mint() external payable {
        require(msg.value >= 0.001 ether, "CodingNFT: insufficient funds");
        _mint(msg.sender, 0);
        _setTokenURI(0, "ipfs://bafkreievgj2ubhy3xeblrujca7g6no3l2zf2b6xq2qbhw5zsfg46csaqom");
    }
}