import { NEW_STREAM, CLEAR_STREAM_NAMES } from './types';


export const createStream = stream => dispatch => {
  dispatch({
      type: NEW_STREAM,
      payload: stream
    });
}

export const clearStreamNames = () => dispatch => {
  dispatch({
      type: CLEAR_STREAM_NAMES
    });
}