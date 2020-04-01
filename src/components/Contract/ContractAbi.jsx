import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import Router, { withRouter } from 'next/router';

import URLHelper from '../../helpers/URLHelper';
import { SSR_UPLOAD_ABI_PATH } from '../../constants/RouterConstants';

const CodeMirror = dynamic(() => import('../CodeMirror').then((component) => component.Controlled), {
	ssr: false,
});

class ContractAbi extends React.Component {

	renderWithoutABI() {
		const { id } = this.props;
		return (
			<React.Fragment>
				<div className="abi-info">
					This contract has not been verified but you can upload ABI.
				</div>
				<div className="action-button-wrap">
					<label
						role="presentation"
						className="action-button"
						htmlFor="upload-abi"
						onClick={() => Router.push(SSR_UPLOAD_ABI_PATH, URLHelper.createUploadAbiUrl(id))}
					>
						Upload ABI
					</label>
				</div>
			</React.Fragment>
		);
	}

	renderWithABI() {
		const { id, abi, verified } = this.props;
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};

		return (
			<React.Fragment>

				{
					!verified &&
					<div className="abi-info">
						Please, be aware. This contract has not been verified. <span className="warn"> ABI can not be fully trusted.</span>
					</div>
				}

				<div className="line">
					<div className="action-button-wrap">
						{
							!verified &&
							<label
								role="presentation"
								className="action-button"
								htmlFor="upload-abi"
								onClick={() => Router.push(SSR_UPLOAD_ABI_PATH, URLHelper.createUploadAbiUrl(id))}
							>
								Upload new ABI
							</label>
						}
					</div>
					<button className="copy-button" onClick={() => copy(abi)}>Copy code</button>
				</div>

				{/* If code-block readonly add class uncontrolled  */}
				<div className="code-block uncontrolled">
					<CodeMirror
						value={abi}
						onFocus={(editor) => { editor.refresh(); }}
						options={CODEMIRROR_OPTIONS}
					/>
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { abi } = this.props;
		return (
			<div className="contract-abi-panel">
				{
					abi ? this.renderWithABI() : this.renderWithoutABI()
				}
			</div>
		);
	}

}

ContractAbi.propTypes = {
	id: PropTypes.string.isRequired,
	abi: PropTypes.string.isRequired,
	verified: PropTypes.bool.isRequired,
};

ContractAbi.defaultProps = {};

export default withRouter(ContractAbi);
