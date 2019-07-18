const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');

router.get('/login', function(req, res){
  res.render('login', {
    
  })
});

router.post('/register', function(req, res){
  let name = req.body.name;
  let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.RegisterPasswd).digest('base64')).digest('base64');
  let id = req.body.RegisterId;
  let resident = req.body.resident;

  const insertQuery = "INSERT INTO user (name, passwd, id, resident) VALUES(?, ?, ?, ?)";
  console.log("[login/register]");
  db.query(insertQuery, [name, passwd, id, resident], function(err, result){
    if(err) throw err;
    return res.status(200).json({message:"Register Success"});
  });
});

router.post('/login', function(req,res){
  let id = req.body.LoginId;
  let passwd = req.body.LoginPasswd;

  const selectQuery = "SELECT * FROM user where id = ? and passwd = ?";
  console.log("[login/login]");
  db.query(selectQuery, [id, passwd], function(err, result){
    if(err) throw err;
    if(result.length == 0){
      return res.status(401).json({message:"Login Fail"});
    }else if(result[0].passwd == passwd){
      req.session.user = {
        id : id,
        name : result[0].name,
        authorized : true
      };
      return res.status(200).json({message:"Login Success"});
    }else{
      return res.status(401).json({message:"Login Fail"});
    }
  });
});

module.exports = router;
