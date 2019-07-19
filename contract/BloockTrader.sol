pragma solidity ^0.5.1;

import "./erc721.sol";
import "./BloockHelper.sol";

contract BloockTrader is BloockHelper, ERC721 {
    
    mapping (uint=>address) certApproval;
    function balanceOf(address _owner) public view returns (uint256 _balance){
        return ownerCertCount[_owner];
    }
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return certToOwner[_tokenId];
    }
    
    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerCertCount[_from]--;
        ownerCertCount[_to]++;
        certToOwner[_tokenId] = _to;
    }
    
    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to,_tokenId);
        emit Transfer(msg.sender,_to,_tokenId);
    }
    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        certApproval[_tokenId] = _to; 
    }
    function takeOwnership(uint256 _tokenId) public {
        require(certApproval[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
}
