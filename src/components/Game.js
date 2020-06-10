import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import './game.scss';
import GameSetup from './GameSetup';
import gamePhases from '../reducers/gamePhases';
import HostMenu from './HostMenu';

function Game({ streams, game, socket }) {
	function emptyVideos() {
		//Initializes to 1 to prevent jumpy render after loading local stream
		const activeStreams = Object.keys(streams).length || 1;
		const numEmpty = game.totalPlayers - activeStreams;
		return numEmpty >= 0 ? new Array(numEmpty).fill(0) : [];
	}

	function incomingStreams() {
		console.log(streams, Object.keys(streams).filter((streamName) => streamName !== socket.id))
		return Object.keys(streams).filter((streamName) => streamName !== socket.id);
	}

	//Turn of audio of local stream
	function localStream(){
		const localStream = streams[socket.id] && streams[socket.id].stream;
		if(localStream){
			const removeAudioLocalStream = localStream.clone();
			const audioTrack = removeAudioLocalStream.getAudioTracks();
			if(audioTrack.length > 0){
				removeAudioLocalStream.removeTrack(audioTrack[0]);
			}
			return removeAudioLocalStream;
		}
	}

	return (
		<>
			{game.host && <HostMenu socket={socket}/>}
			{game.gamePhase !== gamePhases.playing && <GameSetup socket={socket} />}
			<div className="videos-container">
				<h2>In room: {game.name}</h2>
				<Video
					id="local"
					stream={localStream()}
				/>
				{incomingStreams().map((streamName, i) => (
					<div>
						<Video
							stream={streams[streamName] && streams[streamName].stream}
							key={i}
							id={`stream${i}`}
						/>
						<h3>{streams[streamName] && streams[streamName].nameToGuess}</h3>
					</div>
				))}
				{emptyVideos().map((a, i) => (
					<div className="video-container" key={i}>
						Waiting for player
					</div>
				))}
			</div>
			<button onClick={() => socket.emit('next turn', {roomName: game.name})}>NEXT TURN</button>
		</>
	);
}

const mapStateToProps = (state) => ({
	streams: state.streams,
	game: state.game
});

export default connect(mapStateToProps, null)(Game);
