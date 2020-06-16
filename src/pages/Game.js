import React from 'react';
import { connect } from 'react-redux';
import SPage from '../styled_components/layout/SPage';
import Video from '../components/Video';
import SVideos from '../styled_components/video/SVideos';
import SVideo from '../styled_components/video/SVideo';
import SVideoLabel from '../styled_components/video/SVideoLabel';
import Menu from '../components/Menu';

const Game = ({ streams, totalPlayers, socket }) => {
	// const [nameChosen, setNameChosen] = useState(false);
	// const [nameToGuess, setNameToGuess] = useState();

	// const setName = () => {
	// 	setNameChosen(true);
	// 	socket.emit('setName', { nameToGuess, roomName: game.name });
	// };

	const emptyVideos = () => {
		// Initializes to 1 to prevent jumpy render after loading local stream
		const activeStreams = Object.keys(streams).length || 1;
		const numEmpty = totalPlayers - activeStreams;
		return numEmpty >= 0 ? new Array(numEmpty).fill(0) : [];
	};

	const incomingStreams = () => {
		console.log('incomiiiingggg!!!');
		return Object.keys(streams).filter(
			(streamName) => streamName !== socket.id
		);
	};

	//Turn off audio of local stream
	const localStream = () => {
		console.log('I am running local stream lalalla');
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
		<SPage>
			<SVideos>
				<SVideo>
					<Video id="local" stream={localStream()} />
					<SVideoLabel>
						<i className="fas fa-crown"></i>
						<p>?</p>
						<i></i>
					</SVideoLabel>
				</SVideo>
				{incomingStreams().map((streamName, i) => (
					<SVideo key={i}>
						<Video
							stream={streams[streamName] && streams[streamName].stream}
							id={`stream${i}`}
						/>
						<SVideoLabel>
							<p></p>
							<p>{streams[streamName] && streams[streamName].nameToGuess}</p>
							<i></i>
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
			<Menu socket={socket} />
			{/* <button onClick={() => socket.emit('next turn', {roomName: game.name})}>NEXT TURN</button> */}
		</SPage>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams,
	totalPlayers: state.game.totalPlayers
});

export default connect(mapStateToProps)(Game);
