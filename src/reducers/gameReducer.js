import { NEW_GAME, ALL_PLAYERS_JOINED, ADD_PLAYER, NAME_ADDED, SETUP_COMPLETE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action){
  switch(action.type){
    case NEW_GAME:
      const {name, totalPlayers, afoot, playersJoined} = action.payload;
      return {name, totalPlayers, afoot, playersJoined, totalNamesSet:0}
    case ALL_PLAYERS_JOINED:
      return {...state, allPlayersJoined: true}
    case ADD_PLAYER:
      return {...state, playersJoined: state.playersJoined + 1}
    case NAME_ADDED:
      return {...state, totalNamesSet: state.totalNamesSet + 1}
    case SETUP_COMPLETE:
      return {...state, setupComplete: true}
    default:
      return state;
  }
}