// const socket = io.connect("http://192.168.0.100:3000")

function main(){

const socket = io.connect("http://localhost:3001")

const localVideo = document.getElementById('local');
const remoteVideo = document.getElementById('remote');
const roomId = document.getElementById('roomId');
const joinRoomBtn = document.getElementById('joinRoom');
const makeRoomBtn = document.getElementById('makeRoom');
const roomName = document.getElementById('createRoomInput');
const joinRoomInput = document.getElementById('roomIdInput');

let seekingRoom = false;
let acceptingFriends = false;
let peerConn;
let awaitingAnswer = false;
let localStream;

makeRoomBtn.addEventListener('click', makeRoom)
joinRoomBtn.addEventListener('click', joinRoom)

async function makeRoom(){
  //Setup media and connect stream
  acceptingFriends = true;
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });

  //RTC setup
  peerConn = new RTCPeerConnection(null); //{'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }]});
  // peerConn.addEventListener('icecandidate', handleConnection);
  feedLocalStream(stream);

  socket.emit('make room', roomName.value);
  console.log('make rm emit')
}

function joinRoom(){
  const roomId = joinRoomInput.value;
  socket.emit('join room', roomId);
  seekingRoom = true;
  peerConn = new RTCPeerConnection(null); //{'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }]});
  peerConn.onicecandidate = function(event){
    console.log('event is;',event)
    if(event.candidate){
      socket.emit('iceCandidate', event.candidate)
    }
  }

  peerConn.ontrack = gotStream;
}

function feedLocalStream(stream){
  localVideo.srcObject = stream;
  localStream = stream;
  // roomId.innerText = `Connected to room ${socket.id}`
  localStream.getTracks().forEach(track => {
    console.log('adding track')
    peerConn.addTrack(track, localStream);
  });  
}

socket.on('message', async msg => {
  if(msg.type === 'iceCandidate'){
    console.log(msg)
    peerConn.addIceCandidate(new RTCIceCandidate(msg.event))
  }
  if(msg.type === 'joinRequest' && acceptingFriends){
    console.log('joinRequestEvent')
    const offer = await peerConn.createOffer()
    await peerConn.setLocalDescription(offer)

    socket.emit('description', peerConn.localDescription);
    awaitingAnswer = true;
  } else if(msg.type === 'offer' && seekingRoom){
    console.log('offer evnet')
    await peerConn.setRemoteDescription(msg.description);
    const answer = await peerConn.createAnswer();
    await peerConn.setLocalDescription(answer);
    socket.emit('answer', answer);
  } else if (msg.type === 'answer' && awaitingAnswer){
    await peerConn.setRemoteDescription(msg.answer);
  }
  else if(msg.type === 'room does not exist'){
    console.log('bad room name mate')
  }
})

function gotStream(event){
  remoteVideo.srcObject = event.streams[0];
}
}

window.onload = main;