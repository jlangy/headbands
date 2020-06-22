import store from '../store';
import { NEW_STREAM } from '../reducers/types';

const turnOnLocalMedia = async (streams, socket) => {
	// Setup media
	return new Promise(async (resolve, reject) => {
		if (!streams[socket.id]) {
			try{
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: true
				});
				store.dispatch({
					type: NEW_STREAM,
					payload: { stream, socketId: socket.id }
				});
				resolve();
			} catch {
				reject();
			}
		}
	});
};

export default turnOnLocalMedia;
