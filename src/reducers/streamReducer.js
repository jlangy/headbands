import { NEW_STREAM} from '../actions/types';

const initialState = [];

export default function(state = initialState, action){
  switch(action.type){
    case NEW_STREAM:
      return [...state, action.payload]
    default:
      return state;
  }
}