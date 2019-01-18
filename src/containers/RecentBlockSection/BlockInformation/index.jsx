/* eslint-disable no-shadow */

import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// import LoadMoreBtn from '../../../components/LoadMoreBtn';
import BreadCrumbs from '../../../components/InformationBreadCrumbs';
import SearchField from '../../../components/SearchFields/SearchField';
import ViewListPopover from '../../../components/ViewListPopover';

import { INDEX_PATH, ACCOUNTS_PATH } from '../../../constants/RouterConstants';

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
		let verifiers = blockInformation.get('verifiers');
		if (verifiers) {
			verifiers = verifiers.map((name) => ({ name, to: ACCOUNTS_PATH.replace(/:name/, name) }));
		}

		// const transactions = blockInformation.get('transactions');

		const codingData = [
			{
				blockNumber: '1.',
				type: 'Place order',
				from: 'GeorgeLukas',
				to: '1.16.2345.235',
				amount: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				status: 'Success',
			},
		];

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
							<div className="value">{producer}</div>
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
					<h2>43 Transactions
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
					<div className="table">
						<Media query="(max-width: 767px)">
							{(matches) =>
								(matches ? (
									<div className="recent-block-mobile-view">
										{
											codingData.map((data) => (
												<a href="" key={Math.random()} className="recent-block-element" onClick={(e) => { e.preventDefault(); }}>
													<div className="container">
														<div className="title">#</div>
														<div className="value">{data.blockNumber}</div>
													</div>
													<div className="container">
														<div className="title">Type</div>
														<div className="value">{data.type}</div>
													</div>
													<div className="container">
														<div className="title">From</div>
														<div className="value"><div className="blue">{data.from}</div></div>
													</div>
													<div className="container">
														<div className="title">To</div>
														<div className="value"><div className="blue">{data.to}</div></div>
													</div>
													<div className="container amount">
														<div className="title">Amount</div>
														<div className="value">{data.weight} <span className="gray">{data.amount}</span></div>
													</div>
													<div className="container">
														<div className="title">Fee amount</div>
														<div className="value">{data.weight} <span className="gray">{data.amount}</span></div>
													</div>
													<div className={`container ${(data.status === 'Fail' ? ('fail') : '')}`}>
														<div className="title">Status</div>
														<div className="value">{data.status}</div>
													</div>
												</a>
											))
										}
										<a href="" className="recent-block-element with-subtransfer" onClick={(e) => { e.preventDefault(); }}>
											<div className="container">
												<div className="title">#</div>
												<div className="value">6.</div>
											</div>
											<div className="container">
												<div className="title">Type</div>
												<div className="value">Place order</div>
											</div>
											<div className="container">
												<div className="title">From</div>
												<div className="value"><div className="blue">GeorgeGeorge</div></div>
											</div>
											<div className="container">
												<div className="title">To</div>
												<div className="value"><div className="blue">1.26.8754.123</div></div>
											</div>
											<div className="container amount">
												<div className="title">Amount</div>
												<div className="value">7.532 <span className="gray">echo</span></div>
											</div>
											<div className="container">
												<div className="title">Fee amount</div>
												<div className="value">7.532 <span className="gray">echo</span></div>
											</div>
											<div className="container success">
												<div className="title">Status</div>
												<div className="value">Success</div>
											</div>
										</a>
										<div className="recent-block-element is-subtransfer">
											<div className="subtransfer-type">Subtransfer</div>
											<div className="line-arrow" />
											<div className="container amount">
												<div className="title">Amount</div>
												<div className="value">7.532 <span className="gray">echo</span></div>
											</div>
											<div className="container">
												<div className="title">From</div>
												<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>GeorgeGeorge</a></div>
											</div>
											<div className="container">
												<div className="title">To</div>
												<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>1.26.8754.123</a></div>
											</div>
										</div>
										<div className="recent-block-element is-subtransfer is-subtransfer_last">
											<div className="subtransfer-type">ERC20 Token transfer</div>
											<div className="line-arrow" />
											<div className="container amount">
												<div className="title">Amount</div>
												<div className="value">7.532 <span className="gray">echo</span></div>
											</div>
											<div className="container">
												<div className="title">From</div>
												<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>GeorgeGeorge</a></div>
											</div>
											<div className="container">
												<div className="title">To</div>
												<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>1.26.8754.123</a></div>
											</div>
										</div>
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
												codingData.map((data) => (
													<React.Fragment key={Math.random()}>
														<a href="" className="divTableRow" onClick={(e) => { e.preventDefault(); }}>
															<div className="divTableCell">{data.blockNumber}</div>
															<div className="divTableCell">{data.type}</div>
															<div className="divTableCell">
																<div className="inner-container"><div className="blue">{data.from}</div></div>
															</div>
															<div className="divTableCell transaction-to">
																<div className="sub-container"><div className="blue">{data.to}</div></div>
															</div>
															<div className="divTableCell">{data.weight} <span className="gray">{data.amount}</span></div>
															<div className="divTableCell">{data.weight} <span className="gray">{data.amount}</span></div>
															<div className={`divTableCell ${(data.status === 'Fail' ? ('fail') : '')}`}>{data.status}</div>
														</a>
													</React.Fragment>
												))
											}

											{/* Класс with-subtransfer добавляется для главного элемента, который имееет сабтрансферы */}

											<a href="" onClick={(e) => { e.preventDefault(); }} className="divTableRow with-subtransfer">
												<div className="divTableCell">6.</div>
												<div className="divTableCell">Place order</div>
												<div className="divTableCell">
													<div className="inner-container"><div className="blue">GeorgeLukas</div></div>
												</div>
												<div className="divTableCell transaction-to">
													<div className="sub-container">
														<div className="blue">1.26.1236.457</div>
													</div>
												</div>
												<div className="divTableCell">5.653 <span className="gray">echo</span></div>
												<div className="divTableCell">5.653 <span className="gray">echo</span></div>
												<div className="divTableCell success">Success</div>
											</a>
											{/* Класс is-subtransfer добавляется для самих сабтрансферов */}

											<div className="divTableRow is-subtransfer">
												<div className="divTableCell" />
												<div className="divTableCell" />
												<div className="divTableCell">
													<div className="inner-container"><div className="blue">alpha-centos</div></div>
												</div>
												<div className="divTableCell transaction-to">
													<div className="sub-container">
														{/* Блок line-arrow добавляется только для строк с классом is-subtransfer */}
														<div className="line-arrow" />
														<div className="blue">openledger-dc</div>
													</div>
												</div>
												<div className="divTableCell">
													<div className="sub-container">
														5.653 <span className="gray">echo</span>
														<div className="subtransfer-type">Subtransfer</div>
													</div>
												</div>
												<div className="divTableCell" />
												<div className="divTableCell success" />
											</div>
											<div className="divTableRow is-subtransfer is-subtransfer_last">
												<div className="divTableCell" />
												<div className="divTableCell" />
												<div className="divTableCell">
													<div className="inner-container"><div className="blue">ozanselvi1989</div></div>
												</div>
												<div className="divTableCell transaction-to">
													<div className="sub-container">
														{/* Блок line-arrow добавляется только для строк с классом is-subtransfer */}
														<div className="line-arrow" />
														<div className="blue">gauto01</div>
													</div>
												</div>
												<div className="divTableCell">
													<div className="sub-container">
														5.653 <span className="gray">echo</span>
														<div className="subtransfer-type">ERC20 Token transfer</div>
													</div>
												</div>
												<div className="divTableCell" />
												<div className="divTableCell success" />
											</div>
										</div>
									</div>
								))
							}
						</Media>
						{/* <LoadMoreBtn /> */}
					</div>
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
