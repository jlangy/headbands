import React from 'react';
import SVideoLabel from '../styled_components/SVideoLabel';
import { connect } from 'react-redux';

function LocalLabel({turn, socket, gameName}) {
	return (
		<SVideoLabel>
			<i className="fas fa-crown"></i>
			<p>?</p>
			<button
				onClick={() => socket.emit('next turn', { roomName: gameName })}
				disabled={turn !== socket.id}
			>
				REVEL
			</button>
		</SVideoLabel>
	);
}

const mapStateToProps = state => ({
  turn: state.game.turn,
  gameName: state.game.name
})

export default connect(mapStateToProps)(LocalLabel);
