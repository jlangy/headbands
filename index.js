const express = require('express');
// require('dotenv').config();
const socket = require('socket.io');
const path = require('path');
const axios = require('axios');
const port = process.env.PORT || 3000;

const app = express();
// const server = app.listen(port, '0.0.0.0', () => console.log(`listening on port ${port}`));
const server = app.listen(port, () => console.log(`listening on port ${port}`));
const io = socket(server);

let names = [];
let rooms = {};

app.use(express.static(path.join(__dirname, 'build')));

function shiftNames(names){
  const shiftedNames = [];
  names.forEach((name,i) => {
    if(i === names.length - 1){
      shiftedNames[0] = {toId: names[0].fromId, name: name.nameToGuess};
    } else {
      shiftedNames[i+1] = {toId: names[i+1].fromId, name: name.nameToGuess}
    }
  });
  return shiftedNames                                                           
}

io.on('connection', function(socket){

  socket.on('make room', ({name, totalPlayers}) => {
    totalPlayers = Number(totalPlayers);
    if(rooms[name]){
      return socket.emit('message', {type: 'name taken'});
    }
    socket.emit('message', {type: 'room name ok', name, totalPlayers})
    rooms[name] = {totalPlayers, name, playersJoined: 1, namesToGuess: []};
    socket.join(name);
  })

  socket.on('xir test', () => {
    console.log(`https://${process.env.XIR_USER}:${process.env.secret}@${process.env.endpoint}/_turn/${process.env.xir_path}`)
    axios.put(`https://${process.env.XIR_USER}:${process.env.secret}@${process.env.endpoint}/_turn/${process.env.xir_path}`, {"format": "urls"})
    .then(({data}) => socket.emit('message', {type: 'xir response', iceServers: data.v}))  
  });

  socket.on('join room', async ({roomName, fromId}) => {
    let roomToJoin = rooms[roomName];
    if( roomToJoin && roomToJoin.playersJoined < roomToJoin.totalPlayers ){
      // const xirsysResponse = await axios.put('https://jlangy:5cca2fee-92e1-11ea-80e2-0242ac150003@global.xirsys.net/_turn/headbandz')
      const xirsysResponse = await axios.put(`https://${process.env.XIR_USER}:${process.env.secret}@${process.env.endpoint}/_turn/${process.env.xir_path}`, {"format": "urls"})
      socket.to(roomName).emit('message', {type: 'joinRequest', roomName, fromId, iceServers: xirsysResponse.data.v});
      socket.emit('message', {type: 'joining', totalPlayers: roomToJoin.totalPlayers, name: roomName})
      socket.join(roomName)
    } else {
      socket.emit('message', {type:'cannot join'})
    }
  });

  socket.on('description', async ({description, toId, fromId}) => {
    const xirsysResponse = await axios.put(`https://${process.env.XIR_USER}:${process.env.secret}@${process.env.endpoint}/_turn/${process.env.xir_path}`, {"format": "urls"})
    io.sockets.sockets[toId].emit('message', {type: 'offer', description, toId, fromId, iceServers: xirsysResponse.data.v})
  });

  socket.on('answer', ({answer, fromId, toId}) => {
    io.sockets.sockets[toId].emit('message', {type: 'answer', answer, fromId})
  });

  socket.on('iceCandidate', ({candidate, fromId, toId}) => {
    io.sockets.sockets[toId].emit('message', {type: 'iceCandidate', candidate, fromId})
  });

  socket.on('setName', ({nameToGuess, roomName}) => {
    // names.push({fromId: socket.id, name: msg.name});
    console.log('name logged on backend')
    const namesToGuess = rooms[roomName].namesToGuess;
    namesToGuess.push({fromId: socket.id, nameToGuess})
    if(namesToGuess.length === rooms[roomName].totalPlayers){
      const shiftedNames = shiftNames(namesToGuess);
      io.in(roomName).emit('message', {type: 'give names', names: shiftedNames})
    }
  });

  socket.on('ready', roomName => {
    const room = rooms[roomName];
    //There will be n-1 answers from nth joiner, so add 1/n-1.
    room.playersJoined += 1  / Math.floor(room.playersJoined);
    if (Math.round(room.playersJoined) == room.totalPlayers){
      io.in(roomName).emit('message', {type: 'gameReady'})
    }
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});


//server.js
// const express = require('express');
// const path = require('path');
// const port = process.env.PORT || 8080;
// const app = express();
// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(port);