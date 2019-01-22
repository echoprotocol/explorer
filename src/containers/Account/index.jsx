import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Map } from 'immutable';
import { CACHE_MAPS } from 'echojs-lib';

import Account from '../../components/Account';
import AccountActions from '../../actions/AccountActions';

export default withRouter(connect(
	(state) => ({
		account: state.echoCache.getIn([CACHE_MAPS.FULL_ACCOUNTS, state.account.get('id')]),
		balances: state.account.get('balances').mapEntries(([assetId, statsId]) => ([
			assetId,
			new Map({
				asset: state.echoCache.getIn([CACHE_MAPS.ASSET_BY_ASSET_ID, assetId]),
				stats: state.echoCache.getIn([CACHE_MAPS.OBJECTS_BY_ID, statsId]),
			}),
		])),
	}),
	(dispatch, props) => ({
		getAccountInfo: () => dispatch(AccountActions.getAccountInfo(props.match.params.name)),
		clearAccountInfo: () => dispatch(AccountActions.clear()),
	})
	,
)(Account));
