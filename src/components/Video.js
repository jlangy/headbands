import React, { useEffect } from 'react';
import SVideo from '../styled_components/SVideo';

const Video = ({ stream, id }) => {
	useEffect(() => {
		document.getElementById(id).srcObject = stream;
	}, [stream, id]);

	return (
		<SVideo>
			<video id={id} autoPlay playsInline></video>
		</SVideo>
	);
};

export default Video;
