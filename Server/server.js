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
    console.log(error);
    res.sendStatus(400);
  })

});

app.get('/api/icon/:name/', (req, res) => {
  axios.get("https://api.opendota.com/api/herostats/")
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
  axios.get("https://api.opendota.com/api/herostats/")
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


// app.get('/api/matchup/:hero1/:hero2', (req, res) => {
//   const heroId1 = getHeroId(req.params.hero1);
//   const heroId2 = getHeroId(req.params.hero2);
//   axios.get('https://api.opendota.com/api/' + heroId1 + '/matchups')
//   .then(function(response){
//       const responseData = response.data;
//       let heroData = responseData.find(elem => elem.hero_id === heroId2);
//       let gamesPlayed = heroData.games_played;
//       let wins = heroData.wins;
//       let winRate = Math.round(wins / gamesPlayed);
//       res.send(winRate.toString());
//   })
//   .catch(function(error){
//     console.log(error);
//     res.send(error);
//     // res.sendStatus(400);
//   })
// });

// function getHeroId(name) {
//   axios.get("https://api.opendota.com/api/herostats/")
//   .then(function(response){
//       const responseData = response.data;
//       const heroname = name.toUpperCase() + name.slice(1); // first letter in name to uppercase
//       console.log(heroname);
//       let heroData = responseData.find(elem => elem.localized_name === heroname);
//       let heroID = heroData.id;
//       res.send(heroID.toString());
//   })
//   .catch(function(error){
//     console.log(error);
//     res.sendStatus(400);
//   })
// }

let rooms = [];

io.on('connection', function(socket) {
  socket.on('chat-message', function(data) {
    console.log('username ' + data.username + ' said ' + data.msg );
    io.to(data.room).emit('ReciveMessage', { msg: data.msg, username: data.username, room: data.room }); // ska vara data.username, fixa sen när vi inte har merge issues med chatinputData
  });
  socket.on('Typing', function(data){
    console.log(data.username + ' Is typing a message...');
    io.to(data.room).emit('TypingMessage', {username: data.username, room: data.room} );
  });
  socket.on('join-room', function(data, callback) {
    // check if room is in list of rooms 
    let selectedRoom = rooms.find(room=> room.name === data.room);
    if (selectedRoom !== undefined) {
      // room exists check if password 
      if (selectedRoom.password === data.password) {
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
    } else {
      console.log(data.username + ' joined ' + data.room);
      rooms.push({ name: data.room, password: data.password });
      socket.join(data.room);
      if (callback) {
        callback(true);
      }
    }
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});