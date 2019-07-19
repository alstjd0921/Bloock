const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');
const crypto = require('crypto');
const Web3 = require('web3');
const web3 = new Web3('ws://localhost:8546');
const share_account = web3.eth.accounts.privateKeyToAccount('0xbe4c44b446927d881ab177da66dda7dddbd2e3e50b9a45e838c1d11653a954ed');

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

  const selectQuery = "SELECT * FROM user where id = ?";
  console.log("[certreg]");
  db.query(selectQuery, [name], function(err, result){
    let val = result[0].resident;
    var value = val.toString();
    if(value.length == 7){
      let sex = value.substr(6,1);
      let birth = value.substr(0,6);
      let date = + new Date();
      console.log(name + '\n' + type + '\n' + sex + '\n' + birth + '\n' + date);
    }else{
      let sex = value.substr(5,1);
      let birth = value.substr(0,5);
      let date = + new Date();
      console.log(name + '\n' + type + '\n' + sex + '\n' + birth + '\n' + date);
    }
  });
});


router.post('/register', function(req, res){
  let name = req.body.username;
  let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.RegisterPasswd).digest('base64')).digest('base64');
  let id = req.body.RegisterId;
  let resident = req.body.resident;
  let ethwallet = web3.eth.accounts.create().privateKey;
  let amount = web3.utils.toWei('0.5',"ether");
  web3.eth.sendTransaction({from:share_account.address,to:ethwallet,value:str(amount)});



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
      res.redirect('/index');
    }else{
      res.render('login', {
      });
    }
  });
});

module.exports = router;
