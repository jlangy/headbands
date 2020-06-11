import React from 'react';
import { connect } from 'react-redux';
import SPage from '../styled_components/SPage';
import SCard from '../styled_components/SCard';
import SetupOptions from '../components/SetupOptions';
import JoinOptions from '../components/JoinOptions';

const Landing = ({ socket, streams }) => {
	return (
		<SPage>
			<SCard>
				<SetupOptions socket={socket} streams={streams} />
			</SCard>
			<SCard>
				<JoinOptions socket={socket} streams={streams} />
			</SCard>
		</SPage>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps)(Landing);
