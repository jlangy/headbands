import React from 'react';
import { endGame, restart } from '../actions/gameActions';
import { clearStreamNames } from '../actions/streamActions';
import { connect } from 'react-redux';

const HostMenu = ({ endGame, restart, socket, game, clearStreamNames }) => {
	const stopGame = () => {
		const roomName = game.name;
		endGame();
		socket.emit('end game', { roomName });
	};

	const restartGame = () => {
		const roomName = game.name;
		restart();
		clearStreamNames();
		socket.emit('restart game', { roomName });
	};

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
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps, { endGame, restart, clearStreamNames })(
	HostMenu
);
