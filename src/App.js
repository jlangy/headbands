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
  // const [streams, setStreams] = useState([]);
  const [receivedName, setReceivedName] = useState('');

  
  useEffect(() => {
    const socket = io.connect("http://192.168.0.100:3001")
    // let socket = io.connect("http://localhost:3001")
    socket.on('message', msg => {
      handleSocketMsg(msg, localStream, socket, addStreams, room, addStreamNames)
    });
    setSocket(socket);
    window.addEventListener('receivedName', (event) => {
      console.log('newsets fired', event)
      setReceivedName(event.detail)
    })
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
    if(streams.length === 0){
      localStream = stream;
    }
    setStreams(prev => [...prev, {stream, socketId}])
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
          <Video id="local" stream={streams[0] && streams[0].stream}/>
        </div>
        <Controls addStreams={addStreams} socket={socket} streams={streams} setRoom={setRoom}/>
        {streams.slice(1).map((stream,i) => 
          <div>
            <Video stream={stream.stream} key={i} id={`stream${i}`}/>
        <h3>{stream.name && stream.name}</h3>
          </div> 
        )}
        <button onClick={logStreams}>log streams</button>

      </main>
    </div>
  );
}

export default App;
