import { NEW_STREAM } from './types';

export const createStream = stream => dispatch => {
  dispatch({
      type: NEW_STREAM,
      payload: stream
    });
}