const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const login = require("./login.js");

// 쓰레기
let asdf = [{

}];

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
    id = user.id;
    const selectQuery = "SELECT * FROM blood where user = ?";
    db.query(selectQuery, [id], function(err, result){
      res.render('index', {
        list: result,
        name: user.name,
        '헌혈증': user
      })
      //if(err) throw err
      //return res.statue(200).json({list:result});
    });
  }
});

router.get('/logout', function(req, res){
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
