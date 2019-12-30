import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Select, Input, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import BackwardIcon from '../BackwardIcon';
import verifyIcon from '../../assets/images/icons/verify-icn.svg';
import URLHelper from '../../helpers/URLHelper';
import { KEY_CODES } from '../../constants/GlobalConstants';

require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class VerifyContract extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loader: false,
			timeout: null,
			timer: 0,
		};

		this.backwards = React.createRef();
		this.checkboxEVM = React.createRef();
		this.intervalId = 0;
	}
	componentDidMount() {
		this.props.contractCompilerInit();

		const { verified, match: { params: { id } } } = this.props;

		if (verified) {
			this.props.history.push(URLHelper.createContractUrl(id));
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { form, progress } = this.props;
		const { form: nextForm, progress: nextProgress } = nextProps;
		const { timeout, loader, timer } = this.state;
		const { timeout: nextTimeout, loader: nextLoader } = nextState;

		if (timer > 5 && progress !== nextProgress) return true;

		return !(form.get('code') !== nextForm.get('code') || timeout !== nextTimeout || (loader === nextLoader && nextLoader));
	}

	componentDidUpdate(prevProps) {
		const { form } = this.props;
		const { form: prevForm } = prevProps;

		if (form.get('contractName') !== prevForm.get('contractName')) {
			this.props.updateConstructorParamsForm();
		}
	}

	componentWillUnmount() {
		this.props.clear();
	}

	async onChangeCompiler(e) {
		if (!e.target.textContent) {
			return;
		}
		this.setState({ loader: true });
		this.intervalId = setInterval(() => {
			this.setState({ timer: this.state.timer += 1 });
		}, 1000);
		await this.props.changeContractCompiler(e.target.textContent);
		this.setState({
			loader: false,
			timer: 0,
		});
		clearInterval(this.intervalId);
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

	onContractCodeCompile(code, name) {
		const { form } = this.props;
		if (code === form.get('code')) {
			return;
		}
		this.props.setValue('code', code);
		if (code) {
			setTimeout(() => {
				this.setState({ loader: true });
			}, 0);
		}

		const { timeout } = this.state;
		if (timeout) {
			clearTimeout(timeout);
		}

		this.setState({
			timeout: setTimeout(async () => {
				await this.props.contractCodeCompile(code, name);
				setTimeout(() => {
					this.setState({ loader: false });
				}, 0);
			}, 600),
		});
	}

	onApprove(id) {
		this.props.contractVerifyApprove(id);
	}
	onKeyDown(e) {
		if (e.shiftKey && e.which === KEY_CODES.TAB_CODE) {
			e.preventDefault();
			this.backwards.current.focus();
			return;
		}
		if (e.which === KEY_CODES.TAB_CODE) {
			e.preventDefault();
			this.checkboxEVM.current.focus();
		}
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

		const contractsToShow = [];
		contracts.forEach((properties, name) => {
			contractsToShow.push({
				key: name,
				value: name,
				text: name,
			});
		});
		return contractsToShow;
	}

	goBack(e, id) {
		e.preventDefault();
		if (!this.props.historyLength) {
			this.props.history.push(URLHelper.createContractUrl(id));
		} else {
			this.props.history.goBack();
		}
	}

	isDisabled() {
		const { form } = this.props;
		const { loader } = this.state;

		return form.get('currentCompiler').error
			|| form.get('contractInputs').some((input) => input.error)
			|| !form.get('code')
			|| form.get('loading')
			|| loader;
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

	showLoader(loader) {
		const { progress	} = this.props;

		if (loader && this.state.timer > 5) {
			return <div className="progress-render">{`${progress}%`}</div>;
		}

		if (loader) {
			return <div className="blue-loader" />;
		}

		return null;
	}

	render() {
		const {
			match: { params: { id } }, form, contracts,
		} = this.props;
		const { loader } = this.state;
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
			readOnly: form.get('loading'),
		};

		return (
			<div className="table-container inner-information-container inner-page with-d-table verify-contract">
				<div className="backwards">
					<a
						href=""
						className="backwards-link"
						onClick={(e) => this.goBack(e, id)}
						ref={this.backwards}
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
								disabled={form.get('loading')}
							/>
						</div>
						<span className="action-description">or copy/past contract code in textarea</span>
						{this.showLoader(loader)}
					</div>

					<div className="code-block">
						<CodeMirror
							value={form.get('code')}
							options={CODEMIRROR_OPTIONS}
							onKeyDown={(editor, e) => this.onKeyDown(e)}
							onChange={(editor, metadata, value) => this.onContractCodeCompile(value)}
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
										<input
											ref={this.checkboxEVM}
											name="testCheckbox"
											type="radio"
											defaultChecked
										/>
										<div className="radio-button-icon" />
										<div className="radio-button-text">EVM</div>
									</label>
								</div>
								<div className="radio-button">
									<label>
										<input
											name="testCheckbox"
											type="radio"
										/>
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
										className="compiler"
										placeholder="Select compiler"
										options={this.getCompilersOptions()}
										value={form.get('currentCompiler').value}
										search
										selection
										onChange={(e) => this.onChangeCompiler(e)}
										disabled={form.get('loading')}
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
										className="compiler"
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
						onClick={(e) => this.goBack(e, id)}
						disabled={form.get('loading')}
					>
						Close
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
	historyLength: PropTypes.number,
	form: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	compilersList: PropTypes.object.isRequired,
	contracts: PropTypes.object.isRequired,
	verified: PropTypes.bool.isRequired,
	setValue: PropTypes.func.isRequired,
	setInFormValue: PropTypes.func.isRequired,
	clear: PropTypes.func.isRequired,
	contractCodeCompile: PropTypes.func.isRequired,
	contractCompilerInit: PropTypes.func.isRequired,
	changeContractCompiler: PropTypes.func.isRequired,
	contractVerifyApprove: PropTypes.func.isRequired,
	updateConstructorParamsForm: PropTypes.func.isRequired,
	progress: PropTypes.number,
};

VerifyContract.defaultProps = {
	historyLength: 0,
	progress: 0,
};

export default VerifyContract;
