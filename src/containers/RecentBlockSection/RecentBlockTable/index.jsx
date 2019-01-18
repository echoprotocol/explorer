/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import LoadMoreBtn from '../../../components/LoadMoreBtn';
import SearchField from '../../../components/SearchFields/SearchField';

import FormatHelper from '../../../helpers/FormatHelper';

import { MAX_PAGE_BLOCKS } from '../../../constants/GlobalConstants';
import { BLOCK_INFORMATION_PATH } from '../../../constants/RouterConstants';

class RecentBlockTable extends React.Component {

	getBlocks() {
		const { blocks } = this.props;

		const blocksResult = [];

		blocks.mapEntries(([key, value]) => {
			blocksResult.push({
				round: key,
				blockNumber: FormatHelper.formatAmount(key, 0),
				time: value.get('time'),
				producer: value.get('producer'),
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
		const { blocksCount } = this.props;

		return (
			<div className="table-container recent-block-table">
				<h2>Recent blocks
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
										this.getBlocks().map((data) => (
											<div key={data.round} className="recent-block-element">
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
													<div className="value">{data.producer}</div>
												</div>
												<div className="container">
													<div className="title">Reward</div>
													<div className="value">{data.reward} <span className="gray">{data.rewardCurrency}</span></div>
												</div>
												<div className="container">
													<div className="title">Weight</div>
													<div className="value">{data.weight} <span className="gray">{data.weightSize}</span></div>
												</div>
												<div className="container">
													<div className="title">Transactions</div>
													<div className="value">{data.transactions}</div>
												</div>
											</div>
										))
									}
								</div>
							) : (
								<div className="divTable">
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
													{(matches) =>
														(matches ? (
															'Time'
														) : (
															'Time (UTC)'
														))
													}
												</Media>
											</div>
											<div className="divTableCell">Producer</div>
											<div className="divTableCell">Reward</div>
											<div className="divTableCell">Weight</div>
											<div className="divTableCell">Transactions</div>
										</div>
										<div className="devider" />
										{
											this.getBlocks().map((data) => (
												<React.Fragment key={data.round}>
													<div className="divTableRow">
														<div className="divTableCell">
															<Link
																to={BLOCK_INFORMATION_PATH.replace(/:round/, data.round)}
																className="blue"
															>
																{data.blockNumber}
															</Link>
														</div>
														<div className="divTableCell">{data.time}</div>
														<div className="divTableCell"><div className="inner-container">{data.producer}</div></div>
														<div className="divTableCell">{data.reward} <span className="gray">{data.rewardCurrency}</span></div>
														<div className="divTableCell">{data.weight} <span className="gray">{data.weightSize}</span></div>
														<div className="divTableCell">{data.transactions}</div>
													</div>
												</React.Fragment>
											))
										}
									</div>
								</div>
							))
						}
					</Media>
					{blocksCount < MAX_PAGE_BLOCKS && <LoadMoreBtn />}
				</div>
			</div>
		);
	}

}

RecentBlockTable.propTypes = {
	blocks: PropTypes.object.isRequired,
	blocksCount: PropTypes.number.isRequired,
};

export default withRouter(connect(
	(state) => ({
		blocks: state.block.get('blocks'),
		blocksCount: state.block.get('blocksCount'),
	}),
	() => ({}),
)(RecentBlockTable));
