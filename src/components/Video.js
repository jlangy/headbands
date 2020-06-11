import React, { useEffect } from 'react';

const Video = ({ stream, id }) => {
	useEffect(() => {
		document.getElementById(id).srcObject = stream;
	}, [stream, id]);

	return (
		<video id={id} autoPlay playsInline poster="/tv-color-bars.gif"></video>
	);
};

export default Video;
