pragma solidity ^0.5.1;
contract BloockBase {
    //every date field is timestamp
    struct BloodCertInfo { 
        uint donateDate;
        uint birth;
        uint gender;
        string name;
        string kind;
    }
    
    BloodCertInfo[] BloodCerts;
    
    event CertCreated(string _name, uint birth);
    mapping (uint256 => address) public certToOwner;
    mapping (address => uint256) public ownerCertCount;
    
    function createCert(uint _donateDate,uint _birth, uint _gender, string memory _name, string memory _kind) public {
        BloodCertInfo memory _newCert = BloodCertInfo(_donateDate,_birth,_gender,_name,_kind);
        uint256 id = BloodCerts.push(_newCert);
        certToOwner[id] = msg.sender;
        ownerCertCount[msg.sender]++;
        emit CertCreated(_name,_birth);
    }
    
}
