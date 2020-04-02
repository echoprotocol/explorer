import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Account from '../../components/Account';
import AccountActions from '../../actions/AccountActions';
import GlobalActions from '../../actions/GlobalActions';

export default withRouter(connect(
	(state) => ({
		loading: state.account.get('loading'),
		loadingMoreHistory: state.account.get('loadingMoreHistory'),
		isFullHistory: state.account.get('isFullHistory'),
		balances: state.account.get('balances'),
		tokens: state.account.get('tokens'),
		accountHistory: state.account.get('history'),
		account: state.account.get('echoAccountInfo'),
		isMobile: state.global.get('isMobile'),
	}),
	(dispatch) => ({
		getAccountInfo: (id) => dispatch(AccountActions.getAccountInfo(id)),
		updateAccountHistory: (accountId, newHistory, oldHistory) => dispatch(AccountActions.updateAccountHistory(
			accountId,
			newHistory,
			oldHistory,
		)),
		loadAccountHistory: (accountId, lastOperationId) => dispatch(AccountActions.loadAccountHistory(
			accountId,
			lastOperationId,
		)),
		clearAccountInfo: () => dispatch(AccountActions.clear()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(Account));
