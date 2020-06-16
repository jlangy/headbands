import React from 'react';
import SVideoLabel from '../styled_components/video/SVideoLabel';
import { connect } from 'react-redux';

function LocalLabel({ turn, socket, gameName, revealed, streams }) {
	return (
		<SVideoLabel>
			<i className="fas fa-crown"></i>
			<p>
				{revealed.includes(socket.id) ? streams[socket.id].nameToGuess : '?'}
			</p>
			<button
				onClick={() => socket.emit('next turn', { roomName: gameName })}
				disabled={turn !== socket.id}
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
	streams: state.streams
});

export default connect(mapStateToProps)(LocalLabel);
