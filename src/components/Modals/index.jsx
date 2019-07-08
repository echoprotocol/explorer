import React from 'react';
import PropTypes from 'prop-types';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import { MODAL_EXTENSION_INFO, MODAL_SUCCESS, MODAL_ERROR } from '../../constants/ModalConstants';
import ModalExtensionInfo from '../../components/Modals/ModalExtensionInfo';

class Modals extends React.Component {

	onClose(modal) {
		this.props.closeModal(modal);
	}

	render() {
		const { successForm, errorForm, extensionInfo } = this.props;

		return (
			<React.Fragment>
				{successForm.get('show') &&
				<ModalSuccess
					title={successForm.get('title')}
					onClose={() => this.onClose(MODAL_SUCCESS)}
				/>
				}

				{errorForm.get('show') &&
				<ModalError
					title={errorForm.get('title')}
					onClose={() => this.onClose(MODAL_ERROR)}
				/>
				}

				{extensionInfo.get('show') &&
				<ModalExtensionInfo
					onClose={() => this.onClose(MODAL_EXTENSION_INFO)}
				/>
				}
			</React.Fragment>
		);
	}

}

Modals.propTypes = {
	successForm: PropTypes.object.isRequired,
	errorForm: PropTypes.object.isRequired,
	extensionInfo: PropTypes.object.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default Modals;
