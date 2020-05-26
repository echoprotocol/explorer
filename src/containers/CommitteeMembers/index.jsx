import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import CommitteeActions from '../../actions/CommitteeActions';
import { CURRENT_COMMITTEE_GRID } from '../../constants/TableConstants';
import GridActions from '../../actions/GridActions';
import CommitteeMembers from '../../components/CommitteeMembers';


export default withRouter(connect(
	(state) => ({
		filterAndPaginateData: state.grid.get(CURRENT_COMMITTEE_GRID),
		loading: state.account.get('loading'),
		loadingMoreHistory: state.committee.get('loadingMoreHistory'),
		currentCommittee: state.committee.get('currentCommittee'),
		candidateCommittee: state.committee.get('candidateCommittee'),
		deactivatedCommittee: state.committee.get('deactivatedCommittee'),
	}),
	(dispatch) => ({
		onSetPage: (grid, newPage) => dispatch(GridActions.setPage(grid, newPage)),
		getCommitteeInfo: () => {},
		loadCommittees: (status) => dispatch(CommitteeActions.loadCommittees(status)),
		clearCommitteeInfo: () => dispatch(CommitteeActions.clear()),
	}),
)(CommitteeMembers));
