import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	RESTART_GAME,
	CLEAR_STREAM_NAMES
} from '../reducers/types';
import gamePhases from '../reducers/gamePhases';
import SHostButtons from '../styled_components/controls/SHostButtons';
import SNameInputGroup from '../styled_components/controls/SNameInputGroup';
import SNameInput from '../styled_components/controls/SNameInput';
import SMenuButton from '../styled_components/controls/SMenuButton';
import SMenuCard from '../styled_components/layout/SMenuCard';
import SHostButton from '../styled_components/controls/SHostButton';
import Info from './Info';
import addAlert from '../helpers/addAlert';
import endGame from '../helpers/endGame';

const Menu = ({ socket, game, dispatch, streams }) => {
	const [nameChosen, setNameChosen] = useState(false);
	const [nameToGuess, setNameToGuess] = useState('');

	useEffect(() => {
		setNameChosen(false);
		setNameToGuess('');
	}, [game.gameEnd]);

	const setName = () => {
		if (nameToGuess.trim().length > 1) {
			setNameChosen(true);
			socket.emit('setName', { nameToGuess, roomName: game.name });
		} else {
			addAlert('Invalid name');
		}
	};

	const handleEndGame = () => {
		const roomName = game.name;
		endGame(streams[socket.id].stream, dispatch)
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
					<SHostButton onClick={handleEndGame}>End Game</SHostButton>
					<SHostButton onClick={restartGame}>Restart Game</SHostButton>
				</SHostButtons>
			)}
			{game.gamePhase === gamePhases.settingNames && (
				<SNameInputGroup>
					<SNameInput
						placeholder="Enter a name..."
						onChange={(e) => setNameToGuess(e.target.value)}
						minlength="2"
						maxlength="24"
						disabled={nameChosen}
					></SNameInput>
					<SMenuButton onClick={setName} disabled={nameChosen}>
						{nameChosen ? 'Waiting' : 'Confirm'}
					</SMenuButton>
				</SNameInputGroup>
			)}
		</SMenuCard>
	);
};

const mapStateToProps = (state) => ({
	game: state.game,
	streams: state.streams
});

export default connect(mapStateToProps)(Menu);
