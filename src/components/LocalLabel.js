import React from 'react';
import SVideoLabel from '../styled_components/video/SVideoLabel';
import SIcon from '../styled_components/video/SIcon';
import { connect } from 'react-redux';

function LocalLabel({ turn, socket, gameName, revealed, streams, host, gameOver }) {
	return (
		<SVideoLabel>
			{(host === socket.id && (
				<SIcon src="host.png" alt="this player is the host"></SIcon>
			)) || <p></p>}
			<p>
				{revealed.includes(socket.id) ? streams[socket.id].nameToGuess : '?'}
			</p>
			<button
				onClick={() => socket.emit('next turn', { roomName: gameName })}
				disabled={turn !== socket.id || gameOver}
			>
				REVEAL
			</button>
		</SVideoLabel>
	);
}

const mapStateToProps = (state) => ({
	turn: state.game.turn,
	gameName: state.game.name,
	revealed: state.game.revealed,
	streams: state.streams,
	host: state.game.host,
	gameOver: state.game.gameEnd
});

export default connect(mapStateToProps)(LocalLabel);
