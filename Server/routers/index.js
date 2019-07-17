const express = require('express');
const router = express.Router();
const db = require('../db/connector.js');

router.get('/', function(req, res){
  if (req.session.user === undefined){
    res.sendFile(__dirname + '/html/index.html');
  }
  else {
    res.redirect('/lobby');
  }
});

module.exports = router;
