import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { FORM_MANAGE_CONTRACT } from '../../constants/FormConstants';

import ContractActions from '../../actions/ContractActions';
import AccountActions from '../../actions/AccountActions';
import FormActions from '../../actions/FormActions';

import ManageContract from '../../components/ManageContract';

export default withRouter(connect(
	(state) => ({
		owner: state.contract.get('owner'),
		activeAccount: state.global.get('activeAccount'),
		name: state.form.getIn([FORM_MANAGE_CONTRACT, 'name']),
		description: state.form.getIn([FORM_MANAGE_CONTRACT, 'description']),
		icon: state.form.getIn([FORM_MANAGE_CONTRACT, 'icon']),
		iconBase64: state.form.getIn([FORM_MANAGE_CONTRACT, 'iconBase64']),
		isErrorForm: state.form.getIn([FORM_MANAGE_CONTRACT, 'isErrorForm']),
		isChangedForm: state.form.getIn([FORM_MANAGE_CONTRACT, 'isChangedForm']),
		contractIcon: state.contract.get('icon'),
		historyLength: state.global.get('historyLength'),
		clickSaveCounter: state.contract.get('clickSaveCounter'),
	}),
	(dispatch) => ({
		getContractInfo: (id) => dispatch(ContractActions.getContractInfo(id)),
		validateContract: (field, value) => dispatch(ContractActions.validateContract(field, value)),
		manageContract: (id, name, icon, description, clickSaveCounter) => dispatch(ContractActions.manageContract(id, name, icon, description, clickSaveCounter)),
		setActiveAccount: (account) => dispatch(AccountActions.setActiveAccount(account)),
		setContractIcon: (value) => dispatch(ContractActions.setContractIcon(value)),
		setFormValue: (field, value) => dispatch(FormActions.setFormValue(FORM_MANAGE_CONTRACT, field, value)),
		clearByField: (field) => dispatch(FormActions.clearByField(FORM_MANAGE_CONTRACT, field)),
		setDefaultDateContract: (id) => dispatch(ContractActions.setDefaultDateContract(id)),
		loadActiveAccount: () => dispatch(AccountActions.loadActiveAccount()),
		checkValidateForm: () => dispatch(ContractActions.checkValidateForm()),
		checkChangesForm: () => dispatch(ContractActions.checkChangesForm()),
	}),
)(ManageContract));
