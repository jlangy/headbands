import React, { useState } from "react";
import "./landing.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

async function turnOnLocalMedia(addStreams) {
  //Setup media
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  //Connect stream to html and notify server
  addStreams(stream, "local");
}

function Landing({ addStreams, socket }) {
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
    turnOnLocalMedia(addStreams)
  }

  async function joinRoom() {
    //Tell server, wait
    await turnOnLocalMedia(addStreams);
    socket.emit("join room", { roomName: joinRoomName, fromId: socket.id });
  }

  return (
    <>
    <div className="container">
      <div>
        <button className="landing-button" onClick={toggleMakeGame}>
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
            <Link to='/game'><button class='start-game-button' onClick={makeRoom}>Go!</button></Link>
          </div>
        </div>
      </div>
      <div>
        <button className="landing-button" onClick={toggleJoinGame}>
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
            <Link to='/game'><button class='start-game-button' onClick={joinRoom}>Go!</button></Link>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

const mapStateToProps = state => ({
  streams: state.streams
});

export default connect(mapStateToProps, {})(Landing);
