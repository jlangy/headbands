import {
	NEW_STREAM,
	GOT_NAMES,
	CLEAR_STREAMS,
	CLEAR_STREAM_NAMES
} from '../actions/types';

const initialState = {};

const streamReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_STREAM:
			const { stream, socketId } = action.payload;
			return { ...state, [socketId]: { stream } };
		case GOT_NAMES:
			const { names } = action.payload;
			const newState = {};
			Object.keys(state).forEach((streamName) => {
				const foundName = names.find((nameObj) => nameObj.toId === streamName);
				newState[streamName] = {
					...state[streamName],
					name: foundName && foundName.name
				};
			});
			return newState;
		case CLEAR_STREAMS:
			return { local: state.local };
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
