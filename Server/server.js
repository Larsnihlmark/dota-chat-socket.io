var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var url = "http://worldtimeapi.org/api/timezone";
var axios = require('axios');

app.get('/api/timezone/:continent/:city/', (req, res) => {
  axios.get(url + "/" + req.params.continent + "/" + req.params.city )
  .then(function(response){
      var convertDate = (response.data.datetime)
      var timeData = convertDate.substring(11, 16)
      res.send(timeData)
  })
  .catch(function(error){
    console.log(error)
    res.sendStatus(400)
  })

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