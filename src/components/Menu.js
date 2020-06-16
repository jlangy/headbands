import React, { useState } from 'react';
import { connect } from 'react-redux';
import { END_GAME, RESTART_GAME, CLEAR_STREAM_NAMES, CLEAR_STREAMS } from '../reducers/types';
import gamePhases from '../reducers/gamePhases';
import SHostButtons from '../styled_components/SHostButtons';
import SCard from '../styled_components/SCard';
import styled from 'styled-components';
import SNameInputGroup from '../styled_components/SNameInputGroup';
import SNameInput from '../styled_components/SNameInput';
import SNameButton from '../styled_components/SNameButton';
import Info from './Info';

const SMenuCard = styled(SCard)`
	padding: 1rem 0;
	width: 90%;
	margin: 0 auto;
	max-width: 90%;
	justify-content: space-evenly;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 100%;
	}
`;

const Menu = ({
	socket,
	game,
	dispatch,
	streams
}) => {
	const [nameChosen, setNameChosen] = useState(false);
	const [nameToGuess, setNameToGuess] = useState();

	const setName = () => {
		setNameChosen(true);
		socket.emit('setName', { nameToGuess, roomName: game.name });
	};

	const endGame = () => {
		const roomName = game.name;
		streams[socket.id].stream.getTracks().forEach(function(track){
			track.stop();
		});
		window.localClone.getTracks().forEach(track => {
			track.stop();
		})
		dispatch({ type: END_GAME, payload: {disconnection: false} });
		setTimeout(() => {
			dispatch({type: CLEAR_STREAMS})
		}, 5000);
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
	game: state.game,
	streams: state.streams
});

export default connect(mapStateToProps)(Menu);
