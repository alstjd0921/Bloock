const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const db = require('./db/connector.js');
const expressSession = require('express-session');
const index = require('./routers/index.js');
const login = require('./routers/login.js');
const login = require('./routers/load.js');
const bodyParser = require("body-parser");

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const session = expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized:true
});

app.use(session);
app.use(express.static(__dirname + '/'));
app.use('/', index);
app.use('/', login);

app.all('*',
  function (req, res) {
    res.status(404).sendFile(__dirname + '/routers/html/404.html');
  }
);

http.listen(3000,function(){
  console.log('server on!');
});

module.exports = app;
