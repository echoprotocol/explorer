import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { KEY_CODES } from '../../constants/GlobalConstants';


class ModalBase extends React.Component {

	constructor(props) {
		super(props);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onCancel() {
		this.props.onClose();
	}

	handleKeyUp(e) {
		if (e.keyCode === KEY_CODES.ESC_CODE) {
			this.onCancel();
		}
	}

	render() {
		return (
			<div role="presentation" className={classnames('modal-overlay')} onClick={this.handleKeyUp} >
				{this.props.children}
			</div>
		);
	}

}

ModalBase.propTypes = {
	onClose: PropTypes.func.isRequired,
	children: PropTypes.object.isRequired,
};

export default ModalBase;
