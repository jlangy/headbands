import React from 'react';
import { connect } from 'react-redux';
import gamePhases from '../reducers/gamePhases';
import SStatus from '../styled_components/controls/SStatus';
import Timer from './Timer';

const Info = ({ game, nameChosen, nameToGuess }) => {
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
				<Timer />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps)(Info);
