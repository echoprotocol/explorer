import { connect } from 'react-redux';
import { MODAL_EXTENSION_INFO, MODAL_ERROR, MODAL_SUCCESS, MODAL_INCENTIVES_INFO } from '../../constants/ModalConstants';
import ModalActions from '../../actions/ModalActions';
import Modals from '../../components/Modals';

export default connect(
	(state) => ({
		successForm: state.modal.get(MODAL_SUCCESS),
		errorForm: state.modal.get(MODAL_ERROR),
		extensionInfo: state.modal.get(MODAL_EXTENSION_INFO),
		incentivesInfo: state.modal.get(MODAL_INCENTIVES_INFO),
	}),
	(dispatch) => ({
		closeModal: () => dispatch(ModalActions.closeModal()),
	}),
)(Modals);
