import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import io from 'socket.io-client';

import handleSocketMsg from "./helpers/handleSocketMsg";
import './App.scss';

import Landing from './components/Landing';
import Game from './components/Game'

function App() {
  const [socket, setSocket] = useState();
  
  useEffect(() => {
    //connection for local
    let socket = io.connect("http://localhost:5000")
    
    //connection for production
    // const socket = io.connect(window.location.hostname)

    socket.on('message', msg => {
      handleSocketMsg(msg, socket)
    });
    setSocket(socket);
  }, []); 

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
              <Landing socket={socket}/>
            </Route>

          </Switch>
          
        </main>
      </div>
    </Router>
  );
}

export default App;
