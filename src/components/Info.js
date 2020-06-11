import React from 'react';
import { connect } from 'react-redux';
import gamePhases from '../reducers/gamePhases';
import SStatus from '../styled_components/SStatus';
import Moment from 'react-moment';

const Info = ({ game, nameChosen }) => {
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
					<SStatus>{`You chose "${nameChosen}". Waiting for ${
						game.totalPlayers - game.totalNamesSet
					} players to choose a name.`}</SStatus>
				)
			) : (
				<SStatus>
					<Moment date={Date.now()} durationFromNow></Moment>
				</SStatus>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

// game.gamePhase !== gamePhases.playing &&
// <SHeading>In room: {game.name}</SHeading>

export default connect(mapStateToProps)(Info);
