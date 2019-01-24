import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CACHE_MAPS } from 'echojs-lib';

import Account from '../../components/Account';
import AccountActions from '../../actions/AccountActions';

export default withRouter(connect(
	(state) => ({
		balances: state.account.get('balances'),
		account: state.echoCache.getIn([CACHE_MAPS.FULL_ACCOUNTS, state.account.get('id')]),
		cacheObjects: state.echoCache.get(CACHE_MAPS.OBJECTS_BY_ID),
	}),
	(dispatch, props) => ({
		getAccountInfo: () => dispatch(AccountActions.getAccountInfo(props.match.params.id)),
		clearAccountInfo: () => dispatch(AccountActions.clear()),
	})
	,
)(Account));
