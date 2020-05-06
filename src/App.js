import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Video from './components/Video'
import Controls from './components/Controls'
import handleSocketMsg from "./helpers.js/handleSocketMsg";
import io from 'socket.io-client';
import Landing from './components/Landing'

let localStream;

function App() {
  const [socket, setSocket] = useState();
  const [streams, setStreams] = useState([]);
  const [emptyVideos, setEmptyVideos] = useState([]);
  // const [streams, setStreams] = useState([]);
  const [room, setRoom] = useState('');
  const [gameOn, setGameOn] = useState(false);
  const numPlayers = useRef(2);
  
  useEffect(() => {
    // const socket = io.connect("http://192.168.0.100:3001")
    const socket = io.connect(window.location.hostname)
    // let socket = io.connect("http://localhost:3001")
    socket.on('message', msg => {
      handleSocketMsg(msg, localStream, socket, addStreams, room, addStreamNames, setGameOn, numPlayers)
    });
    setSocket(socket);
  }, []); 

  function addStreamNames(names){
    setStreams(prev => {
      const newStreams = [];
      prev.forEach(streamObj => {
        const matchingName = names.find(name => name.toId === streamObj.socketId);
        newStreams.push({...streamObj, name: matchingName && matchingName.name})
      });
      return newStreams;
    });
  }

  function logStreams(){
    console.log(streams);
  }

  function addStreams(stream, socketId){
    let fullVideos;
    setStreams(prev => {
      if(prev.length === 0){
        localStream = stream;
      }
      fullVideos = prev.length + 1;
      return [...prev, {stream, socketId}]
    });
    setEmptyVideos(prev => new Array(numPlayers.current - fullVideos).fill(0));
  }

  return (
    <div className="App">
      <main>
        <h1>Headbandz</h1>
        {!gameOn && <Landing addStreams={addStreams} socket={socket} setRoom={setRoom} setGameOn={setGameOn} numPlayers={numPlayers}/>}
        {gameOn && 
          <div>
            <div className="videos-container">
              <h2>In room: {room}</h2>
              <Video id="local" stream={streams[0] && streams[0].stream}/>
            {streams.slice(1).map((stream,i) => 
              <div>
                <Video stream={stream.stream} key={i} id={`stream${i}`}/>
                <h3>{stream.name}</h3>
              </div>
            )}
            {emptyVideos.map(() => 
              <div className='video-container'>
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

export default App;
