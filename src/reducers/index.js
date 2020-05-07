import { combineReducers } from 'redux';
import streamReducer from './streamReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  streams: streamReducer,
  game: gameReducer
});