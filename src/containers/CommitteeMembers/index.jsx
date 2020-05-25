import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import AccountActions from '../../actions/AccountActions';
import {
    CURRENT_COMMITTEE_GRID,
    // CANDIDATE_COMMITTEE_GRID,
    // DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';
import GridActions from '../../actions/GridActions';
import CommitteeMembers from '../../components/CommitteeMembers';


export default withRouter(connect(
	(state) => ({
		filterAndPaginateData: state.grid.get(CURRENT_COMMITTEE_GRID),
		loading: state.account.get('loading'),
		loadingMoreHistory: state.account.get('loadingMoreHistory'),
		currentCommittee: state.account.get('currentCommittee'),
		candidateCommittee: state.account.get('candidateCommittee'),
		deactivatedCommittee: state.account.get('deactivatedCommittee'),
	}),
	(dispatch) => ({
		onSetPage: (grid, newPage) => dispatch(GridActions.setPage(grid, newPage)),
		getCommitteeInfo: () => {},
		loadCommittees: (status) => dispatch(AccountActions.loadCommittees(status)),
		clearCommitteeInfo: () => dispatch(AccountActions.clear()),
	}),
)(CommitteeMembers));
