import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import gamePhases from '../reducers/gamePhases';
import SStatus from '../styled_components/SStatus';
import formatTime from '../helpers/formatTime';

const Info = ({ game, nameChosen, nameToGuess }) => {
	let [time, setTime] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setTime(time + 1);
		}, 1000);
	}, [time]);

	return (
		<>
			{game.gamePhase !== gamePhases.playing ? (
				!nameChosen ? (
					<SStatus>
						{game.playersJoined === game.totalPlayers
							? 'All players joined. Choose a name for another player.'
							: `${game.playersJoined} / ${game.totalPlayers} players have joined. Waiting for remaining players...`}
					</SStatus>
				) : (
					<SStatus>{`You chose "${nameToGuess}". Waiting for ${
						game.totalPlayers - game.totalNamesSet
					} players to choose a name.`}</SStatus>
				)
			) : (
				<SStatus>{formatTime(time)}</SStatus>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps)(Info);
