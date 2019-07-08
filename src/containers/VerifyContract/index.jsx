import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import VerifyContract from '../../components/VerifyContract';
import { FORM_CONTRACT_VERIFY } from '../../constants/FormConstants';
import FormActions from '../../actions/FormActions';
import ContractActions from '../../actions/ContractActions';


export default withRouter(connect(
	(state) => ({
		form: state.form.get(FORM_CONTRACT_VERIFY),
		compilersList: state.contract.get('compilersList'),
		contracts: state.contract.get('contracts'),
		verified: state.contract.get('verified'),
	}),
	(dispatch) => ({
		setValue: (field, value) => dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, field, value)),
		setInFormValue: (fields, value) => dispatch(FormActions.setInFormValue(FORM_CONTRACT_VERIFY, fields, value)),
		contractCodeCompile: (code) => dispatch(ContractActions.contractCodeCompile(code)),
		contractCompilerInit: () => dispatch(ContractActions.contractCompilerInit()),
		changeContractCompiler: (version) => dispatch(ContractActions.changeContractCompiler(version)),
		updateConstructorParamsForm: () => dispatch(ContractActions.updateConstructorParamsForm()),
		contractVerifyApprove: (id) => dispatch(ContractActions.contractVerifyApprove(id)),
	}),
)(VerifyContract));
