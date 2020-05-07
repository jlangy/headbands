import store from '../store';
import { createGame } from '../actions/gameActions';
import { NEW_GAME, NEW_STREAM, ALL_PLAYERS_JOINED } from '../actions/types';


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
  console.log('csc ran')
  connections[socketId] = new RTCPeerConnection(null);
  feedLocalStream(store.getState().streams[0].stream, socketId);
  // connections[socketId].ontrack = e => addStreams(e.streams[0], socketId);
  connections[socketId].ontrack = e => store.dispatch({type: NEW_STREAM, payload: {stream: e.streams[0], socketId}});
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
        //TODO: might need some cleanup here if candidate null
      }
      await connections[msg.fromId].setRemoteDescription(msg.description);
      const answer = await connections[msg.fromId].createAnswer();
      await connections[msg.fromId].setLocalDescription(answer);
      return socket.emit('answer', {answer, toId: msg.fromId, fromId: socket.id});
    
    //received answer, set description
    case socketMessages.answer:
      socket.emit('ready', window.roomName)
      return await connections[msg.fromId].setRemoteDescription(msg.answer);
      
    case socketMessages.badRoomName:
      return console.log('handle room name here')

    case socketMessages.gotNames:
      return addStreamNames(msg.names);

    case socketMessages.nameTaken:
      return console.log('name taken')

    case socketMessages.roomNameOk:
      let {name, totalPlayers} = msg;
      return store.dispatch({type: NEW_GAME, payload: {name, totalPlayers, afoot: true}})
      // return window.dispatchEvent(new Event('makeRoom'))

    case socketMessages.ready:
      console.log('all ready boss')
      // return window.dispatchEvent(new Event('gameReady'))
      return store.dispatch({type: ALL_PLAYERS_JOINED})

    case socketMessages.joining:{
      let {totalPlayers, name} = msg;
      return store.dispatch({type: NEW_GAME, payload: {name, totalPlayers, afoot: true}})
    }
    
    default:
      console.log('no handling for server socket emit: ')
  }
}