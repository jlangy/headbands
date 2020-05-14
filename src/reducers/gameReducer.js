import { NEW_GAME, ALL_PLAYERS_JOINED, ADD_PLAYER, NAME_ADDED, SETUP_COMPLETE, END_GAME, RESTART_GAME } from '../actions/types';
import gamePhases from './gamePhases';

const initialState = {};

export default function(state = initialState, action){
  switch(action.type){
    case NEW_GAME:
      const {name, totalPlayers, afoot, playersJoined, host} = action.payload;
      return {name, totalPlayers, afoot, playersJoined, host, totalNamesSet:0, gamePhase: gamePhases.joining}
    case ALL_PLAYERS_JOINED:
      return {...state, gamePhase: gamePhases.settingNames}
    case ADD_PLAYER:
      return {...state, playersJoined: state.playersJoined + 1}
    case NAME_ADDED:
      return {...state, totalNamesSet: state.totalNamesSet + 1}
    case SETUP_COMPLETE:
      return {...state, gamePhase: gamePhases.playing}
    case END_GAME:
      return {};
    case RESTART_GAME:
      return {...state, gamePhase: gamePhases.settingNames, totalNamesSet: 0};
    default:
      return state;
  }
}