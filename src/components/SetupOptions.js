import React from 'react';
import Heading from '../styled_components/Heading';

const SetupOptions = () => {
	return (
		<>
			<Heading>Create Game</Heading>
			<div
				className="input-slider"
				style={{ height: makingGame ? '100px' : '0px' }}
			>
				<div className="player-number">
					<label htmlFor="players-number">Total Players: </label>
					<select
						id="players-number"
						onChange={(e) => setNumPlayers(Number(e.target.value))}
					>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
					</select>
				</div>

				<div className="game-name">
					<input
						type="text"
						onChange={(e) => {
							setMakeRoomName(e.target.value);
							window.roomName = e.target.value;
						}}
						placeholder="Enter game name"
					/>
					<Link to="/game">
						<button className="button-medium" onClick={makeRoom}>
							Go!
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default SetupOptions;
