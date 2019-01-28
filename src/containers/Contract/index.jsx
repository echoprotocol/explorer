import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CACHE_MAPS } from 'echojs-lib';

import Contract from '../../components/Contract';
import ContractActions from '../../actions/ContractActions';

export default withRouter(connect(
	(state) => ({
		loading: state.contract.get('loading'),
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
	}),
)(Contract));
