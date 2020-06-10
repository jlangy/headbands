import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import io from 'socket.io-client';
import { connect } from 'react-redux';

import handleSocketMsg from "./helpers/handleSocketMsg";
import './App.scss';

import Landing from './components/Landing';
import Game from './components/Game'
import { JobInstance } from 'twilio/lib/rest/bulkexports/v1/export/job';

function App({game, dispatch, history}) {
  const [socket, setSocket] = useState();
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    //connection for local
    let socket = io.connect("http://localhost:3000")
    
    //connection for production
    // const socket = io.connect(window.location.hostname)

    socket.on('message', msg => {
      handleSocketMsg(msg, socket, setRedirect)
    });
    setSocket(socket);
  }, []); 

  return (
    <Router>
      <div className="App">
        {redirect && <Redirect to='/' />}
        <main>
          <h1>Headbandz</h1>
          <button onClick={() => socket.emit('xir test')}>log rooms</button>
          <Switch>
            
            <Route path="/game">
              {game.gamePhase && <Game socket={socket}/>}
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

const mapStateToProps = state => ({
  game: state.game
})

export default connect(mapStateToProps)(App);

