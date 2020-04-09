import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Sidebar from '../../components/Sidebar';
import { getFrozenData, updateFrozenData } from '../../actions/BlockActions';

const SidebarContainer = React.memo(({ ...props }) => (
	<Sidebar {...props} />
));


export default withRouter(connect(
	(state) => ({
		currentFrozenData: state.block.get('currentFrozenData'),
		frozenData: state.block.get('frozenData'),
	}),
	(dispatch) => ({
		getFrozenBalances: () => dispatch(getFrozenData()),
		updateFrozenBalances: (data) => dispatch(updateFrozenData(data)),
	}),
)(SidebarContainer));
