// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title A cat show NFT
/// @author alexzhou
/// @see https://docs.openzeppelin.com/contracts/2.x/api/token/erc721

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CatShow is ERC721URIStorage {

    constructor() ERC721("CatShow", "") {}

    function mint() external payable {
        require(msg.value >= 0.001 ether, "insufficient funds");
        _mint(msg.sender, 0);
        _setTokenURI(0, "ipfs://bafkreigdzeso3kxxpne3ja4rlgu5bickrsjeag3mqbdru2ixz4jbgxwj34");
    }
}
