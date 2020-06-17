import React from 'react';
import SAlert from '../styled_components/layout/SAlert';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
	alerts.length > 0 &&
	alerts.map((alert) => <SAlert key={alert.id}>{alert.msg}</SAlert>);

const mapStateToProps = (state) => ({
	alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);
