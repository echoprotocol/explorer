import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import Sidebar from '../../components/Sidebar';
import StatisticsActions from '../../actions/StatisticsActions';
import ModalActions from '../../actions/ModalActions';

const SidebarContainer = React.memo(({ ...props }) => (
	<Sidebar {...props} />
));


export default withRouter(connect(
	(state) => ({
		currentFrozenData: state.statistics.get('currentFrozenData'),
		frozenData: state.statistics.get('frozenData'),
		delegationRate: state.statistics.get('delegationRate'),
		delegationRates: state.statistics.get('delegationRates'),
		decentralizationRate: state.statistics.get('decentralizationRate'),
		decentralizationRates: state.statistics.get('decentralizationRates'),
		incentivesPool: state.statistics.get('incentivesPool'),
		incentive: state.statistics.get('incentive'),
		incentiveRates: state.statistics.get('incentiveRates'),
	}),
	(dispatch) => ({
		updateStatistics: (data) => dispatch(StatisticsActions.updateStatistics(data)),
		openModal: (type, ...params) => dispatch(ModalActions.openModal(type, params)),
	}),
)(SidebarContainer));
