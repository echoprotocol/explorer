/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroller';
import classnames from 'classnames';

import Avatar from '../../../components/Avatar';
import LoadMore from '../../../components/LoadMore';
import SmallSearchField from '../../../components/SmallSearchField';

import FormatHelper from '../../../helpers/FormatHelper';
import URLHelper from '../../../helpers/URLHelper';

import {
	BLOCK_INFORMATION_PATH,
	SSR_BLOCK_INFORMATION_PATH,
	SSR_ACCOUNTS_PATH,
} from '../../../constants/RouterConstants';
import BlockReducer from '../../../reducers/BlockReducer';
import { NO_TRANSACTIONS, TITLE_TEMPLATES, ECHO_ASSET } from '../../../constants/GlobalConstants';

import GlobalActions from '../../../actions/GlobalActions';
import {
	resetDisplayedBlocks,
	setMaxDisplayedBlocks,
} from '../../../actions/BlockActions';
import SearchActions from '../../../actions/SearchActions';

import InnerHeader from '../../../components/InnerHeader';

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
		if (this.state.loading && prevProps.hints !== this.props.hints && this.props.hints.length) {
			this.transitionToBlock();
		}
	}

	componentWillUnmount() {
		this.props.resetDisplayedBlocks();
	}

	onLink(e, path) {
		e.preventDefault();
		e.stopPropagation();
		Router.push(SSR_ACCOUNTS_PATH, path);
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

	setLoading() {
		this.setState({
			loading: true,
		});
	}

	goToBlock(e, round) {
		const href = BLOCK_INFORMATION_PATH.replace(/:round/, round);
		e.preventDefault();
		window.scrollTo(0, 0);
		Router.push(SSR_BLOCK_INFORMATION_PATH, href);
	}

	transitionToBlock() {
		const { errorSearch, hints: [hint] } = this.props;
		if (errorSearch) return;
		Router.push(SSR_BLOCK_INFORMATION_PATH, hint.to);
	}

	render() {
		const {
			hasMore, loading, loadingSearch, errorSearch, latestBlock, isMobile,
		} = this.props;
		const blocks = this.getBlocks();
		const AreEmptyTransactions = !hasMore && !blocks.length;

		return (
			<InfiniteScroll loadMore={() => !loading && this.props.loadBlocks()} hasMore={hasMore}>
				<div className="inner-information-container main-page">
					<InnerHeader title="Recent blocks">
						<SmallSearchField
							errorSearch={errorSearch}
							loadingSearch={loadingSearch}
							getHints={(str) => this.props.getHints(str)}
							withHelp
							goToBlock
							white
							placeholder="Go to block"
							latestBlock={latestBlock}
							setLoading={() => this.setLoading()}
						/>
					</InnerHeader>

					<Media query="(max-width: 767px)" defaultMatches={isMobile}>
						{(matches) =>
							(matches ? (
								<div className="recent-block-mobile-view">
									{
										blocks.map((data) => (
											<Link href={SSR_BLOCK_INFORMATION_PATH} key={data.round}>
												<div
													role="button"
													tabIndex={0}
													onKeyPress={() => { }}
													className="recent-block-element fade-anim"
													onClick={(e) => this.goToBlock(e, data.round)}
												>
													<div className="container">
														<div className="title">Block #</div>
														<div className="value">
															<Link href="">
																<a href="" onClick={(e) => this.goToBlock(e, data.round)}>{data.blockNumber}</a>
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
																href={SSR_ACCOUNTS_PATH}
																as={URLHelper.createAccountUrlByName(data.producer)}
															>
																<a className="blue">{data.producer}</a>
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
												</div>
											</Link>
										))
									}
									{AreEmptyTransactions && (
										<p className="title-no-transactions">No transactions in recent blocks</p>
									)}
								</div>
							) : (
								<div className={classnames('div-table', { 'no-border-bottom': AreEmptyTransactions })}>
									<div className="div-table-body">
										<div className="table-heading">
											<div className="div-table-cell">
												# Block
											</div>
											<div className="div-table-cell">
												<Media query="(max-width: 999px)">
													{() => 'Time'}
												</Media>
											</div>
											<div className="div-table-cell">Producer</div>
											<div className="div-table-cell">Reward</div>
											<div className="div-table-cell">Size</div>
											<div className="div-table-cell">Operations</div>
										</div>
										<div className="divider" />
										{
											blocks.map((data) => (
												<React.Fragment key={data.round}>
													<Link href={SSR_BLOCK_INFORMATION_PATH} key={data.round}>
														<div
															role="button"
															tabIndex={0}
															onKeyPress={() => { }}
															className="div-table-row fade-anim"
															onClick={(e) => this.goToBlock(e, data.round, BLOCK_INFORMATION_PATH)}
														>
															<div className="div-table-cell">
																<span>
																	{data.blockNumber}
																</span>
															</div>
															<div className="div-table-cell">{data.time}</div>
															<div className="div-table-cell producer">
																<button
																	className="blue"
																	onClick={(e) => this.onLink(e, URLHelper.createAccountUrlByName(data.producer))}
																>
																	<Avatar accountName={data.producer} />
																	<span>

																		{data.producer}
																	</span>
																</button>
															</div>
															<div className="div-table-cell">{FormatHelper.formatAmount(data.reward, ECHO_ASSET.PRECISION)} <span className="gray">{data.rewardCurrency}</span></div>
															<div className="div-table-cell">{data.weight} <span className="gray">{data.weightSize}</span></div>
															<div className="div-table-cell">{data.transactions}</div>
														</div>
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
					{loading && <LoadMore />}
				</div>
			</InfiniteScroll>
		);
	}

}

RecentBlockTable.propTypes = {
	isMobile: PropTypes.bool.isRequired,
	hints: PropTypes.array.isRequired,
	errorSearch: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	hasMore: PropTypes.bool.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	blocks: PropTypes.object.isRequired,
	loadBlocks: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	resetDisplayedBlocks: PropTypes.func.isRequired,
	getHints: PropTypes.func.isRequired,
	latestBlock: PropTypes.number.isRequired,
};

RecentBlockTable.defaultProps = {};

export default withRouter(connect(
	(state) => ({
		hasMore: state.block.get('hasMore'),
		loading: state.block.get('loading'),
		hints: state.search.getIn(['blockSearch', 'hints']),
		errorSearch: state.search.getIn(['blockSearch', 'error']),
		loadingSearch: state.search.getIn(['blockSearch', 'loading']),
		blocks: state.block.get('blocks'),
		latestBlock: state.round.get('latestBlock'),
		isMobile: state.global.get('isMobile'),
		connected: state.global.get('connected'),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(SearchActions.blockSearchHint(str)),
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		loadBlocks: () => dispatch(setMaxDisplayedBlocks()),
		resetDisplayedBlocks: () => dispatch(resetDisplayedBlocks()),
	}),
)(RecentBlockTable));
