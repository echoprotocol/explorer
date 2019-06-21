import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import BackwardIcon from '../BackwardIcon';
import contractIcon from '../../assets/images/temp/avatar.png';

require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class UploadABI extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ABI:
			`










            `,
		};
	}

	render() {
		const { ABI } = this.state;
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};

		return (
			<div className="table-container inner-information-container inner-page with-d-table">
				<div className="backwards">
					<a
						href=""
						className="backwards-link"
						onClick={(e) => { e.preventDefault(); }}
					>
						<BackwardIcon />
					</a>
					<div className="account-page-t-block">

						<div className="icon">
							<img src={contractIcon} alt="" />
						</div>

						<div className="title">Contract 1.16.1231 — Upload ABI</div>
					</div>
				</div>

				<div className="page-helper-section">
					<div className="section-description">
                        You can upload ABI while contract is not yet verified. All the methods should be in contract.
					</div>
					<div className="code-action">
						<div className="action-button-wrap">
							<label className="action-button" htmlFor="upload-abi">Upload new ABI</label>
						</div>
						<span className="action-description">or copy/past contract code in textarea</span>
					</div>

					<div className="code-block">
						<CodeMirror
							value={ABI}
							options={CODEMIRROR_OPTIONS}
							onBeforeChange={(editor, data, value) => {
								this.setState({ ABI: value });
							}}
						/>
					</div>
				</div>

				<div className="buttons-wrap">
					<button className="decline-button">Cancel</button>
					<button disabled className="approve-button">Save Changes</button>
				</div>
			</div>
		);
	}

}

UploadABI.propTypes = {};

UploadABI.defaultProps = {};

export default UploadABI;
