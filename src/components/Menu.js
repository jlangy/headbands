import React, { useState } from 'react';
import { connect } from 'react-redux';
import { END_GAME, RESTART_GAME, CLEAR_STREAM_NAMES } from '../reducers/types';
import gamePhases from '../reducers/gamePhases';
import SHostButtons from '../styled_components/controls/SHostButtons';
import SNameInputGroup from '../styled_components/controls/SNameInputGroup';
import SNameInput from '../styled_components/controls/SNameInput';
import SNameButton from '../styled_components/controls/SNameButton';
import SMenuCard from '../styled_components/layout/SMenuCard';
import Info from './Info';

const Menu = ({ socket, game, dispatch }) => {
	const [nameChosen, setNameChosen] = useState(false);
	const [nameToGuess, setNameToGuess] = useState();

	const setName = () => {
		setNameChosen(true);
		socket.emit('setName', { nameToGuess, roomName: game.name });
	};

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
		<SMenuCard>
			<Info socket={socket} nameToGuess={nameToGuess} nameChosen={nameChosen} />
			{game.host && (
				<SHostButtons>
					<SNameButton onClick={endGame}>End Game</SNameButton>
					<SNameButton onClick={restartGame}>Restart Game</SNameButton>
				</SHostButtons>
			)}
			{game.gamePhase === gamePhases.settingNames && (
				<SNameInputGroup>
					<SNameInput
						placeholder="Enter a name..."
						onChange={(e) => setNameToGuess(e.target.value)}
					></SNameInput>
					<SNameButton onClick={setName} disabled={nameChosen}>
						{nameChosen ? 'Waiting' : 'Confirm'}
					</SNameButton>
				</SNameInputGroup>
			)}
		</SMenuCard>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps)(Menu);
