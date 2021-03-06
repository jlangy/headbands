import {
	NEW_GAME,
	ALL_PLAYERS_JOINED,
	ADD_PLAYER,
	NAME_ADDED,
	SETUP_COMPLETE,
	END_GAME,
	RESTART_GAME,
	NEW_TURN,
	GAME_END
} from './types';
import gamePhases from './gamePhases';

const initialState = {};

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_GAME:
			const { name, totalPlayers, afoot, playersJoined, host } = action.payload;
			return {
				name,
				totalPlayers,
				afoot,
				playersJoined,
				host,
				totalNamesSet: 0,
				gamePhase: gamePhases.joining,
				goToGame: true,
				revealed: []
			};
		case ALL_PLAYERS_JOINED: {
			return { ...state, gamePhase: gamePhases.settingNames };
		}
		case NEW_TURN: {
			const { turn, revealed } = action.payload;
			return { ...state, turn, revealed };
		}
		case GAME_END: {
			const {revealed} = action.payload;
			return {...state, gameEnd: true, revealed, turn: null}
		}
		case ADD_PLAYER:
			return { ...state, playersJoined: state.playersJoined + 1 };
		case NAME_ADDED:
			return { ...state, totalNamesSet: state.totalNamesSet + 1 };
		case SETUP_COMPLETE:
			{
				return { ...state, gamePhase: gamePhases.playing, turn: state.host };
			}
		case END_GAME:
			{
				const {disconnection} = action.payload;
				return disconnection ? { disconnected: true, goToHome: true } : {goToHome: true};
			}
		case RESTART_GAME:
			return { ...state, gamePhase: gamePhases.settingNames, totalNamesSet: 0, revealed: [], gameEnd: false, turn: null };
		default:
			return state;
	}
};

export default gameReducer;
