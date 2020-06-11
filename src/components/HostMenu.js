import React from 'react';
import { connect } from 'react-redux';
import { END_GAME, RESTART_GAME, CLEAR_STREAM_NAMES } from '../reducers/types';

function HostMenu({ socket, game, dispatch }) {
	function stopGame() {
		const roomName = game.name;
		dispatch({ type: END_GAME });
		socket.emit('end game', { roomName });
	}

	function restartGame() {
		const roomName = game.name;
		dispatch({ type: RESTART_GAME });
		dispatch({ type: CLEAR_STREAM_NAMES });
		socket.emit('restart game', { roomName });
	}

	return (
		<div className="container">
			<button className="button-medium" onClick={stopGame}>
				Kill Game
			</button>
			<button className="button-medium" onClick={restartGame}>
				New Game
			</button>
		</div>
	);
}

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps)(HostMenu);
