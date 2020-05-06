const express = require('express');
const socket = require('socket.io');
const path = require('path')
const port = process.env.PORT || 5000;

const app = express();
// const server = app.listen(port, '0.0.0.0', () => console.log(`listening on port ${port}`));
const server = app.listen(port, () => console.log(`listening on port ${port}`));
const io = socket(server);

let names = [];
let rooms = {};

app.use(express.static(path.join(__dirname, 'client/build')));

function shiftNames(names){
  const shiftedNames = [];
  names.forEach((name,i) => {
    if(i === names.length - 1){
      shiftedNames[0] = {toId: names[0].fromId, name: name.name};
    } else {
      shiftedNames[i+1] = {toId: names[i+1].fromId, name: name.name}
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
    socket.emit('message', {type: 'room name ok'})
    rooms[name] = {totalPlayers, name, playersJoined: 1, namesToGuess: []};
    socket.join(name);
  })

  socket.on('join room', ({roomName, fromId}) => {
    let roomToJoin = rooms[roomName];
    console.log(roomToJoin)
    if( roomToJoin && roomToJoin.playersJoined < roomToJoin.totalPlayers ){
      socket.to(roomName).emit('message', {type: 'joinRequest', roomName, fromId});
      socket.emit('message', {type: 'joining', players: roomToJoin.totalPlayers})
      socket.join(roomName)
    } else {
      socket.emit('message', {type:'cannot join'})
    }
  });

  socket.on('description', ({description, toId, fromId}) => {
    io.sockets.sockets[toId].emit('message', {type: 'offer', description, toId, fromId})
  });

  socket.on('answer', ({answer, fromId, toId}) => {
    io.sockets.sockets[toId].emit('message', {type: 'answer', answer, fromId})
  });

  socket.on('iceCandidate', ({candidate, fromId, toId}) => {
    io.sockets.sockets[toId].emit('message', {type: 'iceCandidate', candidate, fromId})
  });

  socket.on('setName', ({nameToGuess, roomName}) => {
    // names.push({fromId: socket.id, name: msg.name});
    const namesToGuess = rooms[roomName].namesToGuess;
    namesToGuess.push({fromId: socket.id, nameToGuess})
    if(namesToGuess.length === rooms[roomName].totalPlayers){
      const shiftedNames = shiftNames(nameToGuess);
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
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});