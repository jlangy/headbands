import {END_GAME, CLEAR_STREAMS} from '../reducers/types';

export default function endGame(stream, dispatch, disconnection=false){
  dispatch({ type: END_GAME, payload: { disconnection } });
  // Stop local media
  stream.getTracks()
    .forEach(function (track) {
      track.stop();
    });
  window.localClone.getTracks().forEach((track) => track.stop());
  window.localClone = undefined;
  dispatch({ type: CLEAR_STREAMS });
}