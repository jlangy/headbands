import React, { useState } from 'react';
import { connect } from 'react-redux';
import SHeading from '../styled_components/SHeading';
import turnOnLocalMedia from '../helpers/turnOnLocalMedia';
import SForm from '../styled_components/SForm';
import SBreak from '../styled_components/SBreak';
import SInputGroup from '../styled_components/SInputGroup';
import SInput from '../styled_components/SInput';
import SButton from '../styled_components/SButton';

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
					<SInput
						type="text"
						onChange={(e) => {
							setJoinRoomName(e.target.value);
						}}
					/>
					<SButton label={'Go?'} to="/game" onClick={joinRoom}></SButton>
				</SInputGroup>
			</SForm>
		</>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps)(JoinOptions);
