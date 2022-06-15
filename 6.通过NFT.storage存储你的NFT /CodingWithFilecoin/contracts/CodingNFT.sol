//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CodingNFT is ERC721URIStorage {

    constructor() ERC721("Demo", "DEMO") {
        
    }

    function mint(uint ind) external payable {
        ind=ind%3;
        if(ind==0){
            require(msg.value >= 0.001 ether, "CodingNFT: insufficient funds");
            _mint(msg.sender, 0);
            _setTokenURI(0, "ipfs://bafkreigpj2qvgwolhdgz6x6j7gfmyacy3oot36ghvcsyk2lqp3qipp6ajm");
        }else if(ind==1){
            require(msg.value >= 0.002 ether, "CodingNFT: insufficient funds");
            _mint(msg.sender, 0);
            _setTokenURI(0, "ipfs://bafkreibem26pjlcrs63gewnunsxmmr7qjzhwtroaxbj4rt4no5rclptp6e");
        }else{
            require(msg.value >= 0.003 ether, "CodingNFT: insufficient funds");
            _mint(msg.sender, 0);
            _setTokenURI(0, "ipfs://bafkreif22bq52mi2dbptywtgtahshazqieso2x34vivvobip2v54patvly");
        }
    }


}
