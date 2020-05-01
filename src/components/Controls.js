import React, { useState, useEffect } from "react";
import "./controls.css";

async function turnOnLocalMedia(addStreams, name, setRoom){
  //Setup media 
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });

  //Connect stream to html and notify server
  addStreams(stream, name)
}

function Controls({addStreams, socket, setRoom}) {

  const [begin, setBegin] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const [joinRoomName, setJoinRoomName] = useState('');
  const [makeRoomName, setMakeRoomName] = useState('');
  const [nameToGuess, setNameToGuess] = useState('');

  useEffect(() => {
    window.addEventListener("gameReady", () => {console.log('yeaaaa boi'); setBegin(true)});
  }, []);

  async function makeRoom(){
    //Verify number of players set 
    if(!numPlayers){
      return console.log('Need to add players')
    }
    turnOnLocalMedia(addStreams, 'local');
    setRoom(makeRoomName);
    socket.emit('make room', {name: makeRoomName, totalPlayers: numPlayers});
  }

  async function joinRoom(){
    //Tell server, wait     
    await turnOnLocalMedia(addStreams);
    setRoom(joinRoomName);
    socket.emit('join room', {roomName: joinRoomName, socketId: socket.id});
  }

  function setGameName(event){
    socket.emit('setName', {name: nameToGuess, room: makeRoomName || joinRoomName})
  }

  return (
    <div className="controls-container">
      {begin && 
        <div className="input-group">
          <input type="text" placeholder="select name" onChange={e => setNameToGuess(e.target.value)}/>
          <button placeholder="enter famous name" onClick={setGameName}>Set</button>
        </div>}
      <div className="input-group">
        <input type="text" id="createRoomInput" placeholder="room name" onChange={e => setMakeRoomName(e.target.value)}/>
        <button id="makeRoom" onClick={makeRoom}>Create Room</button>
        <input
          type="number"
          name="players-number"
          id="players-number"
          min="2"
          max="6"
          placeholder="select number of players"
          onChange={e => setNumPlayers(e.target.value)}
        />
        <label htmlFor="players-number">Total Players</label>
      </div>
      <div className="input-group">
        <input type="text" id="roomIdInput" onChange={e => setJoinRoomName(e.target.value)}/>
        <button id="joinRoom" onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Controls;
