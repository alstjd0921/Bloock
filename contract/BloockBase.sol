pragma solidity ^0.5.1;
contract BloockBase {
    //every date field is timestamp
    struct BloodCertInfo { 
        uint donateDate;
        uint gender;
        string name;
        uint birth;
    }
    
    BloodCertInfo[] BloodCerts;
    
    event CertCreated(string _name, uint birth);
    mapping (uint256 => address) public certToOwner;
    mapping (address => uint256) public ownerCertCount;
    
    function createCert(uint _donateDate, uint _gender, string memory _name, uint _birth) public {
        BloodCertInfo memory _newCert = BloodCertInfo(_donateDate,_gender,_name,_birth);
        uint256 id = BloodCerts.push(_newCert);
        certToOwner[id] = msg.sender;
        ownerCertCount[msg.sender]++;
        emit CertCreated(_name,_birth);
    }
    
}
