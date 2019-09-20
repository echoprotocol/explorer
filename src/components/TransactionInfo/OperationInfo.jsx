import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import copy from 'copy-to-clipboard';
import { validators } from 'echojs-lib';
import classnames from 'classnames';

import directionIcon from '../../assets/images/icons/direction-icon.svg';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

import { BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { BYTECODE_SYMBOLS_LENGTH } from '../../constants/GlobalConstants';

import Avatar from '../Avatar';

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

	renderInternal(operations) {
		return (
			<div className="token-transfer-table">
				{
					operations.map((op, index) => (
						<div className="tt-row" key={index.toString()}>
							<div className="tt-col amount">
								<span className="value">{FormatHelper.formatAmount(op.value.amount, op.value.precision)}</span>
								<span className="currency">{op.value.symbol}</span>
							</div>
							<div className="tt-col">
								<div className="transfer-direction">
									<Link className="avatar-wrap" to={URLHelper.createUrlById(op.from.id)}>
										<Avatar accountName={op.from.name} />
										<span>{op.from.name}</span>
									</Link>
									<img src={directionIcon} alt="" className="direction" />
									<Link className="avatar-wrap" to={URLHelper.createUrlById(op.subject.id)}>
										{ op.subject.name ? <Avatar accountName={op.subject.name} /> : null }
										<span>{op.subject.name || op.subject.id}</span>
									</Link>
								</div>
							</div>
						</div>
					))
				}
			</div>
		);
	}

	renderContractLogs(logs) {
		const { showLogs } = this.state;
		const formattedLogs = logs.map((log, index) => (
			<div className="mono" key={log.data}>
				<div className="mono-bold">Log [{index}]:</div>
				<div className="mono-bold">Contract: <Link to={URLHelper.createUrlById(log.contract)}>{log.contract}</Link></div>
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

	renderOperationRowValue(key, value, index) {
		if (key === 'token transfers') {
			return this.renderInternal(value);
		}

		if (typeof value === 'object' && key !== 'logs') {
			if (!value.link) {
				value = FormatHelper.formatAmount(value.amount, value.precision, value.symbol);
			} else {
				const isAccount = validators.isAccountId(value.link);
				value = (
					<Link className={classnames({ 'avatar-wrap': isAccount })} to={URLHelper.createUrlById(value.link)}>
						{validators.isAccountId(value.link) && <Avatar accountName={value.value} />}
						<span>{value.value}</span>
					</Link>
				);
			}
		}

		if (key === 'block') {
			value = (
				<Link to={BLOCK_INFORMATION_PATH.replace(/:round/, value)} className="blue">
					{FormatHelper.formatAmount(value, 0)}
				</Link>
			);
		}

		if (typeof value === 'number') {
			value = FormatHelper.formatAmount(value, 0);
		}

		if (key === 'logs') {
			return this.renderContractLogs(value);
		}

		if (key.toLowerCase() !== 'bytecode') {
			return value;
		}

		const { loadMore } = this.state;

		const bytecode = value.length > BYTECODE_SYMBOLS_LENGTH && !loadMore[index] ?
			value.slice(0, BYTECODE_SYMBOLS_LENGTH - 3).concat('...') : value;

		return (
			<React.Fragment>
				<div className="mono">{ bytecode }</div>
				{
					(value.length > BYTECODE_SYMBOLS_LENGTH && !loadMore[index]) &&
					<a href="" className="load-more" onClick={(e) => this.onToggleLoadMore(index, e)}>
						{loadMore[index] ? 'Collapse All' : 'Show All'}
					</a>
				}
				<button className="copy-bytecode" onClick={() => copy(value)}>Copy</button>
			</React.Fragment>
		);
	}

	renderInfo() {
		const {
			details, index, block, transaction,
		} = this.props;
		const opKey = `${details.type}_${index}`;
		const transactionUrl = URLHelper.createTransactionUrl(block, transaction + 1);

		return (
			<React.Fragment>
				{
					Object.entries(details).map(([key, value]) => (
						key === 'Fee' ?
							<Media query="(max-width: 1000px)" key={`${opKey}_${key}_media`}>
								{
									(matches) =>
										(matches &&
										<div className="od-row" key={`${opKey}_${key}`}>
											<div className="od-col">{key}:</div>
											<div className="od-col">
												{this.renderOperationRowValue(key, value, index)}
											</div>
										</div>)
								}
							</Media> :
							<div className="od-row" key={`${opKey}_${key}`} >
								<div className="od-col">{key}:</div>
								<div className="od-col">
									{this.renderOperationRowValue(key, value, index)}
								</div>
							</div>
					))
				}
				<div className="od-row">
					<div className="od-col">TRANSACTION:</div>
					<div className="od-col">
						<Link to={transactionUrl}>{`${window.location.origin}${transactionUrl}`}</Link>
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


OperationInfo.propTypes = {
	details: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	block: PropTypes.string.isRequired,
	transaction: PropTypes.number.isRequired,
};

export default OperationInfo;
