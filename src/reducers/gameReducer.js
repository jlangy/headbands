import { NEW_GAME, ALL_PLAYERS_JOINED } from '../actions/types';

const initialState = {};

export default function(state = initialState, action){
  switch(action.type){
    case NEW_GAME:
      const {name, totalPlayers, afoot} = action.payload;
      return {name, totalPlayers, afoot}
    case ALL_PLAYERS_JOINED:
      return {...state, allPlayersJoined: true}
    default:
      return state;
  }
}