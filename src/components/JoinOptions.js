import React from 'react';
import Heading from '../styled_components/Heading';

const JoinOptions = () => {
	return (
		<>
			<Heading>Join Game</Heading>
			<div
				className="input-slider"
				style={{ height: joiningGame ? '100px' : '0px' }}
			>
				<div className="game-name">
					<input
						type="text"
						onChange={(e) => {
							setJoinRoomName(e.target.value);
						}}
					/>
					<Link to="/game">
						<button className="button-medium" onClick={joinRoom}>
							Go!
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default JoinOptions;
