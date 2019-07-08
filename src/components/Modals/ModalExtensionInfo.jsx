import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ModalBase from './ModalBase';
import headerBg from '../../assets/images/modal-ext-header.png';
import config from '../../config/chain';

class ModalExtensionInfo extends React.PureComponent {

	constructor() {
		super();
		this.renderModal = this.renderModal.bind(this);
		this.openBrowserExtensions = this.openBrowserExtensions.bind(this);
	}

	openBrowserExtensions() {
		window.open(config.LANDING_BRIDGE, '_blank');
	}

	renderModal() {

		return (
			<ModalBase onClose={() => this.props.onClose()} >
				<section className={classnames('modal', 'modal-extension')}>
					<div className="modal-header">
						<img src={headerBg} alt="bridge" />
					</div>
					<div className="modal-body">
						<p className="title">
							Bridge is not installed
						</p>
						<p className="text">
							To manage contract you need to verify your <br />
							authority using Bridge (browser extension that  <br />
							allows you make transactions in Echo  <br />
							network). Please install Bridge
						</p>
						<p>
							<button className="link" onClick={this.openBrowserExtensions}>Get chrome extension </button>
						</p>
					</div>
					<div className="modal-footer">
						<p>
							<button className="btn-modal-close" onClick={() => this.props.onClose()}><span>Close</span></button>
						</p>
					</div>
				</section>
			</ModalBase>
		);
	}

	render() {
		return this.renderModal();
	}

}

ModalExtensionInfo.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ModalExtensionInfo;
