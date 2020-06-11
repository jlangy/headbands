import React from 'react';
import { connect } from 'react-redux';
import { END_GAME, RESTART_GAME, CLEAR_STREAM_NAMES } from '../reducers/types';
import gamePhases from '../reducers/gamePhases';
import SButton from '../styled_components/SButton';
import SHostButtons from '../styled_components/SHostButtons';
import SCard from '../styled_components/SCard';
import styled from 'styled-components';
import SNameInputGroup from '../styled_components/SNameInputGroup';
import SInput from '../styled_components/SInput';

const SMenuCard = styled(SCard)`
	padding: 1rem 0;
	width: 90%;
	margin: 0 auto;
	max-width: 90%;
	justify-content: space-evenly;
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
					<SButton onClick={endGame} label={'End Game'}></SButton>
					<SButton onClick={restartGame} label={'Restart Game'}></SButton>
				</SHostButtons>
			)}
			{game.gamePhase === gamePhases.settingNames && (
				<SNameInputGroup>
					<SInput onChange={(e) => setNameToGuess(e.target.value)}></SInput>
					<SButton
						onClick={setName}
						disabled={nameChosen}
						label={nameChosen ? 'Waiting' : 'Confirm'}
					></SButton>
				</SNameInputGroup>
			)}
		</SMenuCard>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps)(Menu);
