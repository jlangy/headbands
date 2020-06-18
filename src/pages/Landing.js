import React from 'react';
import { connect } from 'react-redux';
import SetupOptions from '../components/SetupOptions';
import JoinOptions from '../components/JoinOptions';
import SLandingPage from '../styled_components/layout/SLandingPage';
import SLandingCard from '../styled_components/layout/SLandingCard';

const Landing = ({ socket, streams }) => {
	return (
		<SLandingPage>
			<SLandingCard>
				<SetupOptions socket={socket} streams={streams} />
			</SLandingCard>
			<SLandingCard>
				<JoinOptions socket={socket} streams={streams} />
			</SLandingCard>
		</SLandingPage>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps)(Landing);
