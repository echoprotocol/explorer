/* eslint-disable no-shadow */

import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classnames from 'classnames';
// import LoadMoreBtn from '../../../components/LoadMoreBtn';
import BreadCrumbs from '../../../components/InformationBreadCrumbs';
import SearchField from '../../../components/SearchFields/SearchField';

import { INDEX_PATH } from '../../../constants/RouterConstants';

import { getBlockInformation, clearBlockInformation } from '../../../actions/BlockActions';

class BlockInformation extends React.Component {

	constructor() {
		super();
		this.returnFunction = this.returnFunction.bind(this);
	}

	componentDidMount() {
		this.props.getBlockInfo();

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
		const blockNumber = blockInformation.get('blockNumber');

		const time = blockInformation.get('time');
		const producer = blockInformation.get('producer');
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const verifiers = blockInformation.get('verifiers');

		const operations = blockInformation.get('operations');

		return (
			<React.Fragment>
				<div className="table-container inner-information-container block-information">
					<BreadCrumbs title={`Block ${blockNumber}`} returnFunction={this.returnFunction} />
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
							<div className="value">{producer}</div>
						</div>
						<div className="container reward">
							<div className="title">Reward</div>
							<div className="value">{reward}</div>
						</div>
						<div className="container verifiers">
							<div className="title">Verifiers</div>
							<div className="value">{verifiers && verifiers.length} <a href="" className="view-list" onClick={(e) => { e.preventDefault(); }}>View list</a></div>
						</div>
					</div>
					<h2>{`${operations && operations.length} Operations`}
						<Media query="(max-width: 767px)">
							{(matches) =>
								(matches ? (
									<SearchField small white placeholder="Search by block" />
								) : (
									<SearchField small white placeholder="Search by block number" />
								))
							}
						</Media>
					</h2>
					{
						operations && operations.length ?
							(
								<div className="table">
									<Media query="(max-width: 767px)">
										{(matches) =>
											(matches ? (
												<div className="recent-block-mobile-view">
													{
														operations.map((data, i) => (
															<React.Fragment>
																<a
																	href=""
																	key={Math.random()}
																	className={classnames('recent-block-element', { 'with-subtransfer': data.internal })}
																	onClick={(e) => { e.preventDefault(); }}
																>
																	<div className="container">
																		<div className="title">#</div>
																		<div className="value">{i + 1}</div>
																	</div>
																	<div className="container">
																		<div className="title">Type</div>
																		<div className="value">{data.name}</div>
																	</div>
																	<div className="container">
																		<div className="title">From</div>
																		<div className="value"><div className="blue">{data.from}</div></div>
																	</div>
																	<div className="container">
																		<div className="title">To</div>
																		<div className="value"><div className="blue">{data.subject}</div></div>
																	</div>
																	<div className="container amount">
																		<div className="title">Amount</div>
																		<div className="value">{data.value.amount} <span className="gray">{data.value.symbol}</span></div>
																	</div>
																	<div className="container">
																		<div className="title">Fee amount</div>
																		<div className="value">{data.fee.amount} <span className="gray">{data.fee.symbol}</span></div>
																	</div>
																	<div className={`container ${(data.status ? '' : ('fail'))}`}>
																		<div className="title">Status</div>
																		<div className="value">{data.status ? 'Success' : 'Fail'}</div>
																	</div>
																</a>
																{
																	data.internal ?
																		(data.internal.map((io, i) => (
																			<div
																				key={Math.random()}
																				className={classnames('recent-block-element', 'is-subtransfer', { 'is-subtransfer_last': i === (data.internal.length - 1) })}
																			>
																				<div className="subtransfer-type">Subtransfer
																				</div>
																				<div className="line-arrow" />
																				<div className="container amount">
																					<div className="title">Amount</div>
																					<div className="value">
																						{io.value.amount}
																						<span className="gray">{io.value.symbol}</span>
																					</div>
																				</div>
																				<div className="container">
																					<div className="title">From</div>
																					<div className="value">
																						<a
																							href=""
																							className="blue"
																							onClick={(e) => e.preventDefault()}
																						>
																							{io.from}
																						</a>
																					</div>
																				</div>
																				<div className="container">
																					<div className="title">To</div>
																					<div className="value">
																						<a
																							href=""
																							className="blue"
																							onClick={(e) => e.preventDefault()}
																						>
																							{io.subject}
																						</a>
																					</div>
																				</div>
																			</div>
																		))
																		) : null
																}
															</React.Fragment>

														))
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
															operations.map((data, i) => (
																<React.Fragment key={Math.random()}>
																	<a
																		href=""
																		className={classnames('divTableRow', { 'with-subtransfer': data.internal })}
																		onClick={(e) => { e.preventDefault(); }}
																	>
																		<div className="divTableCell">{i + 1}</div>
																		<div className="divTableCell">{data.name}</div>
																		<div className="divTableCell">
																			<div className="inner-container"><div className="blue">{data.from}</div></div>
																		</div>
																		<div className="divTableCell transaction-to">
																			<div className="sub-container"><div className="blue">{data.subject}</div></div>
																		</div>
																		<div className="divTableCell">{data.value.amount} <span className="gray">{data.value.symbol}</span></div>
																		<div className="divTableCell">{data.fee.amount} <span className="gray">{data.fee.symbol}</span></div>
																		<div className={`divTableCell ${(data.status ? '' : ('fail'))}`}>{data.status ? 'Success' : 'Fail'}</div>
																	</a>
																	{
																		data.internal ?
																			(data.internal.map((io, i) => (
																				<div
																					key={Math.random()}
																					className={classnames('divTableRow', 'is-subtransfer', { 'is-subtransfer_last': i === (data.internal.length - 1) })}
																				>
																					<div className="divTableCell" />
																					<div className="divTableCell" />
																					<div className="divTableCell">
																						<div className="inner-container"><div className="blue">{io.from}</div></div>
																					</div>
																					<div className="divTableCell transaction-to">
																						<div className="sub-container">
																							{/* Блок line-arrow добавляется только для строк с классом is-subtransfer */}
																							<div className="line-arrow" />
																							<div className="blue">{io.subject}</div>
																						</div>
																					</div>
																					<div className="divTableCell">
																						<div className="sub-container">
																							{io.value.amount}
																							<span className="gray">{io.value.symbol}</span>
																							<div className="subtransfer-type">Subtransfer</div>
																						</div>
																					</div>
																					<div className="divTableCell" />
																					<div className="divTableCell success" />
																				</div>
																			))

																			) : null
																	}
																</React.Fragment>
															))
														}

														{/* Класс with-subtransfer добавляется для главного элемента, который имееет сабтрансферы */}


														{/* Класс is-subtransfer добавляется для самих сабтрансферов */}


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

		return blockInformation.get('blockNumber') ? this.renderBlockInfo(blockInformation) : this.renderLoader();
	}

}

BlockInformation.propTypes = {
	blockInformation: PropTypes.object.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(connect(
	(state) => ({
		blockInformation: state.block.get('blockInformation'),
	}),
	(dispatch, props) => ({
		getBlockInfo: () => dispatch(getBlockInformation(props.match.params.round)),
		clearBlockInfo: () => dispatch(clearBlockInformation()),
	})
	,
)(BlockInformation));
