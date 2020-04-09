import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Account from '../../components/Account';
import AccountActions from '../../actions/AccountActions';
import { ACCOUNT_GRID } from '../../constants/TableConstants';
import GridActions from '../../actions/GridActions';

export default withRouter(connect(
	(state) => ({
		filterAndPaginateData: state.grid.get(ACCOUNT_GRID),
		loading: state.account.get('loading'),
		loadingMoreHistory: state.account.get('loadingMoreHistory'),
		balances: state.account.get('balances'),
		tokens: state.account.get('tokens'),
		accountHistory: state.account.get('history'),
		account: state.account.get('echoAccountInfo'),
		isMobile: state.global.get('isMobile'),
	}),
	(dispatch) => ({
		onSetFilter: (params) => dispatch(GridActions.setFilter(ACCOUNT_GRID, params)),
		onSetPage: (newPage) => dispatch(GridActions.setPage(ACCOUNT_GRID, newPage)),
		getAccountInfo: (id) => dispatch(AccountActions.getAccountInfo(id)),
		loadAccountHistory: (accountId) => dispatch(AccountActions.loadAccountHistory(accountId)),
		clearAccountInfo: () => dispatch(AccountActions.clear()),
	}),
)(Account));
