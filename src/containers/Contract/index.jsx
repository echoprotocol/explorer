import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Contract from '../../components/Contract';
import ContractActions from '../../actions/ContractActions';
import GlobalActions from '../../actions/GlobalActions';
import AccountActions from '../../actions/AccountActions';
import GridActions from '../../actions/GridActions';
import { CONTRACT_GRID } from '../../constants/TableConstants';

export default withRouter(connect(
	(state) => ({
		connected: state.global.get('connected'),
		isMobile: state.global.get('isMobile'),
		loading: state.contract.get('loading'),
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
		token: state.contract.get('token'),
		countTokenTransfer: state.contract.get('countTokenTransfer'),

		name: state.contract.get('name'),
		description: state.contract.get('description'),
		icon: state.contract.get('icon'),
		sourceCode: state.contract.get('sourceCode'),
		abi: state.contract.get('abi'),
		compilerVersion: state.contract.get('compilerVersion'),
		verified: state.contract.get('verified'),
		stars: state.contract.get('stars'),
		error: state.contract.get('error'),

		activeAccount: state.global.get('activeAccount'),
	}),
	(dispatch) => ({
		onChangeFilter: (filters) => dispatch(GridActions.initData(CONTRACT_GRID, filters)),
		getContractInfo: (contractId) => dispatch(ContractActions.getContractInfo(contractId)),
		clearContractInfo: () => dispatch(ContractActions.clear()),
		loadContractHistory: (contractId) => dispatch(ContractActions.loadContractHistory(contractId)),
		getActiveAccount: () => dispatch(AccountActions.getActiveAccount()),
		setStarToContract: (contractId) => dispatch(ContractActions.setStarToContract(contractId)),
		updateContractInfo: (contractId) => dispatch(ContractActions.updateContractInfo(contractId)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		setActiveAccount: (account) => dispatch(AccountActions.setActiveAccount(account)),
		loadActiveAccount: () => dispatch(AccountActions.loadActiveAccount()),
		updateContractHistory: (data) => dispatch(ContractActions.updateContractHistory(data)),
	}),
)(Contract));
