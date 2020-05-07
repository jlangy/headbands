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
    // setStreams(prev => {
    //   const newStreams = [];
    //   prev.forEach(streamObj => {
    //     const matchingName = names.find(name => name.toId === streamObj.socketId);
    //     newStreams.push({...streamObj, name: matchingName && matchingName.name})
    //   });
    //   return newStreams;
    // });
  }

  function logStreams(){
    console.log(streams);
  }

  function addStreams(stream, socketId){
    // let fullVideos;
    // setStreams(prev => {
    //   if(prev.length === 0){
    //     localStream = stream;
    //   }
    //   fullVideos = prev.length + 1;
    //   return [...prev, {stream, socketId}]
    // });
    // setEmptyVideos(prev => new Array(numPlayers.current - fullVideos).fill(0));
    createStream({stream, socketId})
  }

  return (
      <div className="App">
        <main>
          <h1>Headbandz</h1>
          <Landing addStreams={addStreams} socket={socket} setRoom={setRoom} setGameOn={setGameOn} numPlayers={numPlayers}/>
          {game.afoot && 
            <div>
              <div className="videos-container">
                <h2>In room: {game.name}</h2>
                <Video id="local" stream={streams[0] && streams[0].stream}/>
                {streams.slice(1).map((stream,i) => 
                <div>
                  <Video stream={stream.stream} key={i} id={`stream${i}`}/>
                  <h3>{stream.name}</h3>
                </div>
              )}
              {emptyVideos.map((a,i) => 
                <div className='video-container' key={i}>
                </div> 
              )}
              </div>
            </div>
          }
          <button onClick={logStreams}>log streams</button>
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
