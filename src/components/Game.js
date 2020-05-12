import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import './game.scss';
import GameSetup from './GameSetup'

function Game({ streams, game, socket }) {

	//Make n length array for expression in react
	function times(n) {
		return new Array(n).fill(0);
	}

	return (
		<>
      {!game.setupComplete && game.afoot && <GameSetup socket={socket}/>}
			{game.afoot && (
				<div className="videos-container">
					<h2>In room: {game.name}</h2>
					<Video
						id="local"
						stream={streams['local'] && streams['local'].stream}
					/>
					{Object.keys(streams)
						.filter((streamName) => streamName !== 'local')
						.map((streamName, i) => (
							<div>
								<Video
									stream={streams[streamName].stream}
									key={i}
									id={`stream${i}`}
								/>
								<h3>{streamName}</h3>
								<h3>{streams[streamName].name}</h3>
							</div>
						))}
					{times(game.totalPlayers - (Object.keys(streams).length || 1)).map(
							(a, i) => (
								<div className="video-container" key={i}>
									Waiting for player
								</div>
							)
						)}
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => ({
	streams: state.streams,
	game: state.game
});

export default connect(mapStateToProps, null)(Game);
