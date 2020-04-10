import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import Sidebar from '../../components/Sidebar';

const SidebarContainer = React.memo(({ ...props }) => (
	<Sidebar {...props} />
));


export default withRouter(connect(
	(state) => ({
		delegationRate: state.block.get('delegationRate'),
		delegationRates: state.block.get('delegationRates'),
	}),
	() => ({}),
)(SidebarContainer));
