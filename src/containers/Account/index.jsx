import Immutable from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CACHE_MAPS } from 'echojs-lib';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import Account from '../../components/Account';
import AccountActions from '../../actions/AccountActions';
import GlobalActions from '../../actions/GlobalActions';

const filteredObjects = createSelector(
	(state) => state.account.get('balances'),
	(state) => state.echoCache.get(CACHE_MAPS.OBJECTS_BY_ID),
	(balances, objects) => balances.reduce(
		(map, s, a) => map.set(a, objects.get(a)).set(s, objects.get(s)),
		Immutable.Map({}),
	),
);

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);
const balanceSelector = createImmutableSelector(
	(state) => state.account.get('balances'),
	(state) => filteredObjects(state),
	(balances, objects) => balances.mapEntries(([assetId, statsId]) => ([
		assetId,
		{
			asset: objects.get(assetId),
			amount: objects.getIn([statsId, 'balance']),
			id: objects.getIn([statsId, 'id']),
		},
	])),
);

export default withRouter(connect(
	(state) => ({
		loading: state.account.get('loading'),
		loadingMoreHistory: state.account.get('loadingMoreHistory'),
		isFullHistory: state.account.get('isFullHistory'),
		balances: balanceSelector(state),
		accountHistory: state.account.get('history'),
		account: state.echoCache.getIn([CACHE_MAPS.FULL_ACCOUNTS, state.account.get('id')]),
	}),
	(dispatch, props) => ({
		getAccountInfo: () => dispatch(AccountActions.getAccountInfo(props.match.params.id)),
		updateAccountHistory: (accountId, newHistory, oldHistory) => dispatch(AccountActions.updateAccountHistory(
			accountId,
			newHistory,
			oldHistory,
		)),
		loadAccountHistory: (accountId, lastOperationId) => dispatch(AccountActions.loadAccountHistory(
			accountId,
			lastOperationId,
		)),
		updateAccountBalances: (balances) => dispatch(AccountActions.updateAccountBalances(balances)),
		clearAccountInfo: () => dispatch(AccountActions.clear()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	})
	,
)(Account));
