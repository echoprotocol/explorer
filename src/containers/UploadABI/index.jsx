import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import UploadABI from '../../components/UploadABI';
import ContractActions from '../../actions/ContractActions';
import FormActions from '../../actions/FormActions';
import { FORM_ABI } from '../../constants/FormConstants';


export default withRouter(connect(
	(state) => ({
		abiInput: state.form.getIn([FORM_ABI, 'abi']),
		abi: state.contract.get('abi'),
		icon: state.contract.get('icon'),
		verified: state.contract.get('verified'),
	}),
	(dispatch) => ({
		approve: (id, abi) => dispatch(ContractActions.abiApprove(id, abi)),
		setFormAbi: (value) => dispatch(FormActions.setFormValue(FORM_ABI, 'abi', value)),
		getContractInfo: (id) => dispatch(ContractActions.getContractInfo(id)),
	}),
)(UploadABI));
