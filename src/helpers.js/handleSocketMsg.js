const socketMessages = {
  iceCandidate: 'iceCandidate',
  joinRequest: 'joinRequest',
  offer: 'offer',
  answer: 'answer',
  badRoomName: 'room does not exist',
  ready: 'gameReady'
}

const connections = {};

function feedLocalStream(stream, connectionId){
  stream.getTracks().forEach(track => {
    connections[connectionId].addTrack(track, stream);
  });   
}

export default async function(msg, localStream, socket, addStreams, room){
  console.log(msg)
  switch (msg.type) {
    //Server sending ICE candidate, add to connection
    case socketMessages.iceCandidate:
      return connections[msg.fromId].addIceCandidate(new RTCIceCandidate(msg.candidate))

    //Received join request, create connection and attach stream, create offer, set and send description
    case socketMessages.joinRequest:
      connections[msg.socketId] = new RTCPeerConnection(null);
      feedLocalStream(localStream, msg.socketId);
      connections[msg.socketId].ontrack = e => addStreams(e.streams[0]);
      const offer = await connections[msg.socketId].createOffer()
      await connections[msg.socketId].setLocalDescription(offer)
      return socket.emit('description', {description: connections[msg.socketId].localDescription, toId: msg.socketId, fromId: socket.id});
    
    //recieved offer, create connection, add candidate handler, set description, set and send answer
    case socketMessages.offer:
      connections[msg.fromId] = new RTCPeerConnection(null);
      feedLocalStream(localStream, msg.fromId);
      connections[msg.fromId].onicecandidate = function(event){
        if(event.candidate){
          socket.emit('iceCandidate', {candidate: event.candidate, fromId: msg.toId, toId: msg.fromId})
        }
      }
      connections[msg.fromId].ontrack = e => addStreams(e.streams[0]);
      await connections[msg.fromId].setRemoteDescription(msg.description);
      const answer = await connections[msg.fromId].createAnswer();
      await connections[msg.fromId].setLocalDescription(answer);
      return socket.emit('answer', {answer, toId: msg.fromId, fromId: socket.id});
    
    //received answer, set description
    case socketMessages.answer:
      socket.emit('ready', room)
      return await connections[msg.fromId].setRemoteDescription(msg.answer);
      
    case socketMessages.badRoomName:
      return console.log('handle room name here')

    case socketMessages.ready:
      console.log('socket is up yo')
      window.dispatchEvent(new Event('gameReady'))
    
    default:
      console.log('no handling for server socket emit: ', msg)
  }
}