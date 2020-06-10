import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../actions/streamActions';
import Page from '../styled_components/Page';
import Card from '../styled_components/Card';
import SetupOptions from '../components/SetupOptions';
import JoinOptions from '../components/JoinOptions';

const Landing = ({ socket, createStream, streams }) => {
	return (
		<Page>
			<Card>
				<SetupOptions socket createStream streams />
			</Card>
			<Card>
				<JoinOptions socket createStream streams />
			</Card>
		</Page>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps, { createStream })(Landing);
