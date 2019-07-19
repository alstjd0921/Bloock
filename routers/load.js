const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');
const crypto = require('crypto');

router.get('/index', function(req, res){
  let user = req.session.user;
  res.render('index', {
    name: user.name,
    '헌혈증': user
  });
});
