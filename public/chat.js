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
  const numPlayersSelect = document.getElementById('players-number'); 

  let peerConn;
  let localStream;
  const connections = {};

  makeRoomBtn.addEventListener('click', makeRoom)
  joinRoomBtn.addEventListener('click', joinRoom)

  async function makeRoom(){
    //Verify number of players set 
    const numPlayers = numPlayersSelect.value;
    if(!numPlayers){
      return console.log('Need to add players')
    }
    //Setup media 
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });

    //Connect stream to html and notify server
    localStream = stream;
    localVideo.srcObject = stream;
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

    //Tell server, wait 
    const roomName = joinRoomInput.value;    
    socket.emit('join room', {roomName, socketId: socket.id});
  }

  function feedLocalStream(stream, connectionId){
    stream.getTracks().forEach(track => {
      connections[connectionId].addTrack(track, stream);
    });   
  }

  socket.on('message', async msg => {
    switch (msg.type) {
      //Server sending ICE candidate, add to connection
      case socketMessages.iceCandidate:
        console.log(connections, msg.fromId)
        return connections[msg.fromId].addIceCandidate(new RTCIceCandidate(msg.candidate))

      //Received join request, create connection and attach stream, create offer, set and send description
      case socketMessages.joinRequest:
        connections[msg.socketId] = new RTCPeerConnection(null);
        feedLocalStream(localStream, msg.socketId);
        const offer = await connections[msg.socketId].createOffer()
        await connections[msg.socketId].setLocalDescription(offer)
        //This should only emit to connectee, currently emitting to ereyone
        return socket.emit('description', {description: connections[msg.socketId].localDescription, toId: msg.socketId, fromId: socket.id});
      
      //recieved offer, set description, set and send answer
      case socketMessages.offer:
        connections[msg.fromId] = new RTCPeerConnection(null);
        connections[msg.fromId].onicecandidate = function(event){
          if(event.candidate){
            socket.emit('iceCandidate', {candidate: event.candidate, fromId: msg.toId, toId: msg.fromId})
          }
        }
        connections[msg.fromId].ontrack = gotStream;
        await connections[msg.fromId].setRemoteDescription(msg.description);
        const answer = await connections[msg.fromId].createAnswer();
        await connections[msg.fromId].setLocalDescription(answer);
        return socket.emit('answer', {answer, toId: msg.fromId, fromId: socket.id});
      
      //received answer, set description
      case socketMessages.answer:
        return await connections[msg.fromId].setRemoteDescription(msg.answer);
        
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