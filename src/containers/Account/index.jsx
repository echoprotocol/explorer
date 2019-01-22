import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Account from '../../components/Account';

import AccountActions from '../../actions/AccountActions';

export default withRouter(connect(
	(state) => ({
		blockInformation: state.block.get('blockInformation'),
	}),
	(dispatch, props) => ({
		getAccountInfo: () => dispatch(AccountActions.getAccountInfo(props.match.params.name)),
		clearAccountInfo: () => dispatch(AccountActions.clear()),
	})
	,
)(Account));
