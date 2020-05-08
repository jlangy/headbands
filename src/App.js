import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Video from './components/Video'
import handleSocketMsg from "./helpers/handleSocketMsg";
import io from 'socket.io-client';
import Landing from './components/Landing'
import { connect } from 'react-redux';
import { createStream } from './actions/streamActions';


let localStream;

function App({streams, game, createStream}) {
  const [socket, setSocket] = useState();
  const [nameToGuess, setNameToGuess] = useState();
  
  useEffect(() => {
    // const socket = io.connect("http://192.168.0.100:3001")
    const socket = io.connect(window.location.hostname)
    // const socket = io.connect('/')
    // let socket = io.connect("http://localhost:3001")
    socket.on('message', msg => {
      handleSocketMsg(msg, localStream, socket, addStreams)
    });
    setSocket(socket);
  }, []); 

  function addStreams(stream, socketId){
    createStream({stream, socketId})
  }

  function setName(){
    socket.emit('setName', {nameToGuess, roomName: game.name})
  }

  function times(n){
    return new Array(n).fill(0);
  }

  return (
      <div className="App">
        <main>
          <h1>Headbandz</h1>
          <Landing addStreams={addStreams} socket={socket}/>
          {game.allPlayersJoined && <><input type="text" onChange={e => setNameToGuess(e.target.value)}/><button onClick={setName}>Set name</button></>}
          {game.afoot && 
            <div>
              <div className="videos-container">
                <h2>In room: {game.name}</h2>
                <Video id="local" stream={streams['local'] && streams['local'].stream}/>
                {Object.keys(streams).filter(streamName => streamName !== 'local').map((streamName,i) => 
                <div>
                  <Video stream={streams[streamName].stream} key={i} id={`stream${i}`}/>
                  <h3>{streamName}</h3>
                  <h3>{streams[streamName].name}</h3>
                </div>
              )}
              {game.totalPlayers && times(game.totalPlayers - Object.keys(streams).length).map((a,i) => 
                <div className='video-container' key={i}>
                  Waiting for player
                </div> 
              )}
              </div>
            </div>
          }
        </main>
      </div>
  );
}

const mapStateToProps = state => ({
  streams: state.streams,
  game: state.game
});

export default connect(mapStateToProps, {createStream})(App);
