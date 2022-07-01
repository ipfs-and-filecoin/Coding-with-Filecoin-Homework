//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract November is ERC721URIStorage{

    constructor() ERC721("November", "NOVEMBER") {

    }

    function mint() external payable{
        require(msg.value >= 0.001 ether, "November: insufficient funds");
        _mint(msg.sender, 0);
        _setTokenURI(0, "ipfs://bafkreiartgqnwcsuyxffsvexhj3ys4htiewt5sgqjfsi25lsvryrzmtx5e");
    }

}
