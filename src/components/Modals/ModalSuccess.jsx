import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ModalBase from './ModalBase';
import check from '../../assets/images/icons/check.svg';

class ModalSuccess extends React.PureComponent {

	render() {
		return (
			<ModalBase onClose={() => this.props.onClose()} >
				<section className={classnames('modal', 'modal-success')}>
					<div className="modal-header">
						<img className="icon" src={check} alt="check" />
					</div>
					<div className="modal-body">
						<p className="title">
							{this.props.title}
						</p>
					</div>
					<div className="modal-footer">
						<p>
							<button className="btn-modal-close" onClick={() => this.props.onClose()}><span>Return to contract</span></button>
						</p>
					</div>
				</section>
			</ModalBase>
		);
	}

}

ModalSuccess.propTypes = {
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
};

ModalSuccess.defaultProps = {
	title: 'Form veryfied',
};


export default ModalSuccess;
