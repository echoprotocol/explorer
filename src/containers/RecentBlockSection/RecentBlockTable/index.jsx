/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { fromJS } from 'immutable';
import classnames from 'classnames';

import LoadMoreBtn from '../../../components/LoadMoreBtn';
import SmallSearchField from '../../../components/SmallSearchField';
import FilterBlock from '../../../components/FilterCheckbox';

import FormatHelper from '../../../helpers/FormatHelper';
import TypesHelper from '../../../helpers/TypesHelper';
import URLHelper from '../../../helpers/URLHelper';

import { BLOCK_INFORMATION_PATH } from '../../../constants/RouterConstants';
import BlockReducer from '../../../reducers/BlockReducer';
import { PAGE_BLOCKS_COUNT, TITLE_TEMPLATES } from '../../../constants/GlobalConstants';

import GlobalActions from '../../../actions/GlobalActions';
import {
	resetDisplayedBlocks,
	setMaxDisplayedBlocks,
	toggleEmptyBlocks,
} from '../../../actions/BlockActions';

class RecentBlockTable extends React.Component {

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.MAIN);
	}
	componentWillUnmount() {
		this.props.resetDisplayedBlocks();
	}
	onSearch(blockNumber) {
		if (TypesHelper.isCommaNumberRepresentation(blockNumber)) {
			blockNumber = FormatHelper.removeCommas(blockNumber);
		}
		this.props.history.push(`/blocks/${blockNumber}`);
	}

	getBlocks() {
		const { blocks, isShowEmptyBlocks } = this.props;
		const blocksResult = [];
		let filterBlocks = fromJS(blocks.toJS());

		if (!isShowEmptyBlocks) {
			filterBlocks = filterBlocks.filter((block) => block.get('transactions'));
			if (filterBlocks.size < PAGE_BLOCKS_COUNT) {
				this.props.setValue('hasMore', false);
			}
		}

		filterBlocks.mapEntries(([key, value]) => {

			blocksResult.push({
				round: key,
				blockNumber: FormatHelper.formatAmount(key, 0),
				// time: FormatHelper.timestampToLocalTime(value.get('time')),
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


	render() {
		const { hasMore, isShowEmptyBlocks } = this.props;
		const blocks = this.getBlocks();
		const AreEmptyTransactions = !hasMore && !blocks.length;

		return (
			<InfiniteScroll loadMore={() => this.props.loadBlocks()} hasMore={hasMore}>
				<div className="table-container recent-block-table">
					<h2>Recent blocks
						<SmallSearchField onSearch={(blockNumber) => this.onSearch(blockNumber)} goToBlock white placeholder="Go to block" />
					</h2>
					<FilterBlock
						checked={!isShowEmptyBlocks}
						title="Hide empty blocks"
						onChange={() => this.props.toggleEmptyBlocks(isShowEmptyBlocks)}
					/>
					<div className="table">
						<Media query="(max-width: 767px)">
							{(matches) =>
								(matches ? (
									<div className="recent-block-mobile-view">
										{
											this.getBlocks().map((data) => (
												<Link to={BLOCK_INFORMATION_PATH.replace(/:round/, data.round)} key={data.round} className="recent-block-element fade-anim">
													<div className="container">
														<div className="title">Block #</div>
														<div className="value">
															<Link
																to={BLOCK_INFORMATION_PATH.replace(/:round/, data.round)}
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
														<Link to={BLOCK_INFORMATION_PATH.replace(/:round/, data.round)} className="divTableRow fade-anim">
															<div className="divTableCell">
																<Link
																	to={BLOCK_INFORMATION_PATH.replace(/:round/, data.round)}
																	className="blue"
																>
																	{data.blockNumber}
																</Link>
															</div>
															<div className="divTableCell">{data.time}</div>
															<div className="divTableCell">
																<div className="inner-container">
																	<Link
																		to={URLHelper.createAccountUrlByName(data.producer)}
																		className="blue"
																	>
																		{data.producer}
																	</Link>
																</div>
															</div>
															<div className="divTableCell">{data.reward} <span className="gray">{data.rewardCurrency}</span></div>
															<div className="divTableCell">{data.weight} <span className="gray">{data.weightSize}</span></div>
															<div className="divTableCell">{data.transactions}</div>
														</Link>
													</React.Fragment>
												))
											}
											{AreEmptyTransactions && (
												<p className="title-no-transactions">No transactions in recent blocks</p>
											)}
										</div>
									</div>
								))
							}
						</Media>
						{hasMore && <LoadMoreBtn />}
					</div>
				</div>
			</InfiniteScroll>
		);
	}

}

RecentBlockTable.propTypes = {
	isShowEmptyBlocks: PropTypes.bool.isRequired,
	hasMore: PropTypes.bool.isRequired,
	blocks: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	loadBlocks: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	toggleEmptyBlocks: PropTypes.func.isRequired,
	resetDisplayedBlocks: PropTypes.func.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default withRouter(connect(
	(state) => ({
		blocks: state.block.get('blocks'),
		hasMore: state.block.get('hasMore'),
		isShowEmptyBlocks: state.block.get('isShowEmptyBlocks'),
	}),
	(dispatch) => ({
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		loadBlocks: () => dispatch(setMaxDisplayedBlocks()),
		resetDisplayedBlocks: () => dispatch(resetDisplayedBlocks()),
		toggleEmptyBlocks: (value) => dispatch(toggleEmptyBlocks(value)),
	}),
)(RecentBlockTable));
