const express = require('express');
const router = express.Router();
const db = require('../db/connector.js');
const login = require("./login.js");

router.get('/', function(req, res){
  if (req.session.user === undefined){
    res.sendFile(__dirname + '/html/index.html');
  }
  else {
    res.redirect('/html/404.html');
  }
});

router.post('/blood',function(req, res){
  let id = req.body.id;

  const selectQuery = "SELECT * FROM blood where id = ?";
  console.log("[index/blood]");
  db.query(selectQuery, [id], function(err, result){
    if(err) throw err;
    return res.statue(200).json({list:result});
  });
});

module.exports = router;
