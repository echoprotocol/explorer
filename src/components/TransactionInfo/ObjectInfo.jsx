import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import Avatar from '../Avatar';

import {
	accountOperations,
	assetOperations,
	committeeOperations,
	contractOperations,
	proposalOperations,
} from '../../constants/Operations';
import { BYTECODE_SYMBOLS_LENGTH } from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';

class ObjectInfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isExpanded: false,
		};
	}


	toggleBytecode() {
		const { isExpanded } = this.state;
		this.setState({ isExpanded: !isExpanded });
	}

	renderProposalObject() {
		const { object } = this.props;
		const operations = object.get('operations');

		return (
			<React.Fragment>
				<div className="fold-title">Object: proposal</div>
				<div className="operation-detail-table">
					<div className="od-row">
						<div className="od-col">ID:</div>
						<div className="od-col">
							<Link to={URLHelper.createUrlById(object.get('id'))}>{object.get('id')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Expiration time:</div>
						<div className="od-col">{object.get('expirationTime')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Types:</div>
						<div className="od-col">{(operations && operations.join) && operations.join(', ')}</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	renderCommitteeObject() {
		const { object } = this.props;

		return (
			<React.Fragment>
				<div className="fold-title">Object: committee</div>
				<div className="operation-detail-table">
					<div className="od-row">
						<div className="od-col">ID:</div>
						<div className="od-col">
							<Link to={URLHelper.createUrlById(object.get('id'))}>{object.get('id')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Committee member account:</div>
						<div className="od-col">
							<Link to={URLHelper.createAccountUrl(object.get('account'))}>{object.get('account')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Type:</div>
						<div className="od-col">{object.get('votes')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Price to ECHO:</div>
						<div className="od-col">{object.get('url')}</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	renderAssetObject() {
		const { object } = this.props;

		return (
			<React.Fragment>
				<div className="fold-title">Object: asset</div>
				<div className="operation-detail-table">
					<div className="od-row">
						<div className="od-col">ID:</div>
						<div className="od-col">
							<Link to={URLHelper.createUrlById(object.get('id'))}>{object.get('id')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Name:</div>
						<div className="od-col">
							<Link to={URLHelper.createUrlById(object.get('id'))}>{object.get('name')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Type:</div>
						<div className="od-col">{object.get('type')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Price to ECHO:</div>
						<div className="od-col">{object.get('price')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Issuer account:</div>
						<div className="od-col">
							<Link to={URLHelper.createAccountUrl(object.get('issuer'))}>{object.get('issuer')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Precision:</div>
						<div className="od-col">{object.get('precision')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Total supply:</div>
						<div className="od-col">{object.get('totalSupply')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Max supply:</div>
						<div className="od-col">{object.get('maxSupply')}</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	renderAccountObject() {
		const { object } = this.props;

		return (
			<React.Fragment>
				<div className="fold-title">Object: account</div>
				<div className="operation-detail-table">
					<div className="od-row">
						<div className="od-col">ID:</div>
						<div className="od-col">
							<Link to={URLHelper.createUrlById(object.get('id'))}>{object.get('id')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Name:</div>
						<div className="od-col">
							<Link to={URLHelper.createAccountUrl(object.get('name'))}>{object.get('name')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Echorand Key:</div>
						<div className="od-col">{object.get('echorandKey')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">
							{ object.get('activeKeys').length > 1 ?
								'Authority keys:' : 'Authority key:' }
						</div>
						<div className="od-col">
							<div className="authority">
								{
									object.get('activeAccounts').length ?
										<React.Fragment>
											<div className="title">Accounts:</div>
											<ul className="accounts">
												{
													object.get('activeAccounts').map((name) => (
														<li key={name}>
															<Link className="avatar-wrap" to={URLHelper.createAccountUrl(name)}>
																<Avatar accountName={name} />
																<span>{name}</span>
															</Link>
														</li>
													))
												}
											</ul>
										</React.Fragment> : null
								}
								<ul className="keys">
									{
										object.get('activeKeys').map((key) => (
											<li key={key}>{key}</li>
										))
									}
								</ul>
							</div>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Registrar:</div>
						<div className="od-col">
							<Link to={URLHelper.createAccountUrl(object.get('registrar'))}>{object.get('registrar')}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Delegating Account:</div>
						<div className="od-col">
							<Link to={URLHelper.createAccountUrl(object.get('delegating'))}>{object.get('delegating')}</Link>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	renderContractObject() {
		const { isExpanded } = this.state;
		const { details, object } = this.props;

		const contractId = details['contract id'] ? details['contract id'].value : details['new contract id'].value;

		return (
			<React.Fragment>
				<div className="fold-title">Object: contract</div>
				<div className="operation-detail-table">
					<div className="od-row">
						<div className="od-col">ID:</div>
						<div className="od-col">
							<Link to={URLHelper.createUrlById(contractId)}>{contractId}</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Contract type:</div>
						<div className="od-col">{object.get('type') || object.get('erc20') === 'Yes' ? 'ERC20' : '—'}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Supported asset:</div>
						<div className="od-col">{object.get('supportedAsset') || 'None'}</div>
					</div>
					<div className="od-row">
						<div className="od-col">Eth Accuracy:</div>
						<div className="od-col">{object.get('ethAccuracy')}</div>
					</div>
					<div className="od-row">
						<div className="od-col">ERC20:</div>
						<div className="od-col">{object.get('erc20')}</div>
					</div>
					<div className="od-row bytecode">
						<div className="od-col">
							Bytecode:
						</div>
						<div className="od-col">
							<div className="mono">
								{
									object.get('bytecode').length > BYTECODE_SYMBOLS_LENGTH && !isExpanded ?
										`${object.get('bytecode').slice(0, BYTECODE_SYMBOLS_LENGTH - 2)}..` : object.get('bytecode')
								}
							</div>
							{
								object.get('bytecode').length > BYTECODE_SYMBOLS_LENGTH && !isExpanded ?
									<button className="text-button" onClick={() => this.toggleBytecode()}>Expand</button> : null
							}
							<button className="copy-bytecode" onClick={() => copy(object.get('bytecode'))}>Copy code</button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	renderObjectInfo() {
		const { details, object } = this.props;

		if (!object) {
			return null;
		}
		if (!object.size) {
			return null;
		}

		if (accountOperations.includes(details.type)) {
			return this.renderAccountObject();
		}
		if (assetOperations.includes(details.type)) {
			return this.renderAssetObject();
		}
		if (contractOperations.includes(details.type)) {
			return this.renderContractObject();
		}
		if (committeeOperations.includes(details.type)) {
			return this.renderCommitteeObject();
		}
		if (proposalOperations.includes(details.type)) {
			return this.renderProposalObject();
		}

		return null;
	}

	render() {
		return (
			<div className="fold-operation-info">
				{this.renderObjectInfo()}
			</div>
		);
	}

}


ObjectInfo.propTypes = {
	object: PropTypes.object,
	details: PropTypes.object.isRequired,
};

ObjectInfo.defaultProps = {
	object: null,
};

export default ObjectInfo;
