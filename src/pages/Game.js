import React, { useState } from 'react';
import { connect } from 'react-redux';
import SPage from '../styled_components/SPage';
import Video from '../components/Video';
import SVideos from '../styled_components/SVideos';
import SVideo from '../styled_components/SVideo';
import SVideoLabel from '../styled_components/SVideoLabel';
import LocalLabel from '../components/LocalLabel';
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

const Game = ({ streams, totalPlayers, socket }) => {

	const emptyVideos = () => {
		// Initializes to 1 to prevent jumpy render after loading local stream
		const activeStreams = Object.keys(streams).length || 1;
		const numEmpty = totalPlayers - activeStreams;
		return numEmpty >= 0 ? new Array(numEmpty).fill(0) : [];
	};

	const incomingStreams = () => {
		console.log('incomiiiingggg!!!')
		return Object.keys(streams).filter((streamName) => streamName !== socket.id);
	}

	//Turn off audio of local stream
	const localStream = () => {
		console.log('I am running local stream lalalla')
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
			<SVideos>
				<SVideo>
					<Video id="local" stream={localStream()} />
					<LocalLabel socket={socket}/>
				</SVideo>
				{incomingStreams().map((streamName, i) => (
					<SVideo key={i}>
						<Video
							stream={streams[streamName] && streams[streamName].stream}
							streamName={streamName}
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
			/>
		</SGamePage>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams,
	totalPlayers: state.game.totalPlayers,
	gameName: state.game.name
});

export default connect(mapStateToProps)(Game);
