const mysql = require('mysql');
const db = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'sunrin',
  database: 'newworld'
};

var connector;

function handleDisconnect(){
  connector = mysql.createConnection(db)

  connector.connect(function(err){
    if(err){
      console.log('Connection Error : ', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connector.on('error', function(err){
    console.log('Database Error : ', err);
    if(err.code == 'PROTOCOL_CONNECT_LOST'){
      handleDisconnect();
    }else{
      throw err;
    }
  });
}

handleDisconnect();

module.exports= connector;
