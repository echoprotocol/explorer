import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import CommitteeActions from '../../actions/CommitteeActions';
import CommitteeMembers from '../../components/CommitteeMembers';
import { CURRENT_COMMITTEE_GRID } from '../../constants/TableConstants';
import { ECHODB_COMMITTEE_STATUS } from '../../constants/CommitteeConstants';

export default withRouter(connect(
	(state) => ({
		filterAndPaginateData: state.grid.get(CURRENT_COMMITTEE_GRID),
		loading: state.committee.get('loading'),
		loadingMoreCommittee: state.committee.get('loadingMoreCommittee'),
		committee: state.committee.get('currentCommittee'),
	}),
	(dispatch) => ({
		getCommitteeInfo: () => {},
		loadCommittees: () => dispatch(CommitteeActions.loadCommittees(ECHODB_COMMITTEE_STATUS.ACTIVE)),
		clearCommitteeInfo: () => dispatch(CommitteeActions.clear()),
	}),
)(CommitteeMembers));
