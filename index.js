const express = require('express');
const socket = require('socket.io');

let id = 1;
let rooms = [];

const app = express();

const server = app.listen(3000, '0.0.0.0', () => console.log('listening on port 3000'));

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function(socket){
  console.log('connected!');

  socket.on('make room', name => {
    socket.join(name, () => {console.log(socket)});
  })

  socket.on('join room', id => {
    if(io.sockets.adapter.rooms[id]){
      socket.to(id).emit('message', {type: 'joinRequest', roomId: id})
    } else {
      console.log('hih hi in here')
      socket.emit('message', {type:'room does not exist'})
    }
  });

  socket.on('description', data => {
    socket.broadcast.emit('message', {description: data, type: 'offer'})
  });

  socket.on('answer', answer => {
    socket.broadcast.emit('message', {type: 'answer', answer})
  });

  socket.on('iceCandidate', event => {
    console.log(event)
    socket.broadcast.emit('message', {type: 'iceCandidate', event})
  })
})
