import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';
import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';
import LoadMoreBtn from '../LoadMoreBtn';


class TransactionsTable extends React.Component {

	renderMobileViewInternalOperation(io, id, key, last) {
		return (
			<div
				key={`${id}_${key}`}
				className={classnames('recent-block-element', 'fade-anim', 'is-subtransfer', { 'is-subtransfer_last': key === last })}
			>
				<div className="subtransfer-type">
					{io.label}
				</div>
				<div className="line-arrow" />
				<div className="container amount">
					<div className="title">Amount</div>
					<div className="value">
						{FormatHelper.formatAmount(io.value.amount, io.value.precision)}
						<span className="gray">{io.value.symbol}</span>
					</div>
				</div>
				<div className="container">
					<div className="title">From</div>
					<div className="value">
						<Link
							to={URLHelper.createUrlById(io.from.id)}
							className="blue"
						>
							{io.from.name || io.from.id}
						</Link>
					</div>
				</div>
				<div className="container">
					<div className="title">To</div>
					<div className="value">
						<Link
							to={URLHelper.createUrlById(io.subject.id)}
							className="blue"
						>
							{io.subject.name || io.subject.id}
						</Link>
					</div>
				</div>
			</div>
		);
	}

	renderMobileViewOperation(data, i, j) {

		const key = data.id || `${i}-${j}`;

		return (
			<React.Fragment key={key} >
				<Link
					to={TRANSACTION_INFORMATION_PATH.replace(/:round/, data.round).replace(/:index/, data.trIndex + 1)}
					className={classnames('recent-block-element', 'fade-anim', { 'with-subtransfer': data.internal && data.internal.length })}
				>

					<div className="container">

						{
							j === 0 &&
							<React.Fragment>
								<div className="title">Time</div>
								<div className="value">{this.props.isBlockTable ? this.props.blockTime : (data.timestamp || i + 1)}</div>
							</React.Fragment>
						}
					</div>
					<div className="container">
						<div className="title">Type</div>
						<div className="value">{data.name}</div>
					</div>
					<div className="container">
						<div className="title">From</div>
						<div className="value"><div className="blue">{data.from.name || data.from.id}</div></div>
					</div>
					<div className="container">
						<div className="title">To</div>
						<div className="value"><div className="blue">{data.subject.name || data.subject.id}</div></div>
					</div>
					<div className="container amount">
						<div className="title">Amount</div>
						<div className="value">
							{data.value.amount && FormatHelper.formatAmount(data.value.amount, data.value.precision)}
							<span className="gray">&#32;{data.value.symbol}</span>
						</div>
					</div>
					<div className="container">
						<div className="title">Fee amount</div>
						<div className="value">
							{FormatHelper.formatAmount(data.fee.amount, data.fee.precision)}
							<span className="gray">&#32;{data.fee.symbol}</span>
						</div>
					</div>
					<div className={`container ${(data.status ? '' : ('fail'))}`}>
						<div className="title">Status</div>
						<div className="value">{data.status ? 'Success' : 'Fail'}</div>
					</div>
				</Link>
				{
					data.internal && data.internal.length ?
						(data.internal.map((io, l) => (
							this.renderMobileViewInternalOperation(io, key, l, data.internal.length - 1)
						))
						) : null
				}
			</React.Fragment>
		);
	}

	renderMobileView(transactions) {
		return (
			<div className="recent-block-mobile-view">
				{transactions.map((operations, i) => operations.map((data, j) => this.renderMobileViewOperation(data, i, j)))}
			</div>
		);
	}

