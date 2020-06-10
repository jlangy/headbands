import React, { useState } from 'react';
import './landing.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NEW_STREAM } from '../reducers/types';

async function turnOnLocalMedia(streams, dispatch, socket) {
  //Setup media
  if(!streams[socket.id]){
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    dispatch({type: NEW_STREAM, payload: {stream, socketId: socket.id}});
  }
}

function Landing({ socket, streams, dispatch, game }) {
  //UI state for toggling making/joining game dropdowns
  const [makingGame, setMakingGame] = useState(false);
  const [joiningGame, setJoiningGame] = useState(false);

  //Input state 
  const [joinRoomName, setJoinRoomName] = useState("");
  const [makeRoomName, setMakeRoomName] = useState("");
  const [numPlayers, setNumPlayers] = useState(2);

  function toggleMakeGame() {
    setMakingGame(prev => !prev);
  }
  
  function toggleJoinGame() {
    setJoiningGame(prev => !prev);  
  }

  async function makeRoom() {
    socket.emit("make room", { name: makeRoomName, totalPlayers: numPlayers });
    turnOnLocalMedia(streams, dispatch, socket)
  }

	async function joinRoom() {
		//Tell server, wait
		await turnOnLocalMedia(streams, dispatch, socket);
		socket.emit('join room', { roomName: joinRoomName, fromId: socket.id });
	}

  return (
    <>
    <div className="container">
      {game.disconnected && <h1>HOST DISCONNECTED</h1>}
      <div>
        <button className="button-large" onClick={toggleMakeGame}>
          Create Game
        </button>
        <div
          className="input-slider"
          style={{ height: makingGame ? "100px" : "0px" }}
        >
          <div className="player-number">
            <label htmlFor="players-number">Total Players: </label>
            <select id="players-number" onChange={e => setNumPlayers(Number(e.target.value))}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </div>

          <div className="game-name">
            <input
              type="text"
              onChange={(e) => {
                setMakeRoomName(e.target.value);
                window.roomName = e.target.value;
              }}
              placeholder="Enter game name"
            />
            <Link to='/game'><button className='button-medium' onClick={makeRoom}>Go!</button></Link>
          </div>
        </div>
      </div>
      <div>
        <button className="button-large" onClick={toggleJoinGame}>
          Join Game
        </button>
        <div
          className="input-slider"
          style={{ height: joiningGame ? "100px" : "0px" }}
        >
          <div className="game-name">
            <input
              type="text"
              onChange={(e) => {
                setJoinRoomName(e.target.value);
              }}
            />
            <Link to='/game'><button className='button-medium' onClick={joinRoom}>Go!</button></Link>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

const mapStateToProps = state => ({
  streams: state.streams,
  game: state.game
});

export default connect(mapStateToProps)(Landing);
