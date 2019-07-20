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
const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const login = require("./login.js");
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

router.get('/', function(req, res){
  /*req.session.user = {
    id : "fuck",
    name : "fuck",
    authorized : true
  };*/
  let user = req.session.user;


  if (user === undefined){
    res.redirect('/loginpage');
  }
  else {
    console.log('[index/index]');
    id = user.id;
    const address = '0x3925fa618b4df1102f2ca1bf2670851bbb2fe472';
    const contract = new web3.eth.Contract(abi,address);

    const selectQuery = "SELECT * FROM user where id = ?";
    db.query(selectQuery, [id], function(err, result){
      async function getdata() {
        let results = [];
        let indices = await contract.methods.getCertByOwner(result[0].ethwallet).call();
    
        for(var i = 0; i < indices.length; i++) {
          let id = parseInt(indices[i]._hex,16);
          let obj = await contract.methods.BloodCerts(parseInt(id)).call();
          let date = new Date(parseInt(obj.donateDate._hex,16));
          results.push({
            'name': obj.name,
            'birth' : parseInt(obj.birth._hex,16),
            'kind' : obj.kind,
            'gender' : parseInt(obj.gender._hex, 16) == 1 ? "남성" : "여성",
            'donateDate' : date.toLocaleDateString(),
            'id': id});
        } 
        res.render('index', {
          list: results,
          name: user.name,
        });
      }
      getdata();
    });
  }
});

router.get('/logout', function(req, res){
  console.log('[index/logout]');
  req.session.destroy();
  res.redirect('/')
});

router.post('/blood',function(req, res){
  let id = req.body.id;

  const selectQuery = "SELECT * FROM blood where user = ?";
  console.log("[index/blood]");
  db.query(selectQuery, [id], function(err, result){
    if(err) throw err;
    return res.statue(200).json({list:result});
  });
});

module.exports = router;

/*
const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const login = require("./login.js");

// 쓰레기
let asdf = [{

}];

router.get('/', function(req, res){
  let user = req.session.user;


  if (user === undefined){

    const selectQuery = "SELECT * FROM blood where user = ?";
    db.query(selectQuery, [user], function(err, result){
      // if(err) throw err;

      res.render('index', {
        list: result,
        '헌혈증': asdf
      })
      // return res.statue(200).json({list:result});
    });
  }
  else {
    res.redirect('/html/404.html');
  }
});

router.post('/blood',function(req, res){
  let id = req.body.id;

  const selectQuery = "SELECT * FROM blood where user = ?";
  console.log("[index/blood]");
  db.query(selectQuery, [id], function(err, result){
    if(err) throw err;
    return res.statue(200).json({list:result});
  });
});

module.exports = router;

*/
