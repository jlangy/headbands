import React from 'react';
import { connect } from 'react-redux';
import SPage from '../styled_components/layout/SPage';
import Video from '../components/Video';
import SVideos from '../styled_components/video/SVideos';
import SVideoContainer from '../styled_components/video/SVideoContainer';
import SVideoLabel from '../styled_components/video/SVideoLabel';
import SIcon from '../styled_components/video/SIcon';
import LocalLabel from '../components/LocalLabel';
import Menu from '../components/Menu';

const Game = ({ streams, totalPlayers, socket, game }) => {
	const emptyVideos = () => {
		// Initializes to 1 to prevent jumpy render after loading local stream
		const activeStreams = Object.keys(streams).length || 1;
		const numEmpty = totalPlayers - activeStreams;
		return numEmpty >= 0 ? new Array(numEmpty).fill(0) : [];
	};

	const incomingStreams = () => {
		return Object.keys(streams).filter(
			(streamName) => streamName !== socket.id
		);
	};

	//Turn off audio of local stream
	const localStream = () => {
		const local = streams[socket.id] && streams[socket.id].stream;
		if (local && !window.localClone) {
			const removeAudioLocalStream = local.clone();
			window.localClone = removeAudioLocalStream;
			const audioTrack = removeAudioLocalStream.getAudioTracks();
			if (audioTrack.length > 0) {
				audioTrack[0].stop();
				removeAudioLocalStream.removeTrack(audioTrack[0]);
			}
			return removeAudioLocalStream;
		} else {
			return window.localClone;
		}
	};

	return (
		<SPage>
			<SVideos>
				<SVideoContainer turn={game.turn === socket.id}>
					<Video id="local" stream={localStream()} streamName={socket.id} />
					<LocalLabel socket={socket} />
				</SVideoContainer>
				{incomingStreams().map((streamName, i) => (
					<SVideoContainer turn={game.turn === streamName} key={i}>
						<Video
							stream={streams[streamName] && streams[streamName].stream}
							streamName={streamName}
							id={`stream${i}`}
						/>
						<SVideoLabel>
							{(game.host === streamName && (
								<SIcon src="host.png" alt="this player is the host"></SIcon>
							)) || <p></p>}
							<p>{streams[streamName] && streams[streamName].nameToGuess}</p>
							<i></i>
						</SVideoLabel>
					</SVideoContainer>
				))}
				{emptyVideos().map((a, i) => (
					<SVideoContainer key={i}>
						<Video id={`stream${i}`} />
						<SVideoLabel>
							<p>Waiting for player...</p>
						</SVideoLabel>
					</SVideoContainer>
				))}
			</SVideos>
			<Menu socket={socket} />
		</SPage>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams,
	totalPlayers: state.game.totalPlayers,
	game: state.game
});

export default connect(mapStateToProps)(Game);
