const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');

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
