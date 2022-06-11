//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CodingNFT is ERC721URIStorage {
    uint public tokenCount; 

    constructor() ERC721("Demo","DEMO") {

    }

    function mint() external payable {
    	require (msg.value >= 0.001 ether,"CodingNFT: insufficient funds");
    	tokenCount ++;
    	_mint(msg.sender,0);
    	_setTokenURI(0,"ipfs://bafkreie4n6f4azto2tqnkl5ribmtmhvzchkkr6v3se5e5ucoxcu4dxfgcu");
    }
    
}
