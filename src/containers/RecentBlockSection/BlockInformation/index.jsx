/* eslint-disable no-shadow */

import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// import LoadMoreBtn from '../../../components/LoadMoreBtn';
import BreadCrumbs from '../../../components/InformationBreadCrumbs';
import ViewListPopover from '../../../components/ViewListPopover';

import { INDEX_PATH, TRANSACTION_INFORMATION_PATH } from '../../../constants/RouterConstants';

import URLHelper from '../../../helpers/URLHelper';
import FormatHelper from '../../../helpers/FormatHelper';

import { getBlockInformation, clearBlockInformation } from '../../../actions/BlockActions';

class BlockInformation extends React.Component {

	constructor() {
		super();
		this.returnFunction = this.returnFunction.bind(this);
	}

	componentDidMount() {
		this.props.getBlockInfo();
	}

	shouldComponentUpdate(nextProps) {
		this.props.getBlockInfo(nextProps.match.params.round);
		return true;
	}

	componentWillUnmount() {
		this.props.clearBlockInfo();
	}

	returnFunction() {
		this.props.history.push(INDEX_PATH);
	}

	renderLoader() {
		// TODO loader
		return null;
	}

	renderBlockInfo(blockInformation) {
		const { round } = this.props.match.params;

		const blockNumber = blockInformation.get('blockNumber') || '';
		const time = blockInformation.get('time');
		const producer = blockInformation.get('producer') || {};
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const transactions = blockInformation.get('transactions') || [];

		let verifiers = blockInformation.get('verifiers');
		if (verifiers) {
			verifiers = verifiers.map(({ name, id }) => ({ id, name, to: URLHelper.createAccountUrl(id) }));
		}

		const breadcrumbs = [
			{
				title: 'Block list',
				path: INDEX_PATH,
			},
		];

		return (
			<React.Fragment>
				<div className="table-container inner-information-container block-information">
					<BreadCrumbs breadcrumbs={breadcrumbs} title={`Block ${blockNumber}`} returnFunction={this.returnFunction} />
					<div className="block-description">
						<div className="container time">
							<div className="title">Time, Date</div>
							<div className="value">{time}</div>
						</div>
						<div className="container size">
							<div className="title">Size</div>
							<div className="value">{size}</div>
						</div>
						<div className="container producer">
							<div className="title">Producer</div>
							<Link to={URLHelper.createAccountUrl(producer.id)}>
								<div className="value blue">{producer.name}</div>
							</Link>
						</div>
						<div className="container reward">
							<div className="title">Reward</div>
							<div className="value">{reward}</div>
						</div>
						<div className="container verifiers">
							<div className="title">Verifiers</div>
							<div className="value">{verifiers && verifiers.length}<ViewListPopover list={verifiers || []} /></div>
						</div>
					</div>
					<h2>{`${transactions && transactions.length} Transactions`}
					</h2>
					{
						transactions && transactions.length ?
							(
								<div className="table">
									<Media query="(max-width: 767px)">
										{(matches) =>
											(matches ? (
												<div className="recent-block-mobile-view">
													{
														transactions.map((operations, i) =>
															operations.map((data, j) => (
																<React.Fragment key={Math.random()} >
																	<Link
																		to={TRANSACTION_INFORMATION_PATH.replace(/:round/, round).replace(/:index/, i + 1)}
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
																			<div className="value">{data.value.amount && FormatHelper.formatAmount(data.value.amount, data.value.precision)} <span className="gray">{data.value.symbol}</span></div>
																		</div>
																		<div className="container">
																			<div className="title">Fee amount</div>
																			<div className="value">{FormatHelper.formatAmount(data.fee.amount, data.fee.precision)} <span className="gray">{data.fee.symbol}</span></div>
																		</div>
																		<div className={`container ${(data.status ? '' : ('fail'))}`}>
																			<div className="title">Status</div>
																			<div className="value">{data.status ? 'Success' : 'Fail'}</div>
																		</div>
																	</Link>
																	{
																		data.internal && data.internal.length ?
																			(data.internal.map((io, i) => (
																				<div
																					key={Math.random()}
																					className={classnames('recent-block-element', 'is-subtransfer', { 'is-subtransfer_last': i === (data.internal.length - 1) })}
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

															)))
													}
												</div>
											) : (
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
														{
															transactions.map((operations, i) =>
																operations.map((data, j) => (
																	<React.Fragment key={Math.random()}>
																		<Link
																			to={TRANSACTION_INFORMATION_PATH.replace(/:round/, round).replace(/:index/, i + 1)}
																			className={classnames('divTableRow', { 'with-subtransfer': data.internal && data.internal.length })}
																		>
																			{
																				<div className="divTableCell">{j === 0 ? i + 1 : ''}</div>
																			}
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
																			<div className="divTableCell">{data.value.amount && FormatHelper.formatAmount(data.value.amount, data.value.precision)} <span className="gray">{data.value.symbol}</span></div>
																			<div className="divTableCell">{FormatHelper.formatAmount(data.fee.amount, data.fee.precision)} <span className="gray">{data.fee.symbol}</span></div>
																			<div className={classnames('divTableCell', { fail: !data.status })}>{data.status ? 'Success' : 'Fail'}</div>
																		</Link>
																		{
																			data.internal && data.internal.length ?
																				(data.internal.map((io, i) => (
																					<div
																						key={Math.random()}
																						className={classnames('divTableRow', 'is-subtransfer', { 'is-subtransfer_last': i === (data.internal.length - 1) })}
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
																				))

																				) : null
																		}
																	</React.Fragment>
																)))
														}

													</div>
												</div>
											))
										}
									</Media>
									{/* <LoadMoreBtn /> */}
								</div>
							) : null
					}

				</div>
			</React.Fragment>
		);
	}

	render() {
		const { blockInformation } = this.props;

		// return blockInformation.get('blockNumber') ? this.renderBlockInfo(blockInformation) : this.renderLoader();
		return this.renderBlockInfo(blockInformation);
	}

}

BlockInformation.propTypes = {
	blockInformation: PropTypes.object.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
};

export default withRouter(connect(
	(state) => ({
		blockInformation: state.block.get('blockInformation'),
	}),
	(dispatch, props) => ({
		getBlockInfo: (round = props.match.params.round) => dispatch(getBlockInformation(round)),
		clearBlockInfo: () => dispatch(clearBlockInformation()),
	})
	,
)(BlockInformation));
