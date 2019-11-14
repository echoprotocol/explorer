import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

import { MAX_KB_CONTRACT_ICON, MAX_LENGTH_CONTRACT_DESCRIPTION } from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';
import { BridgeService } from '../../services/BridgeService';

import BackwardIcon from '../BackwardIcon';
import Avatar from '../Avatar';
import { ContractIcon } from '../Contract/ContractIcon';
import contractIconDefault from '../../assets/images/icons/default-icn.svg';
import bridge from '../../assets/images/icons/bridge-logo.svg';

class ManageContract extends React.Component {

	constructor(props) {
		super(props);

		this.onSave = this.onSave.bind(this);
		this.removeIcon = this.removeIcon.bind(this);
	}

	componentDidMount() {
		this.initData();
	}

	componentWillUnmount() {
		BridgeService.unsubscribeSwitchAccount(this.props.setActiveAccount);
	}

	async onSave() {
		const { match: { params: { id } } } = this.props;
		const { name, icon, description } = this.props;

		this.props.manageContract(id, name.value, icon.value, description.value);
	}

	onChange(field, value) {
		this.props.setFormValue(field, value);
		this.props.validateContract(field, value);
		this.props.checkValidateForm();
	}

	onChangeIcon(value) {
		this.props.validateContract('icon', value);
		this.props.setContractIcon(value);
	}

	removeIcon() {
		this.props.clearByField('icon');
		this.props.clearByField('iconBase64');
		this.props.checkChangesForm();
		this.props.checkValidateForm();
	}

	goBack(e, id) {
		e.preventDefault();
		if (!this.props.historyLength) {
			this.props.history.push(URLHelper.createContractUrl(id));
		} else {
			this.props.history.goBack();
		}
	}

	async initData() {
		BridgeService.subscribeSwitchAccount(this.props.setActiveAccount);
		this.props.loadActiveAccount();
		await this.props.getContractInfo();
		this.props.setDefaultDateContract();
	}

	render() {
		const {
			match: { params: { id } }, owner, name, description, icon, contractIcon, isChangedForm, isErrorForm, iconBase64,
		} = this.props;
		const defaultIcon = iconBase64.value || contractIconDefault;
		return (
			<div className="table-container inner-information-container inner-page with-d-table">
				<div className="backwards">
					<a
						href=""
						className="backwards-link"
						onClick={(e) => this.goBack(e, id)}
					>
						<BackwardIcon />
					</a>
					<div className="account-page-t-block">

						<div className="icon">
							<ContractIcon icon={contractIcon} />
						</div>

						<div className="title">Manage contract { id }</div>
					</div>
				</div>

				<div className="page-helper-section">
					<div className="page-helper-info">
						<div className="content">
							<span className="plain-text">Only {' '}</span>
							<span className="no-wrap">
								<Avatar accountName={owner.get('name')} />
								<Link className="link" to={URLHelper.createAccountUrl(owner.get('name'))} >{owner.get('name')}</Link>
							</span>
							<span className="plain-text">
								{' '} can manage this contract.
							Before updating contract info you need to verify your authority via {' '}
							</span>
							<span className="no-wrap">
								<a href="" className="link">Bridge</a>{' '}
								<span className="bridge-logo">
									<img src={bridge} alt="" />
								</span>
							</span>
						</div>
					</div>
					<div className="form">
						<div className="row">
							<div className="field-label">Contract name:</div>
							<div className="field-wrap">
								<div className="field">
									<input placeholder="Contract name" value={name.value} type="text" onChange={(e) => this.onChange('name', e.target.value)} />
									{
										name.error && <div className="error">{name.error}</div>
									}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="field-label">Contract description:</div>
							<div className="field-wrap">
								<div className="field">
									<textarea placeholder="Contract description" value={description.value} onChange={(e) => this.onChange('description', e.target.value)} />
									{
										description.error && <div className="error">{description.error}</div>
									}

								</div>
								{description.value && <div className="hint">{`${description.value.length} of ${MAX_LENGTH_CONTRACT_DESCRIPTION} symbols used`}</div>}
							</div>
						</div>
						<div className="row">
							<div className="field-label">Contract icon:</div>
							<div className="field-wrap">
								<div className="field">
									<div className="drop-area-wrap">
										<Dropzone accept="image/png, image/jpeg" onDrop={(acceptedFiles) => this.onChangeIcon(acceptedFiles[0])}>
											{({ getRootProps, getInputProps }) => (
												<div className="drop-area" {...getRootProps()}>
													<input {...getInputProps()} />
													<span className="image-preview">
														{typeof icon.value === 'string' && icon.value !== '' && !icon.error ?
															<ContractIcon icon={contractIcon} />
															: <img src={defaultIcon} alt="" />}
													</span>
													<div className="info">
														<div className="action-description">Drop file here or click to add file</div>
														<div className="file-description">{`.JPG, JPEG or .PNG formats. ${MAX_KB_CONTRACT_ICON} Kb max`}</div>
													</div>
												</div>
											)}
										</Dropzone>
										{
											icon.error && <div className={classnames('error', 'error-icon')}>{icon.error}</div>
										}
										<button className="text-button blue" onClick={() => this.removeIcon()}>Remove icon</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="buttons-wrap">
					<button className="decline-button" onClick={(e) => this.goBack(e, id)}>Close</button>
					<button
						onClick={() => this.onSave()}
						disabled={isErrorForm || !isChangedForm}
						className="approve-button"
					>Save Changes
					</button>
				</div>
			</div>
		);
	}

}

ManageContract.propTypes = {
	match: PropTypes.object.isRequired,
	iconBase64: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	owner: PropTypes.object,
	validateContract: PropTypes.func.isRequired,
	setFormValue: PropTypes.func.isRequired,
	manageContract: PropTypes.func.isRequired,
	setContractIcon: PropTypes.func.isRequired,
	setDefaultDateContract: PropTypes.func.isRequired,
	clearByField: PropTypes.func.isRequired,
	setActiveAccount: PropTypes.func.isRequired,
	loadActiveAccount: PropTypes.func.isRequired,
	checkValidateForm: PropTypes.func.isRequired,
	checkChangesForm: PropTypes.func.isRequired,
	getContractInfo: PropTypes.func.isRequired,
	activeAccount: PropTypes.object,
	name: PropTypes.object.isRequired,
	description: PropTypes.object.isRequired,
	icon: PropTypes.object.isRequired,
	contractIcon: PropTypes.string.isRequired,
	isErrorForm: PropTypes.bool,
	isChangedForm: PropTypes.bool,
	historyLength: PropTypes.number.isRequired,
};

ManageContract.defaultProps = {
	owner: new Map(),
	isChangedForm: false,
	isErrorForm: false,
	activeAccount: null,
};

export default ManageContract;
