import {
	REMOVE_STREAM,
	NEW_STREAM,
	GOT_NAMES,
	CLEAR_STREAMS,
	CLEAR_STREAM_NAMES
} from './types';

const initialState = {};

const streamReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_STREAM:
			const { stream, socketId } = action.payload;
			return { ...state, [socketId]: { stream } };
		case GOT_NAMES:
			const { names } = action.payload;
			const newState = { ...state };
			Object.entries(names).forEach(([id, playerInformation]) => {
				newState[id] = { ...newState[id], ...playerInformation };
			});
			return newState;
		case REMOVE_STREAM: {
			const idToRemove = action.socketId;
			const newState = { ...state};
			delete newState[idToRemove];
			return newState;
		}
		case CLEAR_STREAMS:
			return {};
		case CLEAR_STREAM_NAMES:
			const newStateWithoutNames = {};
			for (const [key, value] of Object.entries(state)) {
				newStateWithoutNames[key] = { stream: value.stream };
			}
			return newStateWithoutNames;
		default:
			return state;
	}
};

export default streamReducer;
