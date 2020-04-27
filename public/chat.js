const socket = io.connect("http://localhost:3000")

const localVideo = document.getElementById('local')
const remoteVideo = document.getElementById('remote')
const roomId = document.getElementById('roomId')
const makeRoomBtn = document.getElementById('makeRoom')
const joinRoomBtn = document.getElementById('joinRoom')
const joinRoomInput = document.getElementById('roomIdInput')

makeRoomBtn.addEventListener('click', makeRoom)
joinRoomBtn.addEventListener('click', joinRoom)

function makeRoom(){
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  })
  .then(feedLocalStream)
  .catch(function(e) {
    alert('getUserMedia() error: ' + e.name);
  });
}

function joinRoom(){
  const roomId = joinRoomInput.value;
  socket.emit('join room', roomId)
}

function feedLocalStream(stream){
  localVideo.srcObject = stream;
  roomId.innerText = `Connected to room ${socket.id}`
}