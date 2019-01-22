import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import { INDEX_PATH, BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { BYTECODE_SYMBOLS_LENGTH } from '../../constants/GlobalConstants';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import BreadCrumbs from '../../components/InformationBreadCrumbs';

class TransactionsInfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loadMore: props.operations.map(() => false),
		};
	}

	componentDidMount() {
		this.props.getTransaction();
	}

	componentWillUnmount() {
		this.props.clearTransaction();
	}

	onToggleLoadMore(index, e) {
		e.preventDefault();

		const { loadMore } = this.state;
		loadMore[index] = !loadMore[index];
		this.setState({ loadMore });
	}

	returnFunction() {
		this.props.history.push(BLOCK_INFORMATION_PATH.replace(/:round/, this.props.match.params.round));
	}

	renderContractLogs(logs) {
		return (
			<div>
				{
					logs.map((log, index) => (
						<span key={log.data}>
							<span><b>Log [{index}]</b>:<br /></span>
							<span>
								<span><b>Contract: </b></span>
								<span>
									<Link to={URLHelper.createUrlById(log.contract)} className="blue">{log.contract}</Link>
									<br />
								</span>
								<span><b>Topics</b><br /></span>
								{log.topics.map((topic, i) => (<span key={topic}>[{i}]: {topic}<br /></span>))}
								<span><b>Data</b><br /></span>
								<span>{log.data}<br /></span>
								<br />
							</span>
						</span>
					))
				}
			</div>
		);
	}

	renderOperationRowValue(key, value, index) {
		if (typeof value === 'object' && key !== 'logs') {
			if (!value.link) {
				value = FormatHelper.formatAmount(value.amount, value.precision, value.symbol);
			} else {
				value = (<Link to={URLHelper.createUrlById(value.link)} className="blue">{value.value}</Link>);
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

		if (key !== 'bytecode') {
			return value;
		}

		const { loadMore } = this.state;

		const bytecode = value.length > BYTECODE_SYMBOLS_LENGTH && !loadMore[index] ?
			value.slice(0, BYTECODE_SYMBOLS_LENGTH - 3).concat('...') : value;

		return (
			<React.Fragment>
				<div className="txt">{ bytecode }</div>
				{
					value.length > BYTECODE_SYMBOLS_LENGTH && !loadMore[index] ?
						<a href="" className="load-more" onClick={(e) => this.onToggleLoadMore(index, e)}>
							{loadMore[index] ? 'Collapse All' : 'Show All'}
						</a> : null
				}
				<button className="copy-bytecode" onClick={() => copy(value)}>Copy</button>
			</React.Fragment>
		);
	}

	renderOperation(operation, index) {
		const opKey = `${operation.type}_${index}`;

		return (
			<div className="transaction-info-table" key={opKey}>
				<div className="operation-title">
					<span className="gray">operation {index + 1}:</span>&nbsp;{operation.type}
				</div>
				<div className="table-help-container">
					{Object.entries(operation).map(([key, value]) => (
						<div
							className={
								classnames(
									'row',
									{ bytecode: ['bytecode', 'logs'].includes(key) },
								)
							}
							key={`${opKey}_${key}`}
						>
							<div className="title">{key}</div>
							<div className="value">
								{this.renderOperationRowValue(key, value, index)}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	render() {
		const { round, index } = this.props.match.params;
		const { operations } = this.props;

		const breadcrumbs = [
			{
				title: 'Block list',
				path: INDEX_PATH,
			},
			{
				title: `Block ${FormatHelper.formatAmount(round, 0)}`,
				path: BLOCK_INFORMATION_PATH.replace(/:round/, round),
			},
		];

		return (
			<React.Fragment>
				<div className="table-container inner-information-container transaction-information">
					<BreadCrumbs
						breadcrumbs={breadcrumbs}
						title={`Transaction ${index} in Block ${FormatHelper.formatAmount(round, 0)}`}
						returnFunction={() => this.returnFunction}
					/>
					{
						operations ?
							operations.map((op, i) => this.renderOperation(op, i)) : null
					}
				</div>
			</React.Fragment>
		);
	}

}

TransactionsInfo.propTypes = {
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	operations: PropTypes.object,
	getTransaction: PropTypes.func.isRequired,
	clearTransaction: PropTypes.func.isRequired,
};

TransactionsInfo.defaultProps = {
	operations: null,
};

export default TransactionsInfo;
