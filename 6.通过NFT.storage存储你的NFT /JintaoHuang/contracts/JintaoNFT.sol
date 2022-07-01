// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
 
 
contract JintaoNFT is ERC721,  ERC721Enumerable, ERC721URIStorage  {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private owner;
    mapping (uint256 => string) private _tokenURIs;
    
    string private _baseURIextended;
 
    constructor () ERC721("NFTMarket", "NFTMKT") {
    	owner = msg.sender;
	    //currToken = IERC20(_currTokenAddress);
	}
    
    function setBaseURI(string memory baseURI_) external {
        _baseURIextended = baseURI_;
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual 
        override(ERC721URIStorage){
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
 
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        return string(abi.encodePacked(base, tokenId.toString()));
    }
 
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
 
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal  override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
 
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
 
    function burnNFT(uint256 tokenId) public returns (uint256) {
        require(msg.sender == ownerOf(tokenId),"Only the owner of this Token could Burn It!");
        _burn(tokenId);
	    return tokenId;
    }
 
    function mintNFT(address _to,string memory tokenURI_) public returns (uint256){
        _tokenIds.increment();
 
        uint256 newItemId = _tokenIds.current();
        _mint(_to, newItemId);
        _setTokenURI(newItemId, tokenURI_);
 
        return newItemId;
    }
 
    function transNFT(address _from,address _to,uint256 tokenId) public returns (uint256) {
        require(msg.sender == ownerOf(tokenId),"Only the owner of this Token could transfer It!");
        transferFrom(_from,_to,tokenId);
        return tokenId;
    }
 
    function destroy() virtual public {
        require(msg.sender == owner,"Only the owner of this Contract could destroy It!");
        selfdestruct(payable(owner));
    }
}
