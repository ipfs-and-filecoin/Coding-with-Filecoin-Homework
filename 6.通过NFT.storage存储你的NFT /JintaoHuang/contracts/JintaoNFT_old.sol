//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract JintaoNFT_old is ERC721URIStorage {

    address private owner;
    
    constructor() ERC721("JintaoDemo", "DEMO") {
        owner = msg.sender;

    }

    function mint() external payable {
        require(_exists(msg.value), "JintaoNFT: Query for nonexistent value");
        require(msg.value >= 0.001 ether, "JintaoNFT: insufficient funds");
        _mint(msg.sender, 0);
        _setTokenURI(0, "ipfs://bafkreiat3xns6exmgyk4i65a4jeon7qxho736usjfmwiak6banz7zkitju");
    }
}
