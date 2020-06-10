const turnOnLocalMedia = async (createStream, streams) => {
	if (!streams['local']) {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true
		});

		createStream({ stream, socketId: 'local' });
	}
};

export default turnOnLocalMedia;
