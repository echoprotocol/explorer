/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import LoadMoreBtn from '../../../components/LoadMoreBtn';
import SmallSearchField from '../../../components/SmallSearchField';

import FormatHelper from '../../../helpers/FormatHelper';
import URLHelper from '../../../helpers/URLHelper';

import { BLOCK_INFORMATION_PATH } from '../../../constants/RouterConstants';
import { LOAD_MORE_TEMPLATE } from '../../../constants/LoadMoreConstants';
import { TITLE_TEMPLATES } from '../../../constants/GlobalConstants';

import GlobalActions from '../../../actions/GlobalActions';
import { setMaxDisplayedBlocks } from '../../../actions/BlockActions';

class RecentBlockTable extends React.Component {

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.MAIN);
	}

	onSearch(blockNumber) {
		this.props.history.push(`/blocks/${blockNumber}`);
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

	render() {
		const { loading } = this.props;

		return (
			<div className="table-container recent-block-table">
				<h2>Recent blocks
					<SmallSearchField onSearch={(blockNumber) => this.onSearch(blockNumber)} goToBlock white placeholder="Go to block" />
				</h2>
				<div className="table">
					<Media query="(max-width: 767px)">
						{(matches) =>
							(matches ? (
								<div className="recent-block-mobile-view">
									{
										this.getBlocks().map((data) => (
											<Link to={BLOCK_INFORMATION_PATH.replace(/:round/, data.round)} key={data.round} className="recent-block-element">
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
															to={URLHelper.createUrlById(data.producerId)}
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
													<div className="title">Weight</div>
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
													<Link to={BLOCK_INFORMATION_PATH.replace(/:round/, data.round)} className="divTableRow">
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
																	to={URLHelper.createUrlById(data.producerId)}
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
									</div>
								</div>
							))
						}
					</Media>
					<LoadMoreBtn title={LOAD_MORE_TEMPLATE.BLOCK_TABLE} loading={loading} loadMore={() => this.props.loadBlocks()} />
				</div>
			</div>
		);
	}

}

RecentBlockTable.propTypes = {
	loading: PropTypes.bool.isRequired,
	blocks: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	loadBlocks: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
};

export default withRouter(connect(
	(state) => ({
		loading: state.block.get('loading'),
		blocks: state.block.get('blocks'),
	}),
	(dispatch) => ({
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		loadBlocks: () => dispatch(setMaxDisplayedBlocks()),
	}),
)(RecentBlockTable));
