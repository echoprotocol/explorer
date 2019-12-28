/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import classnames from 'classnames';

import LoadMoreBtn from '../../../components/LoadMoreBtn';
import SmallSearchField from '../../../components/SmallSearchField';

import FormatHelper from '../../../helpers/FormatHelper';
import URLHelper from '../../../helpers/URLHelper';

import { BLOCK_INFORMATION_PATH } from '../../../constants/RouterConstants';
import BlockReducer from '../../../reducers/BlockReducer';
import { NO_TRANSACTIONS, TITLE_TEMPLATES, ECHO_ASSET } from '../../../constants/GlobalConstants';

import GlobalActions from '../../../actions/GlobalActions';
import {
	resetDisplayedBlocks,
	setMaxDisplayedBlocks,
} from '../../../actions/BlockActions';
import SearchActions from '../../../actions/SearchActions';

class RecentBlockTable extends React.Component {

	constructor() {
		super();
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.MAIN);
	}

	componentDidUpdate(prevProps) {
		console.log('this.props.hints', this.props.hints)
		if (this.state.loading && prevProps.hints !== this.props.hints && this.props.hints.length) {
			this.transitionToBlock();
		}
	}

	componentWillUnmount() {
		this.props.resetDisplayedBlocks();
	}

	onLink(e, path) {
		e.preventDefault();
		this.props.history.push(path);
	}

	getBlocks() {
		const { blocks } = this.props;
		const blocksResult = [];

		blocks.mapEntries(([key, value]) => {
			blocksResult.push({
				round: key,
				blockNumber: FormatHelper.formatAmount(key, 0),
				time: value.get('time'),
				producer: value.get('producer'),
				producerId: value.get('producerId'),
				reward: value.get('reward'),
				rewardCurrency: value.get('rewardCurrency'),
				weight: FormatHelper.formatBlockSize(value.get('weight')),
				weightSize: FormatHelper.formatByteSize(value.get('weight')),
				transactions: value.get('transactions'),
			});
		});

		return blocksResult.sort((a, b) => {
			if (!a || !b) {
				return 0;
			}

			return b.round - a.round;
		});
	}

	transitionToBlock() {
		const { errorSearch, hints: [hint] } = this.props;
		// console.log('hints', hint)
		// if (errorSearch) return;
		this.props.history.push(hint.to);
	}

	goToBlock(e, block) {
		e.preventDefault();
		window.scrollTo(0, 0);
		this.props.history.push(BLOCK_INFORMATION_PATH.replace(/:round/, block));
	}

	setLoading() {
		this.setState({
			loading: true
		})
	}

	render() {
		const {
			hasMore, loading, loadingSearch, errorSearch, latestBlock, connectionError,
		} = this.props;
		const blocks = this.getBlocks();
		const AreEmptyTransactions = !hasMore && !blocks.length;

		// console.log('connectionError', connectionError);

		return (
			<InfiniteScroll loadMore={() => !loading && this.props.loadBlocks()} hasMore={hasMore}>
				<div className="table-container recent-block-table">
					<h2>Recent blocks
						<SmallSearchField
							errorSearch={errorSearch}
							loadingSearch={loadingSearch}
							getHints={(str) => this.props.getHints(str)}
							// transitionToBlock={(arg) => this.transitionToBlock(arg)}
							withHelp
							goToBlock
							white
							placeholder="Go to block"
							latestBlock={latestBlock}

							setLoading={() => this.setLoading()}
							connectionError={connectionError}
						/>
					</h2>
					<div className="table">
						<Media query="(max-width: 767px)">
							{(matches) =>
								(matches ? (
									<div className="recent-block-mobile-view">
										{
											blocks.map((data) => (
												<Link onClick={(e) => this.goToBlock(e, data.round)} to="" key={data.round} className="recent-block-element fade-anim">
													<div className="container">
														<div className="title">Block #</div>
														<div className="value">
															<Link
																onClick={(e) => this.goToBlock(e, data.round)}
																to=""
																className="blue"
															>
																{data.blockNumber}
															</Link>
														</div>
													</div>
													<div className="container">
														<div className="title">Block time</div>
														<div className="value">{data.time}</div>
													</div>
													<div className="container">
														<div className="title">Producer</div>
														<div className="value">
															<Link
																to={URLHelper.createAccountUrlByName(data.producer)}
																className="blue"
															>
																{data.producer}
															</Link>
														</div>
													</div>
													<div className="container">
														<div className="title">Reward</div>
														<div className="value">{data.reward} <span className="gray">{data.rewardCurrency}</span></div>
													</div>
													<div className="container">
														<div className="title">Size</div>
														<div className="value">{data.weight} <span className="gray">{data.weightSize}</span></div>
													</div>
													<div className="container">
														<div className="title">Transactions</div>
														<div className="value">{data.transactions}</div>
													</div>
												</Link>
											))
										}
										{AreEmptyTransactions && (
											<p className="title-no-transactions">No transactions in recent blocks</p>
										)}
									</div>
								) : (
									<div className={classnames('divTable', { 'no-border-bottom': AreEmptyTransactions })}>
										<div className="divTableBody">
											<div className="TableHeading">
												<div className="divTableCell">
													<Media query="(max-width: 999px)">
														{(matches) =>
															(matches ? (
																'Block #'
															) : (
																'Block number'
															))
														}
													</Media>
												</div>
												<div className="divTableCell">
													<Media query="(max-width: 999px)">
														{() => 'Time'}
													</Media>
												</div>
												<div className="divTableCell">Producer</div>
												<div className="divTableCell">Reward</div>
												<div className="divTableCell">Size</div>
												<div className="divTableCell">Transactions</div>
											</div>
											<div className="divider" />
											{
												blocks.map((data) => (
													<React.Fragment key={data.round}>
														<Link onClick={(e) => this.goToBlock(e, data.round)} to="" key={data.round} className="divTableRow fade-anim">
															<div className="divTableCell">
																<span className="blue">
																	{data.blockNumber}
																</span>
															</div>
															<div className="divTableCell">{data.time}</div>
															<div className="divTableCell">
																<div className="inner-container">
																	<button
																		className="blue"
																		onClick={(e) => this.onLink(e, URLHelper.createAccountUrlByName(data.producer))}
																	>
																		{data.producer}
																	</button>
																</div>
															</div>
															<div className="divTableCell">{FormatHelper.formatAmount(data.reward, ECHO_ASSET.PRECISION)} <span className="gray">{data.rewardCurrency}</span></div>
															<div className="divTableCell">{data.weight} <span className="gray">{data.weightSize}</span></div>
															<div className="divTableCell">{data.transactions}</div>
														</Link>
													</React.Fragment>
												))
											}
											{AreEmptyTransactions && (
												<p className="title-no-transactions">{NO_TRANSACTIONS}</p>
											)}
										</div>
									</div>
								))
							}
						</Media>
						{loading && <LoadMoreBtn />}
					</div>
				</div>
			</InfiniteScroll>
		);
	}

}

RecentBlockTable.propTypes = {
	hints: PropTypes.array.isRequired,
	errorSearch: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	hasMore: PropTypes.bool.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	blocks: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	loadBlocks: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	resetDisplayedBlocks: PropTypes.func.isRequired,
	getHints: PropTypes.func.isRequired,
	latestBlock: PropTypes.number.isRequired,
};

export default withRouter(connect(
	(state) => ({
		hasMore: state.block.get('hasMore'),
		loading: state.block.get('loading'),
		hints: state.search.getIn(['blockSearch', 'hints']),
		errorSearch: state.search.getIn(['blockSearch', 'error']),
		loadingSearch: state.search.getIn(['blockSearch', 'loading']),
		blocks: state.block.get('blocks'),
		latestBlock: state.round.get('latestBlock'),

		connectionError: state.search.get('connectionError'),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(SearchActions.blockSearchHint(str)),
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		loadBlocks: () => dispatch(setMaxDisplayedBlocks()),
		resetDisplayedBlocks: () => dispatch(resetDisplayedBlocks()),
	}),
)(RecentBlockTable));
