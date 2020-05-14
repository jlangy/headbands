import React from 'react';
import { endGame, restart } from '../actions/gameActions';
import { clearStreamNames } from '../actions/streamActions';
import { connect } from 'react-redux';

function HostMenu({endGame, restart, socket, game, clearStreamNames}) {
  function stopGame(){
    const roomName = game.name;
    endGame();
    socket.emit('end game', {roomName})
  }

  function restartGame(){
    const roomName = game.name;
    restart();
    clearStreamNames();
    socket.emit('restart game', {roomName})
  }

  return (
    <div className="container">
      <button className="button-medium" onClick={stopGame}>Kill Game</button>
      <button className="button-medium" onClick={restartGame}>New Game</button>
    </div>
  )
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(mapStateToProps, { endGame, restart, clearStreamNames })(HostMenu);
