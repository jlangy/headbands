const formatTime = (seconds) => {
	let s = seconds,
		m = 0,
		h = 0;

	if (s > 60) {
		m += Math.floor(s / 60);
		s %= 60;
	}

	m = m < 10 ? `0${m}` : m;
	h = h < 10 ? `0${h}` : h;
	s = s < 10 ? `0${s}` : s;

	return `${h}:${m}:${s}`;
};

export default formatTime;
