import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import './game.scss';
import GameSetup from './GameSetup';
import gamePhases from '../reducers/gamePhases';

function Game({ streams, game, socket }) {
	function emptyVideos() {
		//Initializes to 1 to prevent jumpy render after loading local stream
		const activeStreams = Object.keys(streams).length || 1;
		const numEmpty = game.totalPlayers - activeStreams;
		return new Array(numEmpty).fill(0);
	}

	function incomingStreams() {
		return Object.keys(streams).filter((streamName) => streamName !== 'local');
	}

	function localStream(){
		const localStream = streams['local'] && streams['local'].stream;
		if(localStream){
			const removeAudioLocalStream = localStream.clone();
			const audioTrack = removeAudioLocalStream.getAudioTracks();
			if(audioTrack.length > 0){
				removeAudioLocalStream.removeTrack(audioTrack[0]);
			}
		}
		return removeAudioLocalStream;
	}

	return (
		<>
			{(game.gamePhase === gamePhases.joining ||
				game.gamePhase === gamePhases.settingNames) && (
				<GameSetup socket={socket} />
			)}
			<div className="videos-container">
				<h2>In room: {game.name}</h2>
				<Video
					id="local"
					// stream={streams['local'] && streams['local'].stream}
					stream={localStream()}
				/>
				{incomingStreams().map((streamName, i) => (
					<div>
						<Video
							stream={streams[streamName].stream}
							key={i}
							id={`stream${i}`}
						/>
						<h3>{streams[streamName].name}</h3>
					</div>
				))}
				{emptyVideos().map((a, i) => (
					<div className="video-container" key={i}>
						Waiting for player
					</div>
				))}
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	streams: state.streams,
	game: state.game
});

export default connect(mapStateToProps, null)(Game);
