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
  const [emptyVideos, setEmptyVideos] = useState([]);
  const [nameToGuess, setNameToGuess] = useState();
  // const [streams, setStreams] = useState([]);
  const [room, setRoom] = useState('');
  const [gameOn, setGameOn] = useState(false);
  const numPlayers = useRef(2);
  
  useEffect(() => {
    // const socket = io.connect("http://192.168.0.100:3001")
    // const socket = io.connect(window.location.hostname)
    // const socket = io.connect('/')
    let socket = io.connect("http://localhost:3001")
    socket.on('message', msg => {
      handleSocketMsg(msg, localStream, socket, addStreams, room, addStreamNames, setGameOn, numPlayers)
    });
    setSocket(socket);
  }, []); 

  function addStreamNames(names){
  }

  function addStreams(stream, socketId){
    createStream({stream, socketId})
  }

  function setName(){
    socket.emit('setName', {nameToGuess, roomName: game.name})
  }

  return (
      <div className="App">
        <main>
          <h1>Headbandz</h1>
          <Landing addStreams={addStreams} socket={socket} setRoom={setRoom} setGameOn={setGameOn} numPlayers={numPlayers}/>
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
              {game.totalPlayers && new Array((Object.keys(streams).length)).map((a,i) => 
                <div className='video-container' key={i}>
                  {i}
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
// export default App;
