import React, { useState, useEffect } from 'react';
import './App.css';
import Video from './components/Video'
import Controls from './components/Controls'
import handleSocketMsg from "./helpers.js/handleSocketMsg";
import io from 'socket.io-client';

let localStream, room;

function App() {
  const [socket, setSocket] = useState();
  const [streams, setStreams] = useState([]);
  const [receivedName, setReceivedName] = useState('');

  
  useEffect(() => {
    // const socket = io.connect("http://192.168.0.100:3000")
    let socket = io.connect("http://localhost:3001")
    socket.on('message', msg => {
      handleSocketMsg(msg, localStream, socket, addStreams, room)
    });
    setSocket(socket);
    window.addEventListener('receivedName', (event) => {
      console.log('newsets fired', event)
      setReceivedName(event.detail)
    })
  }, []);


  function addStreams(stream){
    if(streams.length === 0){
      localStream = stream;
    }
    setStreams(prev => [...prev, stream])
  }

  function setRoom(roomName){
    room = roomName;
  }

  return (
    <div className="App">
      <main>
        <h1>Headbandz with a z because it's cooler</h1>
        {receivedName && <h2>{receivedName}</h2>}
        <div className="videos-container">
          <Video id="local" stream={streams[0]}/>
        </div>
        <Controls addStreams={addStreams} socket={socket} streams={streams} setRoom={setRoom}/>
        {streams.slice(1).map((stream,i) => <Video stream={stream} key={i} id={`stream${i}`}/>)}

      </main>
    </div>
  );
}

export default App;
