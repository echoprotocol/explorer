import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Select, Input, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BackwardIcon from '../BackwardIcon';
import verifyIcon from '../../assets/images/icons/verify-icn.svg';
import URLHelper from '../../helpers/URLHelper';

require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class VerifyContract extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loader: false,
			requestLoading: false,
		};
	}

	componentDidMount() {
		this.props.contractCompilerInit();

		const { verified, match: { params: { id } } } = this.props;

		if (verified) {
			this.props.history.push(URLHelper.createContractUrl(id));
		}
	}

	componentDidUpdate(prevProps) {
		const { form } = this.props;
		const { form: prevForm } = prevProps;

		if (form.get('contractName') !== prevForm.get('contractName')) {
			this.props.updateConstructorParamsForm();
		}
	}

	async onChangeCompiler(e) {
		if (!e.target.textContent) {
			return;
		}
		this.setState({ loader: true });
		await this.props.changeContractCompiler(e.target.textContent);
		this.setState({ loader: false });
	}

	onChangeContract(e) {
		const { contracts } = this.props;

		if (!e.target.textContent || ![...contracts.keys()].includes(e.target.textContent)) {
			return;
		}
		this.props.setValue('contractName', e.target.textContent);
	}

	onInput(e, name) {
		this.props.setInFormValue(['contractInputs', name], e.target.value);
	}

	onBack(e, id) {
		e.preventDefault();
		this.props.history.push(URLHelper.createContractUrl(id));
	}

	onCodeChange(code) {
		this.setState({ loader: true });
		this.props.setValue('code', code);
	}

	async onContractCodeCompile(code, name) {
		this.setState({ loader: true });
		await this.props.contractCodeCompile(code, name);
		this.setState({ loader: false });
	}

	async onApprove(id) {
		this.setState({ requestLoading: true });
		await this.props.contractVerifyApprove(id);
		this.setState({ requestLoading: false });
	}

	getCompilersOptions() {
		const { compilersList } = this.props;

		if (!compilersList.size || !compilersList.get('builds')) {
			return [];
		}

		return compilersList.get('builds').map((build) => ({
			key: build.get('longVersion'),
			value: build.get('longVersion'),
			text: build.get('longVersion'),
		})).toArray();
	}

	getContractsOptions() {
		const { contracts } = this.props;

		return contracts.map((properties, name) => ({
			key: name,
			value: name,
			text: name,
		})).toArray();
	}

	isDisabled() {
		const { form } = this.props;
		const { requestLoading } = this.state;

		return form.get('currentCompiler').error
			|| form.get('contractInputs').some((input) => input.error)
			|| !form.get('code')
			|| form.get('loading')
			|| requestLoading;
	}

	uploadFile(event) {
		const file = event.target.files[0];

		if (file) {
			const data = new FileReader();
			data.onload = async (e) => {
				this.onContractCodeCompile(e.target.result, file.name);
			};
			data.readAsText(file);
		}

		event.target.value = null;
	}

	render() {
		const {
			match: { params: { id } }, form, contracts,
		} = this.props;
		const { loader, requestLoading } = this.state;
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
			readOnly: requestLoading,
		};

		return (
			<div className="table-container inner-information-container inner-page with-d-table verify-contract">
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
							<img src={verifyIcon} alt="" />
						</div>
						<div className="title">{`Verify contract ${id}`}</div>
					</div>
				</div>

				<div className="page-helper-section">
					<div className="section-description">
						Upload the source code of your contract. If you have more then one contract, they should be united in one file
					</div>
					<div className="code-action">
						<div className="action-button-wrap">
							<label className="action-button" htmlFor="upload-abi">Select file</label>
							<input
								type="file"
								name="upload-abi"
								id="upload-abi"
								className="hidden"
								onChange={(e) => this.uploadFile(e)}
								accept=".sol"
								disabled={requestLoading}
							/>
						</div>
						<span className="action-description">or copy/past contract code in textarea</span>
						{loader && <div className="blue-loader" />}
					</div>

					<div className="code-block">
						<CodeMirror
							value={form.get('code')}
							options={CODEMIRROR_OPTIONS}
							onBeforeChange={(editor, data, value) => {
								this.onCodeChange(value);
							}}
							onChange={() => this.onContractCodeCompile()}
						/>
					</div>

					<div className="section-description">
						Provide information about contract
					</div>
					<div className="verify-contract-table mb40">
						<div className="row">
							<div className="t-name">Contract type:</div>
							<div className="t-value">
								<div className="radio-button">
									<label>
										<input name="testCheckbox" type="radio" defaultChecked />
										<div className="radio-button-icon" />
										<div className="radio-button-text">EVM</div>
									</label>
								</div>
								<div className="radio-button">
									<label>
										<input name="testCheckbox" type="radio" />
										<div className="radio-button-icon" />
										<div className="radio-button-text">x64</div>
									</label>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="t-name">Compiler version:</div>
							<div className="t-value">
								<div className="select-container">
									<Dropdown
										placeholder="Select compiler"
										options={this.getCompilersOptions()}
										value={form.get('currentCompiler').value}
										search
										selection
										onChange={(e) => this.onChangeCompiler(e)}
										disabled={requestLoading}
									/>
									{form.get('currentCompiler').error && <div className="error-field">{form.get('currentCompiler').error}</div>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="t-name">Contract to compile:</div>
							<div className="t-value">
								<div className="select-container">
									<Select
										placeholder="Select contract"
										value={form.get('contractName')}
										disabled={!contracts.size}
										options={this.getContractsOptions()}
										onChange={(e) => this.onChangeContract(e)}
									/>
								</div>
							</div>
						</div>
					</div>
					{
						form.get('contractInputs').size ?
							<React.Fragment>
								<div className="section-description">Define constructor arguments</div>
								<div className="verify-contract-table">
									{
										form.get('contractInputs').map((input, name) => (
											<div className="row" key={name.toString()}>
												<div className="t-name">{`${name} (${input.type})`}</div>
												<div className="t-value">
													<div className="input-wrapper">
														<Input
															value={input.value}
															onChange={(e) => this.onInput(e, name)}
														/>
														{
															input.error && <div className="error-field">{input.error}</div>
														}
													</div>
												</div>
											</div>
										)).toArray()
									}
								</div>
							</React.Fragment> : null
					}
				</div>

				<div className="buttons-wrap">
					<button
						className="decline-button"
						onClick={(e) => this.onBack(e, id)}
						disabled={requestLoading}
					>
						Cancel
					</button>
					<button
						onClick={() => this.onApprove(id)}
						disabled={this.isDisabled()}
						className="approve-button"
					>
						Verify
					</button>
				</div>
			</div>
		);
	}

}

VerifyContract.propTypes = {
	form: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	compilersList: PropTypes.object.isRequired,
	contracts: PropTypes.object.isRequired,
	verified: PropTypes.bool.isRequired,
	setValue: PropTypes.func.isRequired,
	setInFormValue: PropTypes.func.isRequired,
	contractCodeCompile: PropTypes.func.isRequired,
	contractCompilerInit: PropTypes.func.isRequired,
	changeContractCompiler: PropTypes.func.isRequired,
	contractVerifyApprove: PropTypes.func.isRequired,
	updateConstructorParamsForm: PropTypes.func.isRequired,
};

VerifyContract.defaultProps = {};

export default VerifyContract;
