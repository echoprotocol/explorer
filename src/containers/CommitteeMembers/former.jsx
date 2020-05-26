import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import CommitteeActions from '../../actions/CommitteeActions';
import GridActions from '../../actions/GridActions';
import CommitteeMembers from '../../components/CommitteeMembers';
import { DEACTIVATED_COMMITTEE_GRID } from '../../constants/TableConstants';
import { ECHODB_COMMITTEE_STATUS } from '../../constants/CommitteeConstants';


export default withRouter(connect(
	(state) => ({
		filterAndPaginateData: state.grid.get(DEACTIVATED_COMMITTEE_GRID),
		loading: state.account.get('loading'),
		loadingMoreHistory: state.committee.get('loadingMoreHistory'),
		committee: state.committee.get('deactivatedCommittee'),
	}),
	(dispatch) => ({
		onSetPage: (newPage) => dispatch(GridActions.setPage(DEACTIVATED_COMMITTEE_GRID, newPage)),
		getCommitteeInfo: () => {},
		loadCommittees: () => dispatch(CommitteeActions.loadCommittees(ECHODB_COMMITTEE_STATUS.DEACTIVATED)),
		clearCommitteeInfo: () => dispatch(CommitteeActions.clear()),
	}),
)(CommitteeMembers));
