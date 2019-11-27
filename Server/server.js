var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html', {root: '../public'});
});

io.on('connection', function(socket) {
  socket.on('chat-message', function(data) {
    console.log('message: ' + data.msg);
    io.emit('ReciveMessage', { msg: data.msg });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});