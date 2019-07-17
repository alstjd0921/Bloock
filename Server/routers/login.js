const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');

router.post('/register', fuction(req, res){
  let name = req.body.name;
  let passwd = req.body.passwd;
  let id = req.body.id;
  let resident = req.body.resident;

  const insertQuery = "INSERT INTO user (name, passwd, id, resident) VALUES(?, ?, ?, ?)";
  console.log("[item/register]");
});
