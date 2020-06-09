import React, { useState } from 'react';
import { connect } from 'react-redux';
import gamePhases from '../reducers/gamePhases';

const GameSetup = ({ game, socket }) => {
	const [nameChosen, setNameChosen] = useState(false);
	const [nameToGuess, setNameToGuess] = useState();

	const setName = () => {
		setNameChosen(true);
		socket.emit('setName', { nameToGuess, roomName: game.name });
	};

	return (
		<>
			{game.gamePhase === gamePhases.settingNames && (
				<div className="set-name">
					<input
						className="pass-name-input"
						type="text"
						onChange={(e) => setNameToGuess(e.target.value)}
					/>
					<button
						className="pass-name-button"
						onClick={setName}
						disabled={nameChosen}
					>
						{nameChosen ? 'Waiting' : 'Set Name'}
					</button>
				</div>
			)}
			<div>
				{!nameChosen && (
					<p className="game-status">
						{game.playersJoined === game.totalPlayers
							? 'All players joined. Pick a famous name to pass.'
							: `${game.playersJoined} / ${game.totalPlayers} players have joined. Waiting on all players to join.`}
					</p>
				)}
				{nameChosen && (
					<p className="game-status">{`You passed ${nameToGuess}. Waiting for ${
						game.totalPlayers - game.totalNamesSet
					} players to choose a name.`}</p>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps, null)(GameSetup);
