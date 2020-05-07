import { NEW_GAME } from './types';

export const createGame = game => dispatch => {
  dispatch({
      type: NEW_GAME,
      payload: game
    });
}