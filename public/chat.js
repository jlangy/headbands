const socketMessages = {
  iceCandidate: 'iceCandidate',
  joinRequest: 'joinRequest',
  offer: 'offer',
  answer: 'answer',
  badRoomName: 'room does not exist'
}

function main(){
  // const socket = io.connect("http://192.168.0.100:3000")
  const socket = io.connect("http://localhost:3001")

  const localVideo = document.getElementById('local');
  const remoteVideo = document.getElementById('remote');
  const joinRoomBtn = document.getElementById('joinRoom');
  const makeRoomBtn = document.getElementById('makeRoom');
  const roomName = document.getElementById('createRoomInput');
  const joinRoomInput = document.getElementById('roomIdInput');

  let peerConn;

  makeRoomBtn.addEventListener('click', makeRoom)
  joinRoomBtn.addEventListener('click', joinRoom)

  async function makeRoom(){
    //Setup media 
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    
    //Setup RTC connection, connect stream to html and RTC connection, and notify server
    peerConn = new RTCPeerConnection(null);
    feedLocalStream(stream);
    socket.emit('make room', roomName.value);
  }

  //Current setup is to notify other connection,
  //Who initiates the offer/answer process,
  //Which made more sense to me conceptually 
  //As they created the room. But possibly should
  //initiate offer/answer here, save a 
  //socket trip
  function joinRoom(){
    // Create connection with ICE listener
    peerConn = new RTCPeerConnection(null);
    peerConn.onicecandidate = function(event){
      if(event.candidate){
        socket.emit('iceCandidate', event.candidate)
      }
    }
    //Tell server, wait 
    const roomName = joinRoomInput.value;    
    socket.emit('join room', roomName);
    peerConn.ontrack = gotStream;
  }

  function feedLocalStream(stream){
    localVideo.srcObject = stream;
    stream.getTracks().forEach(track => {
      peerConn.addTrack(track, stream);
    });   
  }

  socket.on('message', async msg => {
    switch (msg.type) {
      //Server sending ICE candidate, add to connection
      case socketMessages.iceCandidate:
        return peerConn.addIceCandidate(new RTCIceCandidate(msg.event))
      //Received join request, create offer, set and send description
      case socketMessages.joinRequest:
        const offer = await peerConn.createOffer()
        await peerConn.setLocalDescription(offer)
        return socket.emit('description', peerConn.localDescription);
      //recieved offer, set description, set and send answer
      case socketMessages.offer:
        await peerConn.setRemoteDescription(msg.description);
        const answer = await peerConn.createAnswer();
        await peerConn.setLocalDescription(answer);
        return socket.emit('answer', answer);
      //received answer, set description
      case socketMessages.answer:
        return await peerConn.setRemoteDescription(msg.answer);
        
      case socketMessages.badRoomName:
        return console.log('handle room name here')
      
      default:
        console.log('no handling for server socket emit: ', msg)
    }
  });

  function gotStream(event){
    remoteVideo.srcObject = event.streams[0];
  }
}

window.onload = main;