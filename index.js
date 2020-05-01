const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT || 3001;

const app = express();
const server = app.listen(port, '0.0.0.0', () => console.log(`listening on port ${port}`));
const io = socket(server);

let players = 0;
let totalPlayers;

io.on('connection', function(socket){
  console.log('connection made');
  
  socket.on('make room', msg => {
    socket.join(msg.name);
    totalPlayers = msg.totalPlayers;
    players = 1;
  })

  socket.on('join room', msg => {
    if(io.sockets.adapter.rooms[msg.roomName]){
      socket.to(msg.roomName).emit('message', {type: 'joinRequest', roomId: msg.roomName, socketId: msg.socketId})
      socket.join(msg.roomName)
    } else {
      socket.emit('message', {type:'room does not exist'})
    }
  });

  socket.on('description', data => {
    io.sockets.sockets[data.toId].emit('message', {type: 'offer', description: data.description, toId: data.toId, fromId: data.fromId})
  });

  socket.on('answer', answer => {
    io.sockets.sockets[answer.toId].emit('message', {type: 'answer', answer: answer.answer, fromId: answer.fromId})
  });

  socket.on('iceCandidate', event => {
    io.sockets.sockets[event.toId].emit('message', {type: 'iceCandidate', candidate: event.candidate, fromId: event.fromId})
  })

  socket.on('ready', msg => {
    players += 1;
    if (players == totalPlayers){
      console.log('ready ran', msg)
      io.in(msg).emit('message', {type: 'gameReady'})
    }
  })
})
