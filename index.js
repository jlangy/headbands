const express = require('express');
const socket = require('socket.io');

let id = 1;

const app = express();

const server = app.listen(3000, () => console.log('listening on port 3000'));

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function(socket){
  console.log('connected!');

  socket.on('join room', id => {
    if(io.sockets.adapter.rooms[id]){
      socket.join(id);
    }
    else {
      console.log('room DNE')
    }
  })
})