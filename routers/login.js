const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_donateDate",
				"type": "uint256"
			},
			{
				"name": "_birth",
				"type": "uint256"
			},
			{
				"name": "_gender",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_kind",
				"type": "string"
			}
		],
		"name": "createCert",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "takeOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_approved",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "birth",
				"type": "uint256"
			}
		],
		"name": "CertCreated",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "_balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "BloodCerts",
		"outputs": [
			{
				"name": "donateDate",
				"type": "uint256"
			},
			{
				"name": "birth",
				"type": "uint256"
			},
			{
				"name": "gender",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "kind",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "certToOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getCertByOwner",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "ownerCertCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');
const crypto = require('crypto');
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

router.get('/loginpage', function(req, res){
  res.render('login', {
  });
});

router.get('/index', function(req, res){
  let user = req.session.user;
  res.render('index', {
    name: user.name,
    '헌혈증': user
  });
});

router.get('/certreg',function(req, res){
  res.sendFile(__dirname +  '/certreg.html');
});

router.post('/certreg', function(req, res){
  let name = req.body.id;
  let type = req.body.type;
  let address = '0x3925fa618b4df1102f2ca1bf2670851bbb2fe472'
  let contract = new web3.eth.Contract(abi, address);
  const selectQuery = "SELECT * FROM user where id = ?";
  console.log("[certreg]");
  var date = new Date();
  var sex = 0;
  var birth = 0;
  var from = "";
  db.query(selectQuery, [name], function(err, result){
    console.log(result[0]);
    let val = result[0].resident;
    from = result[0].ethwallet;
    var value = val.toString();
    if(value.length == 7){
      sex = value.substr(6,1);
      birth = value.substr(0,6);
    }else{
      sex = value.substr(5,1);
      birth = value.substr(0,5);
    }
    console.log(name + '\n' + type + '\n' + sex + '\n' + birth + '\n' + date.getTime());
    console.log(from);
    contract.methods.createCert(date.getTime(),birth, sex,name,type).send({from: from, gas: 210000 })
      .then(res.redirect('/certreg'));
  });
});

router.post('/register', function(req, res){
  let name = req.body.username;
  let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.RegisterPasswd).digest('base64')).digest('base64');
  let id = req.body.RegisterId;
  let resident = req.body.resident;
  let ethwallet = req.body.wallet;

  const insertQuery = "INSERT INTO user (name, id, passwd, resident, ethwallet) VALUES(?, ?, ?, ?, ?)";
  console.log("[login/register]");
  db.query(insertQuery, [name, id, passwd, resident, ethwallet], function(err, result){
    res.render('login', {
    });
  });
});

router.post('/login', function(req,res){
  let id = req.body.LoginId;
  let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.LoginPasswd).digest('base64')).digest('base64');

  const selectQuery = "SELECT * FROM user where id = ? and passwd = ?";
  console.log("[login/login]");
  db.query(selectQuery, [id, passwd], function(err, result){
    //if(err) throw err;
    if(result.length == 0){
      res.render('login', {
      });
      //return res.status(401).json({message:"Login Fail"});
    }else if(result[0].passwd == passwd){
      req.session.user = {
        id : id,
        name : result[0].name,
        authorized : true
      };
      res.redirect('/');
    }else{
      res.render('login', {
      });
    }
  });
});

module.exports = router;
