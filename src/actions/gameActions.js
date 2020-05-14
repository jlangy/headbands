import { NEW_GAME, END_GAME, RESTART_GAME } from './types';

export const createGame = game => dispatch => {
  dispatch({
      type: NEW_GAME,
      payload: game
    });
}

export const endGame = () => dispatch => {
  dispatch({
      type: END_GAME
    });
}

export const restart = () => dispatch => {
  dispatch({
      type: RESTART_GAME
    });
}