	renderInternalOperation(io, id, key) {
		return (
			<div key={`${id}_${key}`} className="divTableRow  fade-anim">
				<div className="divTableCell" />
				<div className="divTableCell" />
				<div className="divTableCell">
					<Link to={URLHelper.createUrlById(io.from.id)} className="inner-container">
						<div className="blue">{io.from.name || io.from.id}</div>
					</Link>
				</div>
				<div className="divTableCell transaction-to">
					<div className="inner-container">
						<div className="line-arrow" />
						<Link to={URLHelper.createUrlById(io.subject.id)}>
							<div className="blue">{io.subject.name || io.subject.id}</div>
						</Link>
					</div>
				</div>
				<div className="divTableCell">
					<div className="inner-container">
						{FormatHelper.formatAmount(io.value.amount, io.value.precision)}
						<span className="gray">{` ${io.value.symbol}`}</span>
						<div className="subtransfer-type">{io.label}</div>
					</div>
				</div>
				<div className="divTableCell" />
				<div className="divTableCell success" />
			</div>
		);
	}

	renderTableOperation(data, i, j) {

		const key = data.id || `${i}-${j}`;

		return (
			<React.Fragment key={key}>
				<Link
					to={TRANSACTION_INFORMATION_PATH.replace(/:round/, data.round).replace(/:index/, data.trIndex + 1)}
					className="divTableRow fade-anim"
				>
					{
						j === 0 &&
							<div className="divTableCell">{this.props.isBlockTable ? this.props.blockTime : (data.timestamp || i + 1)}</div>
					}
					<div className="divTableCell">{data.name}</div>
					<div className="divTableCell">
						<Link to={URLHelper.createUrlById(data.from.id)} className="inner-container">
							<div className="blue">{data.from.name || data.from.id}</div>
						</Link>
					</div>
					<div className="divTableCell transaction-to">
						<Link to={URLHelper.createUrlById(data.subject.id)} className="inner-container">
							<div className="blue">{data.subject.name || data.subject.id}</div>
						</Link>
					</div>
					<div className="divTableCell">
						{data.value.amount && FormatHelper.formatAmount(data.value.amount, data.value.precision)}
						<span className="gray">&#32;{data.value.symbol}</span>
					</div>
					<div className="divTableCell">
						{FormatHelper.formatAmount(data.fee.amount, data.fee.precision)}
						<span className="gray">&#32;{data.fee.symbol}</span>
					</div>
					<div className={classnames('divTableCell', { fail: !data.status })}>
						{data.status ? 'Success' : 'Fail'}
					</div>
				</Link>
				{
					data.internal && data.internal.length ?
						data.internal.map((io, k) => (
							this.renderInternalOperation(io, key, k)
						)) : null
				}
			</React.Fragment>
		);
	}

	renderTable(transactions) {
		return (
			<React.Fragment>
				<div className={`divTable ${!this.props.loadMore ? 'n-l-more' : ''}`}>
					<div className="divTableBody">
						<div className="TableHeading">
							<div className="divTableCell">Time</div>
							<div className="divTableCell">Type</div>
							<div className="divTableCell">From</div>
							<div className="divTableCell">To</div>
							<div className="divTableCell">Amount</div>
							<div className="divTableCell">Fee amount</div>
							<div className="divTableCell">Status</div>
						</div>
						<div className="divider" />
						{transactions.map((operations, i) => operations.map((data, j) => this.renderTableOperation(data, i, j)))}
					</div>
				</div>
			</React.Fragment>
		);

	}

	render() {
		const {
			transactions, objectId, loading, loadMore, isBlockTable,
		} = this.props;

		const trs = isBlockTable ? transactions.reverse() : transactions;

		return (
			<div className="table">
				<Media query="(max-width: 767px)">
					{(matches) => (
						matches ?
							this.renderMobileView(trs, objectId) :
							this.renderTable(trs, objectId)
					)}
				</Media>
				{
					loadMore ?
						<LoadMoreBtn
							title="Load more transactions"
							loading={loading}
							loadMore={() => this.props.loadMore()}
						/> : null
				}
			</div>
		);
	}

}

TransactionsTable.propTypes = {
	isBlockTable: PropTypes.bool,
	transactions: PropTypes.string.isRequired,
	objectId: PropTypes.string,
	blockTime: PropTypes.string,
	loading: PropTypes.bool,
	loadMore: PropTypes.func,
};

TransactionsTable.defaultProps = {
	isBlockTable: false,
	loading: false,
	blockTime: '',
	loadMore: null,
	objectId: null,
};

export default TransactionsTable;
