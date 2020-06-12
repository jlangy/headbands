import store from '../store';
import { NEW_STREAM } from '../reducers/types';

const turnOnLocalMedia = async (streams, socket) => {
	//Setup media
	if (!streams[socket.id]) {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
		});
		store.dispatch({
			type: NEW_STREAM,
			payload: { stream, socketId: socket.id }
		});
	}
};

export default turnOnLocalMedia;
