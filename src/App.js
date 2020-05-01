import React, { useState, useEffect } from 'react';
import './App.css';
import Video from './components/Video'
import Controls from './components/Controls'
import handleSocketMsg from "./helpers.js/handleSocketMsg";
import io from 'socket.io-client';

let localStream, room;
const connections = {};

function App() {
  const [socket, setSocket] = useState();
  const [streams, setStreams] = useState([]);

  
  useEffect(() => {
    // const socket = io.connect("http://192.168.0.100:3000")
    let socket = io.connect("http://localhost:3001")
    socket.on('message', msg => {
      handleSocketMsg(msg, localStream, socket, addStreams)
    });
    setSocket(socket);
  }, []);


  function addStreams(stream, name){
    if(streams.length === 0){
      console.log('stream is:', stream)
      localStream = stream;
    }

    setStreams(prev => [...prev, stream])
    console.log('addscreens ran', streams)
  }

  return (
    <div className="App">
      <main>
        <h1>Headbandz with a z because it's cooler</h1>
        <div className="videos-container">
          <Video id="local" stream={streams[0]}/>
        </div>
        <Controls addStreams={addStreams} socket={socket} streams={streams}/>
        {streams.slice(1).map((stream,i) => <Video stream={stream} key={i} id={`stream${i}`}/>)}

      </main>
    </div>
  );
}

export default App;
