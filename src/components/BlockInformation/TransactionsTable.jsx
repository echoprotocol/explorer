import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

class TransactionsTable extends React.Component {

	renderMobileViewOperation(data, i, j) {

		return (
			<React.Fragment key={Math.random()} >
				<Link
					to={TRANSACTION_INFORMATION_PATH.replace(/:round/, data.round).replace(/:index/, data.trIndex + 1)}
					className={classnames('recent-block-element', { 'with-subtransfer': data.internal && data.internal.length })}
				>

					<div className="container">

						{
							j === 0 &&
							<React.Fragment>
								<div className="title">#</div>
								<div className="value">{i + 1}</div>
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
							<span className="gray">&nbsp;{data.value.symbol}</span>
						</div>
					</div>
					<div className="container">
						<div className="title">Fee amount</div>
						<div className="value">
							{FormatHelper.formatAmount(data.fee.amount, data.fee.precision)}
							<span className="gray">&nbsp;{data.fee.symbol}</span>
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
							<div
								key={Math.random()}
								className={classnames('recent-block-element', 'is-subtransfer', { 'is-subtransfer_last': l === (data.internal.length - 1) })}
							>
								<div className="subtransfer-type">
									{io.label}
								</div>
								<div className="line-arrow" />
								<div className="container amount">
									<div className="title">Amount</div>
									<div className="value">
										{FormatHelper.formatAmount(data.value.amount, data.value.precision)}
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

	renderTableOperation(data, i, j) {
		return (
			<React.Fragment key={Math.random()}>
				<Link
					to={TRANSACTION_INFORMATION_PATH.replace(/:round/, data.round).replace(/:index/, data.trIndex + 1)}
					className={classnames('divTableRow', { 'with-subtransfer': data.internal && data.internal.length })}
				>
					<div className="divTableCell">{j === 0 ? i + 1 : ''}</div>
					<div className="divTableCell">{data.name}</div>
					<div className="divTableCell">
						<Link to={URLHelper.createUrlById(data.from.id)} className="inner-container">
							<div className="blue">{data.from.name || data.from.id}</div>
						</Link>
					</div>
					<div className="divTableCell transaction-to">
						<Link to={URLHelper.createUrlById(data.subject.id)} className="sub-container">
							<div className="blue">{data.subject.name || data.subject.id}</div>
						</Link>
					</div>
					<div className="divTableCell">
						{data.value.amount && FormatHelper.formatAmount(data.value.amount, data.value.precision)}
						<span className="gray">&nbsp;{data.value.symbol}</span>
					</div>
					<div className="divTableCell">
						{FormatHelper.formatAmount(data.fee.amount, data.fee.precision)}
						<span className="gray">&nbsp;{data.fee.symbol}</span>
					</div>
					<div className={classnames('divTableCell', { fail: !data.status })}>
						{data.status ? 'Success' : 'Fail'}
					</div>
				</Link>
				{
					data.internal && data.internal.length ?
						data.internal.map((io, l) => (
							<div
								key={Math.random()}
								className={classnames('divTableRow', 'is-subtransfer', { 'is-subtransfer_last': l === (data.internal.length - 1) })}
							>
								<div className="divTableCell" />
								<div className="divTableCell" />
								<div className="divTableCell">
									<Link to={URLHelper.createUrlById(io.from.id)} className="inner-container">
										<div className="blue">{io.from.name || io.from.id}</div>
									</Link>
								</div>
								<div className="divTableCell transaction-to">
									<div className="sub-container">
										<div className="line-arrow" />
										<Link to={URLHelper.createUrlById(io.subject.id)}>
											<div className="blue">{io.subject.name || io.subject.id}</div>
										</Link>
									</div>
								</div>
								<div className="divTableCell">
									<div className="sub-container">
										{FormatHelper.formatAmount(io.value.amount, io.value.precision)}
										<span className="gray">{` ${io.value.symbol}`}</span>
										<div className="subtransfer-type">{io.label}</div>
									</div>
								</div>
								<div className="divTableCell" />
								<div className="divTableCell success" />
							</div>
						)) : null
				}
			</React.Fragment>
		);
	}

	renderTable(transactions) {
		return (
			<React.Fragment>
				<div className="divTable">
					<div className="divTableBody">
						<div className="TableHeading">
							<div className="divTableCell">#</div>
							<div className="divTableCell">Type</div>
							<div className="divTableCell">From</div>
							<div className="divTableCell">To</div>
							<div className="divTableCell">Amount</div>
							<div className="divTableCell">Fee amount</div>
							<div className="divTableCell">Status</div>
						</div>
						<div className="devider" />
						{transactions.map((operations, i) => operations.map((data, j) => this.renderTableOperation(data, i, j)))}
					</div>
				</div>
			</React.Fragment>
		);

	}

	render() {
		const { transactions } = this.props;

		return (
			<div className="table">
				<Media query="(max-width: 767px)">
					{(matches) => (
						matches ?
							this.renderMobileView(transactions) :
							this.renderTable(transactions)
					)}
				</Media>
			</div>
		);
	}

}

TransactionsTable.propTypes = {
	transactions: PropTypes.any.isRequired,
};

export default TransactionsTable;
