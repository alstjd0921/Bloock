const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');
const crypto = require('crypto');
const Web3 = require('web3');
const web3 = new Web3('ws://localhost:8546');

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
  res.sendFile(__dirname + '../view/certreg.html');
});

router.post('/certreg', function(req, res){
  let name = req.body.name;
  let type = req.body.type;

  const selectQuery = "SELECT * FROM user where id = ?";
  console.log("[certreg]");
  db.query(selectQuery, [id], function(err, result){
    let sex = result[0].resident.substring(6,6);
    let birth = result[0].resident.substring(0,5);
    let date = + new Date();
    console.log(name + type + sex + birth + date);
  });
});


router.post('/register', function(req, res){
  let name = req.body.username;
  let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.RegisterPasswd).digest('base64')).digest('base64');
  let id = req.body.RegisterId;
  let resident = req.body.resident;
  let ethwallet = web3.eth.accounts.create().privateKey.substr(2);

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
