import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Game from './components/Game'
import handleSocketMsg from "./helpers/handleSocketMsg";
import io from 'socket.io-client';
import Landing from './components/Landing'
import { connect } from 'react-redux';
import { createStream } from './actions/streamActions';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


let localStream;

function App({streams, game, createStream}) {
  const [socket, setSocket] = useState();
  
  useEffect(() => {
    //connection for local
    let socket = io.connect("http://localhost:5000")
    
    //connection for production
    // const socket = io.connect(window.location.hostname)

    socket.on('message', msg => {
      handleSocketMsg(msg, localStream, socket, addStreams)
    });
    setSocket(socket);
  }, []); 

  function addStreams(stream, socketId){
    createStream({stream, socketId})
  }

  return (
    <Router>
      <div className="App">
        <main>
          <h1>Headbandz</h1>
          <Switch>
            <Route path="/game">
              <Game socket={socket}/>
            </Route>
            <Route path="/">
              <Landing addStreams={addStreams} socket={socket}/>
            </Route>

          </Switch>
          
        </main>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  streams: state.streams,
  game: state.game
});

export default connect(mapStateToProps, {createStream})(App);
