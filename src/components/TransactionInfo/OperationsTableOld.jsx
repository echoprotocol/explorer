import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';
import { BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { BYTECODE_SYMBOLS_LENGTH } from '../../constants/GlobalConstants';
import copy from './index';
import Avatar from '../Avatar';

class OperationsTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			collapseOperation: -1,
		};
	}

	showOperationDetails(index) {
		let collapseOperation = -1;

		if (this.state.collapseOperation === -1) {
			collapseOperation = index;
		}

		this.setState({
			collapseOperation,
		});
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

		if (key.toLowerCase() !== 'bytecode') {
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


	renderInfoOperation(operation, index) {
		const opKey = `${operation.type}_${index}`;

		return (
			<div className="transaction-info-table" key={opKey}>
				{/* <div className="transaction-title-operations underline-title"> */}
				{/*	<span>Operation info</span> */}
				{/* </div> */}
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

	renderRowOperation(operation, index) {
		const { mainInfo, ...detailInfo } = operation;

		return (
			<React.Fragment>
				<div className={classnames('divTableRow', { active: this.state.collapseOperation === index })}>
					<div className="divTableCell" >{index + 1}.</div>
					<div className="divTableCell" >{operation.type}</div>
					<div className="divTableCell" >
						<Link to={URLHelper.createAccountUrl(mainInfo.from.name)}>
							<Avatar accountName={mainInfo.from.name} />
							<span>{mainInfo.from.name}</span>
						</Link>
					</div>
					<div className="divTableCell" >
						<Link to={URLHelper.createAccountUrl(mainInfo.subject.name)}>
							{/* <Avatar accountName={operation.subject.name} /> */}
							<span>{mainInfo.subject && mainInfo.subject.name}</span>
						</Link>
					</div>
					<div className="divTableCell" >
						{FormatHelper.formatAmount(mainInfo.value.amount, mainInfo.value.precision)}
						<span className="gray">&#32;{mainInfo.value.symbol}</span>
					</div>
					<div className="divTableCell" >
						{FormatHelper.formatAmount(detailInfo.Fee.amount, detailInfo.Fee.precision)}
						<span className="gray">&#32;{detailInfo.Fee.symbol}</span>
					</div>
					<div className="divTableCell">{mainInfo.result}</div>
					<div className="divTableCell">
						<span>{'{;}'}</span>
					</div>
				</div>

				{this.state.collapseOperation === index && (
					<div className="divTableRow active">
						<div className={classnames('divTableCell', 'operation-info')}>
							{this.renderInfoOperation(detailInfo, index)}
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}

	render() {
		const { operations } = this.props;

		return (
			<div className="table">
				<div className="divTable">
					<div className="TableHeading">
						<div className="divTableCell">#</div>
						<div className="divTableCell">Type</div>
						<div className="divTableCell">Sender</div>
						<div className="divTableCell">Reciever</div>
						<div className="divTableCell">Amount</div>
						<div className="divTableCell">Operation fee</div>
						<div className="divTableCell">Result</div>
						<div className="divTableCell">JSON</div>
						<div className="divTableCell" />
					</div>
					<div className="divider" />
					<div className="divTableBody">
						{operations ? operations.map((op, i) => this.renderRowOperation(op, i)) : null}
					</div>
				</div>
			</div>
		);
	}

}


OperationsTable.propTypes = {
	operations: PropTypes.object.isRequired,
};

export default OperationsTable;
