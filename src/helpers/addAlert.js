import { ADD_ALERT, REMOVE_ALERT } from '../reducers/types';
import uuid from 'uuid';
import store from '../store';

const addAlert = (msg) => {
	window.console.log('WE RAN!');
	const id = uuid.v4();
	store.dispatch({
		type: ADD_ALERT,
		payload: {
			msg,
			id
		}
	});

	setTimeout(() => store.dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};

export default addAlert;
