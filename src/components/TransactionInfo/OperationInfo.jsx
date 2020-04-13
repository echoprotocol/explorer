import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Media from 'react-media';
import copy from 'copy-to-clipboard';
import { validators } from 'echojs-lib';
import classnames from 'classnames';
import BN from 'bignumber.js';
import Tooltip from 'rc-tooltip';

import directionIcon from '../../public/images/icons/direction-icon.svg';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

import {
	BLOCK_INFORMATION_PATH,
	SSR_ASSET_PATH,
	SSR_BLOCK_INFORMATION_PATH,
	SSR_CONTRACT_PATH, SSR_TRANSACTION_INFORMATION_PATH,
} from '../../constants/RouterConstants';
import { BYTECODE_SYMBOLS_LENGTH } from '../../constants/GlobalConstants';

import Avatar from '../Avatar';
import SsrHrefHelper from '../../helpers/SsrHrefHelper';

class OperationInfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loadMore: [],
			showLogs: false,
		};
	}


	onToggleLoadMore(index, e) {
		e.preventDefault();

		const { loadMore } = this.state;
		loadMore[index] = !loadMore[index];
		this.setState({ loadMore });
	}

	renderSingleInternal(op, index) {
		const { precision, amount: amountData } = op.value;
		const amount = new BN(amountData).div(10 ** precision).toString(10);
		return (
			<div className="tt-row token-transfer-table" key={index.toString()}>
				<div className="tt-col amount">
					<span className="value">
						<Tooltip
							placement="top"
							overlayClassName="verify-contract-tooltip"
							trigger={['hover']}
							overlay={amount}
						>
							<span className="txt">{amount}</span>
						</Tooltip>
					</span>
					<span className="currency">{op.value.symbol}</span>
				</div>
				<div className="tt-col">
					<div className="transfer-direction">
						<Link href={SsrHrefHelper.getHrefByObjectId(op.from.id)} as={URLHelper.createUrlById(op.from.id)}>
							<div className="avatar-wrap link">
								{op.from.name && <Avatar accountName={op.from.name} />}
								<span className="blue">{op.from.name || op.from.id}</span>
							</div>
						</Link>
						{(op.subject.name || op.subject.id) && <img src={directionIcon} alt="" className="direction" />}
						<Link href={SsrHrefHelper.getHrefByObjectId(op.subject.id)} as={URLHelper.createUrlById(op.subject.id)}>
							<div className="avatar-wrap link">
								{op.subject.name && <Avatar accountName={op.subject.name} />}
								<span className="blue">{op.subject.name || op.subject.id}</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	renderContractLogs(logs) {
		const { showLogs } = this.state;
		const formattedLogs = logs.map((log, index) => (
			<div className="mono" key={log.data}>
				<div className="mono-bold">Log [{index}]:</div>
				<div className="mono-bold">Contract: <Link href={SSR_CONTRACT_PATH} as={URLHelper.createUrlById(log.contract)}><a>{log.contract}</a></Link></div>
				<div className="mono-bold">Topics:</div>
				{log.topics.map((topic, i) => (<div key={topic}>[{i}]:{topic}</div>))}
				<div className="mono-bold">Data:</div>
				<div>{log.data}</div>
			</div>
		));

		return (
			<React.Fragment>
				{
					formattedLogs.length > 1 && !showLogs ? formattedLogs[0] : formattedLogs
				}
				{
					(formattedLogs.length > 1 && !showLogs) &&
					<button className="text-button" onClick={() => this.setState({ showLogs: true })}>View full log</button>
				}
			</React.Fragment>
		);
	}

	renderOperationRowKey(key, value, index, type) {
		return (
			<React.Fragment>
				{key === 'registrar' && type === 'Contract call' ? 'tx sender' : key}:
			</React.Fragment>
		);
	}

	renderOperationRowValue(key, value, index) {
		const { objId, isMobile } = this.props;
		const valueAmount = FormatHelper.formatAmount(value.amount, value.precision, value.symbol);
		const [amount, amountName] = valueAmount.split(' ');

		if (typeof value === 'object' && key !== 'logs') {
			if (!value.link) {
				value = (
					<Media query="(max-width: 300px)" defaultMatches={isMobile}>
						{(matches) =>
							(matches ? (
								<Tooltip
									placement="top"
									overlayClassName="verify-contract-tooltip"
									trigger={['hover']}
									overlay={valueAmount}
								>
									<div className="val">
										<div className="txt">{amount}&nbsp;</div>
										<div className="txt2">{amountName}</div>
									</div>
								</Tooltip>
							) : (
								<span>{valueAmount}</span>
							))
						}
					</Media>
				);
			} else {
				const isAccount = validators.isAccountId(value.link);

				value = (
					<Link href={SsrHrefHelper.getHrefByObjectId(value.link)} as={URLHelper.createUrlById(value.link)}>
						<div className={classnames('link', { 'avatar-wrap': isAccount })}>
							{validators.isAccountId(value.link) && <Avatar accountName={value.value} />}
							<span className="blue">{value.value}</span>
						</div>
					</Link>
				);
			}
		}

		if (key === 'block') {
			value = (
				<Link href={SSR_BLOCK_INFORMATION_PATH} as={BLOCK_INFORMATION_PATH.replace(/:round/, value)} >
					<a className="blue">{FormatHelper.formatAmount(value, 0)}</a>
				</Link>
			);
		}

		if (typeof value === 'number') {
			value = FormatHelper.formatAmount(value, 0);
		}

		if (key === 'logs') {
			return this.renderContractLogs(value);
		}

		if (key === 'symbol') {
			return (
				<Link href={SSR_ASSET_PATH} as={URLHelper.createUrlById(objId)}>
					<a>{value}</a>
				</Link>
			);
		}

		if (key === 'asset_to_issue') {
			return (
				<React.Fragment>
					{amount}&nbsp;
					<Link href={SSR_ASSET_PATH} as={URLHelper.createUrlById(objId)}>
						<a>{amountName}</a>
					</Link>
				</React.Fragment>
			);
		}

		if (key.toLowerCase() !== 'bytecode') {
			return value;
		}

		const { loadMore } = this.state;

		const bytecode = value.length > BYTECODE_SYMBOLS_LENGTH && !loadMore[index] ?
			value.slice(0, BYTECODE_SYMBOLS_LENGTH - 3).concat('...') : value;

		return (
			<React.Fragment>
				<div className="mono">{bytecode}</div>
				{
					(value.length > BYTECODE_SYMBOLS_LENGTH && !loadMore[index]) &&
					<button className="text-button" onClick={(e) => this.onToggleLoadMore(index, e)}>Expand</button>
				}
				<button className="copy-bytecode" onClick={() => copy(value)}>Copy code</button>
			</React.Fragment>
		);
	}

	renderInfo() {
		const {
			details, index, block, transaction, opIndex,
		} = this.props;
		const { type } = details;
		const opKey = `${type}_${index}`;
		const transactionUrl = URLHelper.createTransactionUrl(block, transaction + 1);
		const operationUrl = URLHelper.createTransactionOperationUrl(transactionUrl, opIndex + 1);
		return (
			<React.Fragment>
				{
					Object.entries(details).map(([key, value]) => {

						if (key === 'Fee') {
							return (
								<React.Fragment key={`${opKey}_${key}_media`}>
									<div className="od-row" key={`${opKey}_${key}`}>
										<div className="od-col">{key}:</div>
										<div className="od-col">
											{this.renderOperationRowValue(key, value, index)}
										</div>
									</div>
								</React.Fragment>
							);
						} else if (key === 'token transfers') {
							return (
								value.map((op, internalOpIndex) => (
									<div className="od-row" key={`${opKey}_${key}_${internalOpIndex.toString()}`} >
										<div className="od-col">
											<div
												className="tt-row"
												key={index.toString()}
											>
												{op.label && `${op.label}:`}
											</div>
										</div>
										<div className="od-col">
											{this.renderSingleInternal(op, index)}
										</div>
									</div>
								))
							);
						}
						return (
							<div className="od-row" key={`${opKey}_${key}`} >
								<div className="od-col">
									{this.renderOperationRowKey(key, value, index, type)}
								</div>
								<div className="od-col">
									{this.renderOperationRowValue(key, value, index)}
								</div>
							</div>
						);
					})
				}
				<div className="od-row">
					<div className="od-col">OPERATION:</div>
					<div className="od-col">
						<Link href={SSR_TRANSACTION_INFORMATION_PATH} as={operationUrl}>
							<a>{`${window.location.origin}${operationUrl}`}</a>
						</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div className="fold-operation-info">
				<div className="fold-title">Operation info</div>
				<div className="operation-detail-table">
					{this.renderInfo()}
				</div>
			</div>
		);
	}

}

OperationInfo.defaultProps = {
	objId: '',
};
OperationInfo.propTypes = {
	details: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	block: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	transaction: PropTypes.number.isRequired,
	opIndex: PropTypes.number.isRequired,
	objId: PropTypes.string,
	isMobile: PropTypes.bool.isRequired,
};

export default OperationInfo;
