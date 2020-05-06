const socketMessages = {
  iceCandidate: 'iceCandidate',
  joinRequest: 'joinRequest',
  offer: 'offer',
  answer: 'answer',
  badRoomName: 'cannot join',
  ready: 'gameReady',
  gotNames: 'give names',
  nameTaken: 'name taken',
  roomNameOk: 'room name ok',
  joining: 'joining'
}

const connections = {};

function feedLocalStream(stream, connectionId){
  stream.getTracks().forEach(track => {
    connections[connectionId].addTrack(track, stream);
  });   
}

function createStreamConnection(socketId, localStream, addStreams){
  connections[socketId] = new RTCPeerConnection(null);
  feedLocalStream(localStream, socketId);
  connections[socketId].ontrack = e => addStreams(e.streams[0], socketId);
}

export default async function(msg, localStream, socket, addStreams, room, addStreamNames, setGameOn, numPlayers){
  console.log(msg)
  switch (msg.type) {
    //Server sending ICE candidate, add to connection
    case socketMessages.iceCandidate:
      return connections[msg.fromId].addIceCandidate(new RTCIceCandidate(msg.candidate))

    //Received join request, create connection and attach stream, create offer, set and send description
    case socketMessages.joinRequest:
      createStreamConnection(msg.fromId, localStream, addStreams)
      const offer = await connections[msg.fromId].createOffer()
      await connections[msg.fromId].setLocalDescription(offer)
      return socket.emit('description', {description: connections[msg.fromId].localDescription, toId: msg.fromId, fromId: socket.id});
    
    //recieved offer, create connection, add candidate handler, set description, set and send answer
    case socketMessages.offer:
      createStreamConnection(msg.fromId, localStream, addStreams)
      connections[msg.fromId].onicecandidate = function(event){
        if(event.candidate){
          socket.emit('iceCandidate', {candidate: event.candidate, fromId: msg.toId, toId: msg.fromId})
        }
      }
      await connections[msg.fromId].setRemoteDescription(msg.description);
      const answer = await connections[msg.fromId].createAnswer();
      await connections[msg.fromId].setLocalDescription(answer);
      return socket.emit('answer', {answer, toId: msg.fromId, fromId: socket.id});
    
    //received answer, set description
    case socketMessages.answer:
      console.log(window.roomName)
      socket.emit('ready', window.roomName)
      return await connections[msg.fromId].setRemoteDescription(msg.answer);
      
    case socketMessages.badRoomName:
      return console.log('handle room name here')

    case socketMessages.gotNames:
      return addStreamNames(msg.names);

    case socketMessages.nameTaken:
      return console.log('name taken')

    case socketMessages.roomNameOk:
      return window.dispatchEvent(new Event('makeRoom'))

    case socketMessages.ready:
      return window.dispatchEvent(new Event('gameReady'))

    case socketMessages.joining:
      numPlayers.current = msg.players;
      return setGameOn(true);
    
    default:
      console.log('no handling for server socket emit: ')
  }
}