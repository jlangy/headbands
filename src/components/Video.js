import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SVideo from '../styled_components/video/SVideo';

const Video = ({ stream, id, revealed, streamName }) => {
	useEffect(() => {
		document.getElementById(id).srcObject = stream;
	}, [stream, id]);

	return (
		<SVideo
			id={id}
			autoPlay
			playsInline
			poster="/tv-color-bars.gif"
			revealed={revealed.includes(streamName)}
		></SVideo>
	);
};

const mapStateToProps = (state) => ({
	revealed: state.game.revealed
});

export default connect(mapStateToProps)(Video);
