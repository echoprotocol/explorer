import Immutable from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CACHE_MAPS } from 'echojs-lib';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import Contract from '../../components/Contract';
import ContractActions from '../../actions/ContractActions';
import GlobalActions from '../../actions/GlobalActions';
import AccountActions from '../../actions/AccountActions';

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

		registrar: state.contract.get('registrar'),
		blockNumber: state.contract.get('blockNumber'),
		countUsedByAccount: state.contract.get('countUsedByAccount'),
		supportedAsset: state.contract.get('supportedAsset'),
		ethAccuracy: state.contract.get('ethAccuracy'),
		contractTxs: state.contract.get('contractTxs'),
		creationFee: state.contract.get('creationFee'),
		createdAt: state.contract.get('createdAt'),
		type: state.contract.get('type'),
		balances: balanceSelector(state),
		owner: state.contract.get('owner'),

		name: state.contract.get('name'),
		description: state.contract.get('description'),
		icon: state.contract.get('icon'),
		sourceCode: state.contract.get('sourceCode'),
		abi: state.contract.get('abi'),
		compilerVersion: state.contract.get('compilerVersion'),
		verified: state.contract.get('verified'),
		stars: state.contract.get('stars'),

		activeAccount: state.global.get('activeAccount'),
	}),
	(dispatch, props) => ({
		getContractInfo: () => dispatch(ContractActions.getContractInfo(props.match.params.id)),
		clearContractInfo: () => dispatch(ContractActions.clear()),
		loadContractHistory: (lastOperationId) => dispatch(ContractActions.loadContractHistory(
			props.match.params.id,
			lastOperationId,
		)),
		getActiveAccount: () => dispatch(AccountActions.getActiveAccount()),
		setStarToContract: () => dispatch(ContractActions.setStarToContract(props.match.params.id)),
		updateContractInfo: (recetOperationId) => dispatch(ContractActions.updateContractInfo(
			props.match.params.id,
			recetOperationId,
		)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		setActiveAccount: (account) => dispatch(AccountActions.setActiveAccount(account)),
		loadActiveAccount: () => dispatch(AccountActions.loadActiveAccount()),
	}),
)(Contract));
