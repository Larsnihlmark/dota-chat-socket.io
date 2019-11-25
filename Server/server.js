var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);




app.get('/', function(req, res){
  res.sendFile('index.html', {root: '../public'});
});

http.listen(8000, function(){
  console.log('listening on *:5000');
});