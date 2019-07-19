pragma solidity ^0.5.1;

import "./BloockBase.sol";

contract BloockHelper is BloockBase {
    modifier onlyOwnerOf(uint256 _tokenId) {
        require(msg.sender == certToOwner[_tokenId]);
        _;
    }
  function getCertByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](ownerCertCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < BloodCerts.length; i++) {
      if (certToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}

