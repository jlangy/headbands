import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Video = ({ stream, id, revealed, streamName }) => {
	useEffect(() => {
		document.getElementById(id).srcObject = stream;
	}, [stream, id]);

	return (
		//TODO: just a lazy example. Styling revealed videos needs to be improved
		<video id={id} autoPlay playsInline poster="/tv-color-bars.gif" style={{filter: revealed.includes(streamName) ? 'grayscale(100%)' : ''}}></video>
	);
};

const mapStateToProps = state => ({
	revealed: state.game.revealed
})

export default connect(mapStateToProps)(Video);
