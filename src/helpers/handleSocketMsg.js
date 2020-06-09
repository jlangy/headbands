import store from '../store';
import { NEW_TURN, NEW_GAME, NEW_STREAM, ALL_PLAYERS_JOINED, GOT_NAMES, ADD_PLAYER, NAME_ADDED, SETUP_COMPLETE, END_GAME, CLEAR_STREAMS, RESTART_GAME, CLEAR_STREAM_NAMES } from '../reducers/types';
import gamePhases from '../reducers/gamePhases';


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
  joining: 'joining',
  xirres: 'xir response',
  updateSetNames: 'update set names',
  disconnection: 'host disconnection',
  restart: 'restart',
  newTurn: 'new turn'
}

//Save peer connections in form {socketID: RTCPeerConnection instance}
const connections = {};

//Add local stream to peer connection
function feedLocalStream(stream, connectionId){
  stream.getTracks().forEach(track => {
    connections[connectionId].addTrack(track, stream);
  });   
}

function createStreamConnection(socketId, iceServers, localId){
  // connections[socketId] = new RTCPeerConnection({iceServers});
  connections[socketId] = new RTCPeerConnection(null);
  feedLocalStream(store.getState().streams[localId].stream, socketId);
  connections[socketId].ontrack = e => store.dispatch({type: NEW_STREAM, payload: {stream: e.streams[0], socketId}});
}

export default async function(msg, socket){
  console.log(msg)
  switch (msg.type) {
    //Server sending ICE candidate, add to connection
    case socketMessages.iceCandidate:
        return connections[msg.fromId].addIceCandidate(new RTCIceCandidate(msg.candidate))
      // return connections[msg.fromId].addIceCandidate(msg.candidate)

    //Received join request, create connection and attach stream, create offer, set and send description
    case socketMessages.joinRequest: 
      createStreamConnection(msg.fromId, msg.iceServers, socket.id)
      const offer = await connections[msg.fromId].createOffer();
      await connections[msg.fromId].setLocalDescription(offer);
      connections[msg.fromId].onicecandidate = function(event){
        if(event.candidate){
          socket.emit('iceCandidate', {candidate: event.candidate, fromId: socket.id, toId: msg.fromId})
        }
        else {
          //TODO: might need some cleanup here if candidate null
          console.log('ice candidates finished')
        }
      }
      return socket.emit('description', {
        description: connections[msg.fromId].localDescription, 
        toId: msg.fromId, 
        fromId: socket.id,
        room: store.getState().game.name  
      });
    
    case socketMessages.newTurn:
      return store.dispatch({type: NEW_TURN, payload: {turn: msg.turn}});

    //recieved offer, create connection, add candidate handler, set description, set and send answer
    case socketMessages.offer:
      createStreamConnection(msg.fromId, msg.iceServers, socket.id)
      connections[msg.fromId].onicecandidate = function(event){
        if(event.candidate){
          socket.emit('iceCandidate', {candidate: event.candidate, fromId: msg.toId, toId: msg.fromId})
        }
        else {
          //TODO: might need some cleanup here if candidate null
          console.log('ice candidates finished')
        }
      }
      await connections[msg.fromId].setRemoteDescription(msg.description);
      const answer = await connections[msg.fromId].createAnswer();
      await connections[msg.fromId].setLocalDescription(answer);
      return socket.emit('answer', {answer, toId: msg.fromId, fromId: socket.id});
    
    //received answer, set description
    case socketMessages.answer:
      socket.emit('ready', {roomName: store.getState().game.name, joinerId: msg.fromId})
      //Set players joined here
      store.dispatch({type: ADD_PLAYER})
      return await connections[msg.fromId].setRemoteDescription(msg.answer);
      
    case socketMessages.badRoomName:
      return console.log('handle room name here')

    case socketMessages.gotNames:
      store.dispatch({type: GOT_NAMES, payload: {names: msg.names}})
      return store.dispatch({type: SETUP_COMPLETE})

    case socketMessages.nameTaken:
      return console.log('name taken')

    case socketMessages.roomNameOk:
      let {name, totalPlayers} = msg;
      return store.dispatch({type: NEW_GAME, payload: {name, totalPlayers, gamePhase: gamePhases.joining, playersJoined: 1, host:true}})

    case socketMessages.ready:
      return store.dispatch({type: ALL_PLAYERS_JOINED, payload: {turn: msg.turn}})

    case socketMessages.restart:
      store.dispatch({type: CLEAR_STREAM_NAMES})
      return store.dispatch({type: RESTART_GAME});

    case socketMessages.xirres:
      console.log(msg.iceServers);

    case socketMessages.disconnection:
      console.log('theres has been a disconnection')
      store.dispatch({type: END_GAME})
      return store.dispatch({type: CLEAR_STREAMS})

    case socketMessages.joining:{
      let {totalPlayers, name, playersJoined} = msg;
      return store.dispatch({type: NEW_GAME, payload: {name, totalPlayers, gamePhase: gamePhases.joining, playersJoined}})
    }

    case socketMessages.updateSetNames:
      return store.dispatch({type: NAME_ADDED})
    
    default:
      console.log('no handling for server socket emit: ')
  }
}