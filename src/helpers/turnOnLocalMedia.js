import store from '../store';
import { NEW_STREAM } from '../reducers/types';

const turnOnLocalMedia = async (streams, socket) => {
	// Setup media
	return new Promise(async (resolve, reject) => {
		if (!streams[socket.id]) {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true
			});
			store.dispatch({
				type: NEW_STREAM,
				payload: { stream, socketId: socket.id }
			});
		}
		resolve();
	});
};

export default turnOnLocalMedia;
