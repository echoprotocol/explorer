import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ModalBase from './ModalBase';
import cross from '../../assets/images/icons/cross.svg';

class ModalError extends React.PureComponent {

	render() {

		return (
			<ModalBase onClose={() => this.props.onClose()} >
				<section className={classnames('modal', 'modal-error')}>
					<div className="modal-header">
						<img className="icon" src={cross} alt="error" />
					</div>
					<div className="modal-body">
						<p className="title">
							{this.props.title}
						</p>
					</div>
					<div className="modal-footer">
						<p>
							<button className="btn-modal-close" onClick={() => this.props.onClose()}><span>Return</span></button>
						</p>
					</div>
				</section>
			</ModalBase>
		);
	}

}


ModalError.propTypes = {
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
};


ModalError.defaultProps = {
	title: 'Unable to verify contract',
};

export default ModalError;
