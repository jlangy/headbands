import React, { useState } from 'react';
import { connect } from 'react-redux';
import SHeading from '../styled_components/layout/SHeading';
import turnOnLocalMedia from '../helpers/turnOnLocalMedia';
import SForm from '../styled_components/forms/SForm';
import SBreak from '../styled_components/layout/SBreak';
import SInputGroup from '../styled_components/forms/SInputGroup';
import SInput from '../styled_components/forms/SInput';
import Button from '../components/Button';
import SLabel from '../styled_components/forms/SLabel';

const JoinOptions = ({ socket, streams }) => {
	const [joinRoomName, setJoinRoomName] = useState('');

	const joinRoom = async () => {
		await turnOnLocalMedia(streams, socket);
		socket.emit('join room', { roomName: joinRoomName, fromId: socket.id });
	};

	return (
		<>
			<SHeading>Join Game</SHeading>
			<SBreak></SBreak>
			<SForm>
				<SInputGroup>
					<SLabel>Name of lobby:</SLabel>
					<SInput
						type="text"
						onChange={(e) => {
							setJoinRoomName(e.target.value);
						}}
						placeholder="Enter a lobby name"
					/>
				</SInputGroup>
				<Button label={'Join Game'} to="/game" onClick={joinRoom}></Button>
			</SForm>
		</>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps)(JoinOptions);
