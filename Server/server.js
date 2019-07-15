const express = require('express');
const app = express();
const http = require('http').Server(app);
const index = require('./routers/index.js');

app.use(express.static(__dirname + '/'));
app.use('/',index);

app.all('*',
  function (req, res) {
    res.status(404).send('<h1> 404 Error </h1>');
  }
);

http.listen(5000,function(){
  console.log('server on!');
});

module.exports = app;
