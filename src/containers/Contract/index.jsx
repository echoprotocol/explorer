import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CACHE_MAPS } from 'echojs-lib';

import Contract from '../../components/Contract';
import ContractActions from '../../actions/ContractActions';
import GlobalActions from '../../actions/GlobalActions';

export default withRouter(connect(
	(state) => ({
		loading: state.contract.get('loading'),
		isFullHistory: state.contract.get('isFullHistory'),
		loadingMoreHistory: state.contract.get('loadingMoreHistory'),
		history: state.contract.get('history'),
		bytecode: state.contract.get('bytecode'),
		balances: state.contract.get('balances'),
		cacheObjects: state.echoCache.get(CACHE_MAPS.OBJECTS_BY_ID),
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
