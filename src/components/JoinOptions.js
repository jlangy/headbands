import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Heading from '../styled_components/Heading';
import turnOnLocalMedia from '../helpers/turnOnLocalMedia';
import { createStream } from '../actions/streamActions';

const JoinOptions = ({ socket, streams }) => {
	const [joinRoomName, setJoinRoomName] = useState('');

	const joinRoom = async () => {
		await turnOnLocalMedia(createStream, streams);
		socket.emit('join room', { roomName: joinRoomName, fromId: socket.id });
	};

	return (
		<>
			<Heading>Join Game</Heading>

			<div>
				<input
					type="text"
					onChange={(e) => {
						setJoinRoomName(e.target.value);
					}}
				/>
				<Link to="/game">
					<button onClick={joinRoom}>Go!</button>
				</Link>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps, { createStream })(JoinOptions);
