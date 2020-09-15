import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import CommitteeActions from '../../actions/CommitteeActions';
import CommitteeMembers from '../../components/CommitteeMembers';
import {
	CURRENT_COMMITTEE_GRID,
	CANDIDATE_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';

export default withRouter(connect(
	(state) => ({
		filterAndPaginateDataCurrent: state.grid.get(CURRENT_COMMITTEE_GRID),
		filterAndPaginateCandidate: state.grid.get(CANDIDATE_COMMITTEE_GRID),
		filterAndPaginateDataDeactivated: state.grid.get(DEACTIVATED_COMMITTEE_GRID),
		loading: state.committee.get('loading'),
		loadingMoreCommittee: state.committee.get('loadingMoreCommittee'),
		deactivatedCommittee: state.committee.get('deactivatedCommittee'),
		currentCommittee: state.committee.get('currentCommittee'),
		candidateCommittee: state.committee.get('candidateCommittee'),
	}),
	(dispatch) => ({
		getCommitteeInfo: () => {},
		loadCommittees: (status) => dispatch(CommitteeActions.loadCommittees(status)),
		clearCommitteeInfo: () => dispatch(CommitteeActions.clear()),
	}),
)(CommitteeMembers));
