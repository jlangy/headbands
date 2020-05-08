import { NEW_STREAM, GOT_NAMES } from '../actions/types';

const initialState = {};

export default function(state = initialState, action){
  switch(action.type){
    case NEW_STREAM:
      const {stream, socketId} = action.payload;
      return {...state, [socketId]: {stream}}
    case GOT_NAMES:
      const {names} = action.payload;
      const newState = {};
      Object.keys(state).forEach(streamName => {
        const foundName = names.find(nameObj => nameObj.toId === streamName);
        newState[streamName] = {...state[streamName], name: foundName && foundName.name}
      });
      return newState;
    default:
      return state;
  }
}