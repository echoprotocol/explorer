import { connect } from 'react-redux';

import CommitteeMembersTable from '../../components/CommitteeMembersTable';
import GridActions from '../../actions/GridActions';

export default connect(
	(state, props) => ({
		filterAndPaginateData: state.grid.get(props.gridName),
		isMobile: state.global.get('isMobile'),
	}),
	(dispatch, props) => ({
		initData: (params) => dispatch(GridActions.initData(props.gridName, params)),
	}),
)(CommitteeMembersTable);
