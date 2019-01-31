import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CACHE_MAPS } from 'echojs-lib';

import Account from '../../components/Account';
import AccountActions from '../../actions/AccountActions';
import GlobalActions from '../../actions/GlobalActions';

export default withRouter(connect(
	(state) => ({
		loading: state.account.get('loading'),
		loadingMoreHistory: state.account.get('loadingMoreHistory'),
		isFullHistory: state.account.get('isFullHistory'),
		balances: state.account.get('balances'),
		history: state.account.get('history'),
		account: state.echoCache.getIn([CACHE_MAPS.FULL_ACCOUNTS, state.account.get('id')]),
		cacheObjects: state.echoCache.get(CACHE_MAPS.OBJECTS_BY_ID),
	}),
	(dispatch, props) => ({
		getAccountInfo: () => dispatch(AccountActions.getAccountInfo(props.match.params.id)),
		updateAccountHistory: (newHistory, oldHistory) => dispatch(AccountActions.updateAccountHistory(
			props.match.params.id,
			newHistory,
			oldHistory,
		)),
		loadAccountHistory: (lastOperationId) => dispatch(AccountActions.loadAccountHistory(
			props.match.params.id,
			lastOperationId,
		)),
		updateAccountBalances: (balances) => dispatch(AccountActions.updateAccountBalances(balances)),
		clearAccountInfo: () => dispatch(AccountActions.clear()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	})
	,
)(Account));
