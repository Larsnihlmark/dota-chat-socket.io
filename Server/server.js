var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var url = "http://worldtimeapi.org/api/timezone";
var axios = require('axios');

//API requests
app.get('/api/timezone/:continent/:city/', (req, res) => {
  axios.get(url + "/" + req.params.continent + "/" + req.params.city ) //WorldTime API
  .then(function(response){
      var convertDate = (response.data.datetime)
      var timeData = convertDate.substring(11, 16)
      res.send(timeData)
  })
  .catch(function(error){
    console.log(error);
    res.sendStatus(400);
  })

});

app.get('/api/icon/:name/', (req, res) => {
  axios.get("https://api.opendota.com/api/herostats/") //Dota API
  .then(function(response){
      const responseData = response.data;
      const heroname = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1); // first letter in name to uppercase
      let heroData = responseData.find(elem => elem.localized_name === heroname);
      let iconSrc = heroData.icon;
      res.send('https://api.opendota.com' + iconSrc);
  })
  .catch(function(error){
    console.log(error);
    res.sendStatus(400);
  })

});

app.get('/api/image/:name/', (req, res) => {
  axios.get("https://api.opendota.com/api/herostats/") // Dota API
  .then(function(response){
      const responseData = response.data;
      const heroname = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1); // first letter in name to uppercase
      let heroData = responseData.find(elem => elem.localized_name === heroname);
      let iconSrc = heroData.img;
      res.send('https://api.opendota.com' + iconSrc);
  })
  .catch(function(error){
    console.log(error);
    res.sendStatus(400);
  })

});
//Sätter fördefinerade rooms i en array av object
let rooms = [
  {
    name: 'Admin',
    password: '1'
  },
  {
    name: 'General',
    password: ''
  },
  {
    name: 'AFK',
    password: ''
  },
  {
    name: 'Programming',
    password: ''
  },
  {
    name: 'Dota',
    password: ''
  },
  {
    name: 'Life',
    password: ''
  }
];

io.on('connection', function(socket) { 
  socket.on('chat-message', function(data) { //Hantera chattmedelandet
    console.log('username ' + data.username + ' said ' + data.msg ); //Loggar ut vad användare sa
    io.to(data.room).emit('ReciveMessage', { msg: data.msg, username: data.username, room: data.room }); //Skickar ner till client
  });
  socket.on('Typing', function(data){ //Hantera när någon skriver
   /* console.log(data.username + ' Is typing a message...'); */
    io.to(data.room).emit('TypingMessage', {username: data.username, room: data.room} );
  });
  socket.on('create-room', function(data) { // Hantera när man skappar ett room
    // check if room is in list of rooms 
    let selectedRoom = rooms.find(room=> room.name === data.room);
    if (selectedRoom === undefined) {
      console.log(data.username + ' joined ' + data.room);
      rooms.push({ name: data.room, password: data.password });
      // socket.join(data.room);
    }
  });
  socket.on('join-room', function(data, callback) { // Hantera att man gå med i ett room
    // check if room has password 
    let selectedRoom = rooms.find(room=> room.name === data.room);
    /*  console.log(rooms);
        console.log(selectedRoom); */
    if (selectedRoom === undefined) {
      // quick fix to handle weird bug when it returns selectedroom on refresh, do nothing for now
    }
    else if (rooms.length === 0) {
      console.log(data.username + ' joined ' + data.room);
      socket.join(data.room);
    }
    else if (selectedRoom.password === data.password) {
      console.log(data.username + ' joined ' + data.room);
      socket.join(data.room);
      if (callback) {
        callback(true);
      }
    } else {
      // callback false for error
      console.log(data.username + ' entered the wrong password for ' + data.room);
      if (callback) {
        callback(false);
      }
    }
  });
  socket.on('get-rooms', function(data, callback) {
    if(callback) {
      callback(rooms);
    }
  });
  socket.on('check-password', function(roomName, callback) {
    let selectedRoom = rooms.find(room=> room.name === roomName); // find the room
    // check if room has password
    if (selectedRoom.password === "") {
      // no password, return false
      if(callback) {
        callback(false);
      }
    } else {
      // has password, return true
      if(callback) {
        callback(true);
      }
    }
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});