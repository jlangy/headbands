import React, { useState, useEffect } from "react";
import "./landing.css";
import { connect } from 'react-redux';

async function turnOnLocalMedia(addStreams) {
  //Setup media
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  //Connect stream to html and notify server
  addStreams(stream, "local");
}

function Landing({ game, addStreams, socket }) {
  const [makingGame, setMakingGame] = useState(false);
  const [joiningGame, setJoiningGame] = useState(false);
  const [joinRoomName, setJoinRoomName] = useState("");
  const [makeRoomName, setMakeRoomName] = useState("");
  const [numPlayers, setNumPlayers] = useState(2);

  function toggleMakeGame() {
    setMakingGame((prev) => !prev);
  }

  async function makeRoom() {
    //Verify number of players set
    // if (!numPlayers) {
    //   return console.log("Need to add players");
    // }
    socket.emit("make room", { name: makeRoomName, totalPlayers: numPlayers });
    turnOnLocalMedia(addStreams)
  }

  async function joinRoom() {
    //Tell server, wait
    await turnOnLocalMedia(addStreams);
    socket.emit("join room", { roomName: joinRoomName, fromId: socket.id });
  }

  function toggleJoinGame() {
    setJoiningGame((prev) => !prev);
  }

  return (
    <>
    {!game.afoot &&
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
            <button onClick={makeRoom}>Go!</button>
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
            <button onClick={joinRoom}>Go!</button>
          </div>
        </div>
      </div>
    </div>}
  </>
  );
}

const mapStateToProps = state => ({
  streams: state.streams,
  game: state.game
});

export default connect(mapStateToProps, {})(Landing);
