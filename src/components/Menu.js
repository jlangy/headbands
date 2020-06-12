import React from 'react';
import { connect } from 'react-redux';
import { END_GAME, RESTART_GAME, CLEAR_STREAM_NAMES } from '../reducers/types';
import gamePhases from '../reducers/gamePhases';
import SHostButtons from '../styled_components/SHostButtons';
import SCard from '../styled_components/SCard';
import styled from 'styled-components';
import SNameInputGroup from '../styled_components/SNameInputGroup';
import SNameInput from '../styled_components/SNameInput';
import SNameButton from '../styled_components/SNameButton';

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
	setNameToGuess,
	nameChosen,
	setName
}) => {
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
