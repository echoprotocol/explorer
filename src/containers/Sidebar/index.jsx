import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import Sidebar from '../../components/Sidebar';

const SidebarContainer = React.memo(({ ...props }) => (
	<Sidebar {...props} />
));


export default withRouter(connect(
	(state) => ({
		delegationRate: state.statistics.get('delegationRate'),
		delegationRates: state.statistics.get('delegationRates'),
		decentralizationRate: state.statistics.get('decentralizationRate'),
		decentralizationRates: state.statistics.get('decentralizationRates'),
	}),
	() => ({}),
)(SidebarContainer));
