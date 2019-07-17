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

module.exports = router;
