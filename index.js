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

  socket.on('join room', id => {
    if(io.sockets.adapter.rooms[id]){
      socket.to(id).emit('message', {type: 'joinRequest', roomId: id})
    } else {
      socket.emit('message', {type:'room does not exist'})
    }
  });

  socket.on('description', data => {
    socket.broadcast.emit('message', {type: 'offer', description: data})
  });

  socket.on('answer', answer => {
    socket.broadcast.emit('message', {type: 'answer', answer})
  });

  socket.on('iceCandidate', event => {
    socket.broadcast.emit('message', {type: 'iceCandidate', event})
  })
})
