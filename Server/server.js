const express = require('express');
const app = express();
const http = require('http').Server(app);
const index = require('./routers/index.js');

app.use(express.static(__dirname + '/'));
app.use('/',index);

app.all('*',
  function (req, res) {
    res.status(404).sendFile(__dirname + '/routers/html/404.html');
  }
);

http.listen(5000,function(){
  console.log('server on!');
});

module.exports = app;
