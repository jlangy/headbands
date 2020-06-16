import { combineReducers } from 'redux';
import streamReducer from './streamReducer';
import gameReducer from './gameReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
	streams: streamReducer,
	game: gameReducer,
	alerts: alertReducer
});

export default rootReducer;
