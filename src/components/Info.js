import React from 'react';
import { connect } from 'react-redux';
import gamePhases from '../reducers/gamePhases';
import SStatus from '../styled_components/controls/SStatus';
import Timer from './Timer';

const Info = ({ game, nameChosen }) => {
	return (
		<>
			{game.category && <SStatus>Category: {game.category}</SStatus>}
			{game.gamePhase !== gamePhases.playing ? (
				!nameChosen ? (
					<SStatus>
						{game.playersJoined === game.totalPlayers
							? 'All players joined. Choose a name for another player.'
							: `${game.playersJoined} / ${game.totalPlayers} players have joined. Waiting for remaining players...`}
					</SStatus>
				) : (
					<SStatus>{`You chose "${game.nameToPass}". Waiting for ${
						game.totalPlayers - game.totalNamesSet
					} player(s) to choose a name.`}</SStatus>
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
