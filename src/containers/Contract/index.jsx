import Immutable from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CACHE_MAPS } from 'echojs-lib';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import Contract from '../../components/Contract';
import ContractActions from '../../actions/ContractActions';
import GlobalActions from '../../actions/GlobalActions';

const filteredObjects = createSelector(
	(state) => state.contract.get('balances'),
	(state) => state.echoCache.get(CACHE_MAPS.OBJECTS_BY_ID),
	(balances, objects) => balances.map((b) => objects.get(b.get('asset_id'))),
);

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);
const balanceSelector = createImmutableSelector(
	(state) => state.contract.get('balances'),
	(state) => filteredObjects(state),
	(balances, objects) => balances.map((b, i) => ({
		id: i,
		amount: b.get('amount'),
		asset: objects.get(i),
	})),
);

export default withRouter(connect(
	(state) => ({
		loading: state.contract.get('loading'),
		isFullHistory: state.contract.get('isFullHistory'),
		loadingMoreHistory: state.contract.get('loadingMoreHistory'),
		history: state.contract.get('history'),
		bytecode: state.contract.get('bytecode'),
		balances: balanceSelector(state),
	}),
	(dispatch, props) => ({
		getContractInfo: () => dispatch(ContractActions.getContractInfo(props.match.params.id)),
		clearContractInfo: () => dispatch(ContractActions.clear()),
		loadContractHistory: (lastOperationId) => dispatch(ContractActions.loadContractHistory(
			props.match.params.id,
			lastOperationId,
		)),
		updateContractInfo: (recetOperationId) => dispatch(ContractActions.updateContractInfo(
			props.match.params.id,
			recetOperationId,
		)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(Contract));
