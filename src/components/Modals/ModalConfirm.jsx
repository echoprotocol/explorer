import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalActions from './../../actions/ModalActions';
import { MODAL_CONFIRM } from './../../constants/ModalConstants';
import { KEY_CODES } from '../../constants/GlobalConstants';

class ModalConfirm extends React.Component {

	constructor(props) {
		super(props);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keyup', this.handleKeyUp, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.handleKeyUp, false);
	}

	onSuccess() {
		if (this.props.successCallback && typeof this.props.successCallback === 'function') {
			this.props.successCallback();
		}
		this.props.closeModal();
	}

	onCancel() {
		if (this.props.cancelCallback && typeof this.props.cancelCallback === 'function') {
			this.props.cancelCallback();
		}
		this.props.closeModal();
	}

	handleKeyUp(e) {
		if (e.keyCode === KEY_CODES.ESC_CODE) {
			this.onCancel();
		}
	}

	render() {
		const {
			show, title, description, btnTitleSuccess, btnTitleCancel,
		} = this.props;

		return (
			<div style={{ display: show ? 'block' : 'none' }} onClose={() => this.onCancel()}>
				<div>
					<b className="modal-header">{title}</b>
				</div>
				<div>
					<p>
						{description}
					</p>
				</div>
				<div>
					<button onClick={() => this.onCancel()}>{btnTitleCancel}</button>
					<button onClick={() => this.onSuccess()}>{btnTitleSuccess}</button>
				</div>
			</div>
		);
	}

}

ModalConfirm.propTypes = {
	show: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	successCallback: PropTypes.func,
	cancelCallback: PropTypes.func,
	closeModal: PropTypes.func,
	btnTitleSuccess: PropTypes.string,
	btnTitleCancel: PropTypes.string,
};

ModalConfirm.defaultProps = {
	show: false,
	btnTitleSuccess: 'Yes',
	btnTitleCancel: 'No',
	title: '',
	description: '',
	successCallback: () => {},
	cancelCallback: () => {},
	closeModal: () => {},
};

export default connect(
	(state) => ({
		show: state.modal.getIn([MODAL_CONFIRM, 'show']),
		title: state.modal.getIn([MODAL_CONFIRM, 'title']),
		description: state.modal.getIn([MODAL_CONFIRM, 'description']),
		successCallback: state.modal.getIn([MODAL_CONFIRM, 'successCallback']),
		cancelCallback: state.modal.getIn([MODAL_CONFIRM, 'cancelCallback']),
		btnTitleSuccess: state.modal.getIn([MODAL_CONFIRM, 'btnTitleSuccess']),
		btnTitleCancel: state.modal.getIn([MODAL_CONFIRM, 'btnTitleCancel']),
	}),
	(dispatch) => ({
		closeModal: () => dispatch(ModalActions.closeModal(MODAL_CONFIRM)),
	}),
)(ModalConfirm);
