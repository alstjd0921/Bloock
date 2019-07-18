const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const login = require("./login.js");

router.get('/', function(req, res){
  let user = req.session.user;


  if (user === undefined){

    const selectQuery = "SELECT * FROM blood where user = ?";
    db.query(selectQuery, [user], function(err, result){
      if(err) throw err;

      res.render('index', {
        list: result
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
