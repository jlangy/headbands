const express = require('express');
const socket = require('socket.io');

let id = 1;

const app = express();

const server = app.listen(3000, '0.0.0.0', () => console.log('listening on port 3000'));

app.use(express.static('public'));

const io = socket(server, {
  handlePreflightRequest: (req, res) => {
  const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true
  };
  res.writeHead(200, headers);
  res.end();
}});

io.set('origins', '*:*');

io.on('connection', function(socket){
  console.log('connected!');

  socket.on('join room', id => {
    socket.broadcast.emit('message', {type: 'joinRequest', roomId: id})
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
