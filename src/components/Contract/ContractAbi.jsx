import React from 'react';
import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { setAbi } from '../../api/ContractApi';

require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class ContractAbi extends React.Component {

	uploadFile(event) {
		const file = event.target.files[0];

		if (file) {
			const data = new FileReader();
			data.onload = (e) => {
				setAbi('1.14.13', JSON.parse(e.target.result));
			};
			data.readAsText(file);
		}
	}

	renderWhithoutABI() {
		return (
			<React.Fragment>
				<div className="abi-info">
					Please, be aware. This contract has not been verified. <span className="warn"> ABI can not be fully trusted.</span>
				</div>
				<div className="action-button-wrap">
					<label className="action-button" htmlFor="upload-abi">Upload ABI</label>
				</div>
			</React.Fragment>
		);
	}
	renderWithABI() {
		const { abi } = this.props;
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};
		return (
			<React.Fragment>

				<div className="abi-info">
					Please, be aware. This contract has not been verified. <span className="warn"> ABI can not be fully trusted.</span>
				</div>

				<div className="line">
					<div className="action-button-wrap">
						<label className="action-button" htmlFor="upload-abi">Upload new ABI</label>
					</div>
					<button className="copy-button">Copy code</button>
				</div>

				{/* If code-block readonly add class uncontrolled */}
				<div className="code-block uncontrolled">
					<CodeMirror
						value={abi.toJS().toString()}
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
				<input
					type="file"
					name="upload-abi"
					id="upload-abi"
					className="hidden"
					onChange={this.uploadFile}
				/>

				{
					abi ? this.renderWithABI() : this.renderWhithoutABI()
				}


			</div>
		);
	}

}

ContractAbi.propTypes = {
	abi: PropTypes.object.isRequired,
};

export default ContractAbi;
