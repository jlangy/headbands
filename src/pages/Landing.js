import React from 'react';
import { connect } from 'react-redux';
import SPage from '../styled_components/layout/SPage';
import SCard from '../styled_components/layout/SCard';
import SetupOptions from '../components/SetupOptions';
import JoinOptions from '../components/JoinOptions';
import styled from 'styled-components';

const SLandingPage = styled(SPage)`
	justify-content: space-around;
	flex-direction: row;
	align-items: flex-start;
`;

const SLandingCard = styled(SCard)`
	width: 40%;
	margin-left: 0;
	margin-right: 0;

	@media (max-width: 768px) {
		width: 80%;
		margin-left: auto;
		margin-right: auto;
	}
`;

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
