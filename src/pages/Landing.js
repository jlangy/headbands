import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStream } from '../actions/streamActions';
import Page from '../styled_components/Page';
import Card from '../styled_components/Card';

const turnOnLocalMedia = async (createStream, streams) => {
	//Setup media
	if (!streams['local']) {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true
		});

		createStream({ stream, socketId: 'local' });
	}
};

const Landing = ({ socket, createStream, streams }) => {
	//Input state
	const [joinRoomName, setJoinRoomName] = useState('');
	const [makeRoomName, setMakeRoomName] = useState('');
	const [numPlayers, setNumPlayers] = useState(2);

	const makeRoom = async () => {
		socket.emit('make room', { name: makeRoomName, totalPlayers: numPlayers });
		turnOnLocalMedia(createStream, streams);
	};

	const joinRoom = async () => {
		//Tell server, wait
		await turnOnLocalMedia(createStream, streams);
		socket.emit('join room', { roomName: joinRoomName, fromId: socket.id });
	};

	return (
		<Page>
			<Card></Card>
			<Card></Card>
		</Page>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps, { createStream })(Landing);
