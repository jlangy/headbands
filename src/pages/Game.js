import React, { useState } from 'react';
import { connect } from 'react-redux';
import SPage from '../styled_components/SPage';
import Video from '../components/Video';
import SVideos from '../styled_components/SVideos';
import SVideo from '../styled_components/SVideo';
import SVideoLabel from '../styled_components/SVideoLabel';
import Info from '../components/Info';
import Menu from '../components/Menu';
import styled from 'styled-components';

const SGamePage = styled(SPage)`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
`;

const Game = ({ streams, game, socket }) => {
	const [nameChosen, setNameChosen] = useState(false);
	const [nameToGuess, setNameToGuess] = useState();

	const setName = () => {
		setNameChosen(true);
		socket.emit('setName', { nameToGuess, roomName: game.name });
	};

	const emptyVideos = () => {
		// Initializes to 1 to prevent jumpy render after loading local stream
		const activeStreams = Object.keys(streams).length || 1;
		const numEmpty = game.totalPlayers - activeStreams;
		return numEmpty >= 0 ? new Array(numEmpty).fill(0) : [];
	};

	const incomingStreams = () =>
		Object.keys(streams).filter((streamName) => streamName !== socket.id);

	//Turn off audio of local stream
	const localStream = () => {
		const local = streams[socket.id] && streams[socket.id].stream;
		if (local) {
			const removeAudioLocalStream = local.clone();
			const audioTrack = removeAudioLocalStream.getAudioTracks();
			if (audioTrack.length > 0) {
				removeAudioLocalStream.removeTrack(audioTrack[0]);
			}
			return removeAudioLocalStream;
		}
	};

	return (
		<SGamePage>
			<Info socket={socket} nameChosen={nameChosen} nameToGuess={nameToGuess} />
			<SVideos>
				<SVideo>
					<Video id="local" stream={localStream()} />
					<SVideoLabel>
						<i className="fas fa-crown"></i>
						<p>?</p>
						<p></p>
					</SVideoLabel>
				</SVideo>
				{incomingStreams().map((streamName, i) => (
					<SVideo key={i}>
						<Video
							stream={streams[streamName] && streams[streamName].stream}
							id={`stream${i}`}
						/>
						<SVideoLabel>
							{streams[streamName] && streams[streamName].nameToGuess}
						</SVideoLabel>
					</SVideo>
				))}
				{emptyVideos().map((a, i) => (
					<SVideo key={i}>
						<Video id={`stream${i}`} />
						<SVideoLabel>
							<p>Waiting for player...</p>
						</SVideoLabel>
					</SVideo>
				))}
			</SVideos>
			<Menu
				socket={socket}
				nameChosen={nameChosen}
				nameToGuess={nameToGuess}
				setNameToGuess={setNameToGuess}
				setName={setName}
			/>
			{/* <button onClick={() => socket.emit('next turn', {roomName: game.name})}>NEXT TURN</button> */}
		</SGamePage>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams,
	game: state.game
});

export default connect(mapStateToProps)(Game);
