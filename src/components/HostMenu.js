import React from 'react';
import { connect } from 'react-redux';
import { END_GAME, RESTART_GAME, CLEAR_STREAM_NAMES } from '../reducers/types';
import SButton from '../styled_components/SButton';
import SHostButtons from '../styled_components/SHostButtons';

const HostMenu = ({ socket, game, dispatch }) => {
	const endGame = () => {
		const roomName = game.name;
		dispatch({ type: END_GAME });
		socket.emit('end game', { roomName });
	};

	const restartGame = () => {
		const roomName = game.name;
		dispatch({ type: RESTART_GAME });
		dispatch({ type: CLEAR_STREAM_NAMES });
		socket.emit('restart game', { roomName });
	};

	return (
		<SHostButtons>
			<SButton onClick={endGame} label={'End Game'}></SButton>
			<SButton onClick={restartGame} label={'Restart Game'}></SButton>
		</SHostButtons>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps)(HostMenu);
