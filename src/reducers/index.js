import { combineReducers } from 'redux';
import streamReducer from './streamReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
	streams: streamReducer,
	game: gameReducer
});

export default rootReducer;
