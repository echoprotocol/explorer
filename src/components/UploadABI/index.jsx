import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Router from 'next/router';

import BackwardIcon from '../BackwardIcon';
import URLHelper from '../../helpers/URLHelper';
import { CONTRACT_ABI, SSR_CONTRACT_DETAILS_PATH } from '../../constants/RouterConstants';
import FormatHelper from '../../helpers/FormatHelper';
import { ContractIcon } from '../Contract/ContractIcon';

const CodeMirror = dynamic(() => import('../CodeMirror').then((component) => component.Controlled), {
	ssr: false,
});

class UploadABI extends React.Component {

	constructor(props) {
		super(props);

		this.uploadFile = this.uploadFile.bind(this);
	}

	async componentDidMount() {
		const { abi, verified, router: { query: { id } } } = this.props;
		await this.props.getContractInfo(id);

		this.props.setFormAbi(abi);

		if (verified) {
			Router.push(SSR_CONTRACT_DETAILS_PATH, URLHelper.createContractUrl(id, CONTRACT_ABI));
		}
	}

	onBack(e, id) {
		e.preventDefault();
		Router.push(SSR_CONTRACT_DETAILS_PATH, URLHelper.createContractUrl(id, CONTRACT_ABI));
	}

	uploadFile(event) {
		const file = event.target.files[0];

		if (file) {
			const data = new FileReader();
			data.onload = async (e) => {
				this.props.setFormAbi(FormatHelper.formatAbi(JSON.parse(e.target.result)));
			};
			data.readAsText(file);
		}

		event.target.value = null;
	}

	render() {
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};
		const {
			router: { query: { id } }, abiInput, abi, icon,
		} = this.props;

		return (
			<div className="inner-information-container inner-page">
				<div className="backwards">
					<a
						href=""
						className="backwards-link"
						onClick={(e) => this.onBack(e, id)}
					>
						<BackwardIcon />
					</a>
					<div className="account-page-t-block">

						<div className="icon">
							<ContractIcon icon={icon} />
						</div>

						<div className="title">{`Contract ${id} — Upload ABI`}</div>
					</div>
				</div>

				<div className="page-helper-section">
					<div className="section-description">
						You can upload ABI while contract is not yet verified. All the methods should be in contract.
					</div>
					<div className="code-action">
						<div className="action-button-wrap">
							<label
								className="action-button"
								htmlFor="upload-abi"
							>
								Upload new ABI
							</label>
							<input
								type="file"
								name="upload-abi"
								id="upload-abi"
								className="hidden"
								onChange={this.uploadFile}
								accept=".json"
							/>
						</div>
						<span className="action-description">or copy/past contract code in textarea</span>
					</div>

					<div className="code-block">
						<CodeMirror
							value={abiInput.value}
							options={CODEMIRROR_OPTIONS}
							onBeforeChange={(editor, data, value) => {
								this.props.setFormAbi(value);
							}}
						/>
					</div>
				</div>

				<div className="buttons-wrap">
					<button
						className="decline-button"
						onClick={() => Router.push(CONTRACT_ABI, URLHelper.createContractUrl(id, CONTRACT_ABI))}
					>
						Cancel
					</button>
					<button
						disabled={abiInput.value === abi}
						className="approve-button"
						onClick={() => this.props.approve(id, abiInput.value)}
					>
						Save Changes
					</button>
				</div>
			</div>
		);
	}

}

UploadABI.propTypes = {
	abiInput: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
	abi: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	verified: PropTypes.bool.isRequired,
	approve: PropTypes.func.isRequired,
	setFormAbi: PropTypes.func.isRequired,
	getContractInfo: PropTypes.func.isRequired,
};

UploadABI.defaultProps = {};

export default UploadABI;
