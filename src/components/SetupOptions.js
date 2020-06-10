import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Heading from '../styled_components/Heading';
import turnOnLocalMedia from '../helpers/turnOnLocalMedia';
import { createStream } from '../actions/streamActions';

const SetupOptions = ({ socket, createStream, streams }) => {
	const [makeRoomName, setMakeRoomName] = useState('');
	const [numPlayers, setNumPlayers] = useState(2);

	const makeRoom = async () => {
		socket.emit('make room', { name: makeRoomName, totalPlayers: numPlayers });
		turnOnLocalMedia(createStream, streams);
	};

	return (
		<>
			<Heading>Create Game</Heading>

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
		</>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps, { createStream })(SetupOptions);
