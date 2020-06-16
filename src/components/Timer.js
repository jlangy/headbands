import React, { useState, useEffect } from 'react';
import SStatus from '../styled_components/controls/SStatus';
import formatTime from '../helpers/formatTime';

const Timer = () => {
	let [time, setTime] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setTime(time + 1);
		}, 1000);
	}, [time]);

	return <SStatus>{formatTime(time)}</SStatus>;
};

export default Timer;
