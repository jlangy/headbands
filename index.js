const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT || 3001;

const app = express();
const server = app.listen(port, '0.0.0.0', () => console.log(`listening on port ${port}`));
const io = socket(server);

io.on('connection', function(socket){
  console.log('connection made');
  
  socket.on('make room', name => {
    socket.join(name);
  })

  socket.on('join room', msg => {
    if(io.sockets.adapter.rooms[msg.roomName]){
      socket.to(msg.roomName).emit('message', {type: 'joinRequest', roomId: msg.roomName, socketId: msg.socketId})
    } else {
      socket.emit('message', {type:'room does not exist'})
    }
  });

  socket.on('description', data => {
    console.log(Object.keys(io.sockets.sockets), data.socketId)
    io.sockets.sockets[data.toId].emit('message', {type: 'offer', description: data.description, toId: data.toId, fromId: data.fromId})
  });

  socket.on('answer', answer => {
    io.sockets.sockets[answer.toId].emit('message', {type: 'answer', answer: answer.answer, fromId: answer.fromId})
  });

  socket.on('iceCandidate', event => {
    io.sockets.sockets[event.toId].emit('message', {type: 'iceCandidate', candidate: event.candidate, fromId: event.fromId})
  })
})
