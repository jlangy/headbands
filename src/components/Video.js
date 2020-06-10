import React, { useEffect } from 'react';

const Video = ({ stream, id }) => {
	useEffect(() => {
		document.getElementById(id).srcObject = stream;
	}, [stream]);

	return (
		<div className="video-container">
			<video id={id} autoPlay playsInline></video>
		</div>
	);
};

export default Video;
