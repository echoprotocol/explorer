import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Contract from '../../components/Contract';
import ContractActions from '../../actions/ContractActions';

export default withRouter(connect(
	(state) => ({
		bytecode: state.contract.get('bytecode'),
	}),
	(dispatch, props) => ({
		getContractInfo: () => dispatch(ContractActions.getContractInfo(props.match.params.id)),
		clearContractInfo: () => dispatch(ContractActions.clear()),
	}),
)(Contract));
