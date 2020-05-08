import React, { useState } from "react";
import { connect } from 'react-redux';
import Video from './Video';

function Game({streams, game, socket}) {
  const [nameToGuess, setNameToGuess] = useState();


  function setName(){
    socket.emit('setName', {nameToGuess, roomName: game.name})
  }

  //Make n length array for expression in react
  function times(n){
    return new Array(n).fill(0);
  }

  return (
    <div>
      {game.allPlayersJoined && (
        <>
          <input type="text" onChange={(e) => setNameToGuess(e.target.value)} />
          <button onClick={setName}>Set name</button>
        </>
      )}
      {game.afoot && (
        <div>
          <div className="videos-container">
            <h2>In room: {game.name}</h2>
            <Video
              id="local"
              stream={streams["local"] && streams["local"].stream}
            />
            {Object.keys(streams)
              .filter((streamName) => streamName !== "local")
              .map((streamName, i) => (
                <div>
                  <Video
                    stream={streams[streamName].stream}
                    key={i}
                    id={`stream${i}`}
                  />
                  <h3>{streamName}</h3>
                  <h3>{streams[streamName].name}</h3>
                </div>
              ))}
            {game.totalPlayers &&
              times(game.totalPlayers - Object.keys(streams).length).map(
                (a, i) => (
                  <div className="video-container" key={i}>
                    Waiting for player
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  streams: state.streams,
  game: state.game
});

export default connect(mapStateToProps, null)(Game);

