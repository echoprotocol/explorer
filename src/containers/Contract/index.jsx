import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Contract from '../../components/Contract';
import ContractActions from '../../actions/ContractActions';
import GlobalActions from '../../actions/GlobalActions';
import AccountActions from '../../actions/AccountActions';

export default withRouter(connect(
	(state) => ({
		isMobileDevice: state.global.get('isMobileDevice'),
		connected: state.global.get('connected'),
		loading: state.contract.get('loading'),
		isFullHistory: state.contract.get('isFullHistory'),
		loadingMoreHistory: state.contract.get('loadingMoreHistory'),
		contractHistory: state.contract.get('history'),
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
		balances: state.contract.get('balances'),
		owner: state.contract.get('owner'),

		name: state.contract.get('name'),
		description: state.contract.get('description'),
		icon: state.contract.get('icon'),
		sourceCode: state.contract.get('sourceCode'),
		abi: state.contract.get('abi'),
		compilerVersion: state.contract.get('compilerVersion'),
		verified: state.contract.get('verified'),
		stars: state.contract.get('stars'),
		error: state.contract.get('error'),
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
		updateContractHistory: (data) => dispatch(ContractActions.updateContractHistory(data)),
	}),
)(Contract));
