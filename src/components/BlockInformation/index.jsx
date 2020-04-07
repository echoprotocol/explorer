import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { List } from 'immutable';
import BN from 'bignumber.js';

import OperationsTable from '../../containers/OperationsTable';
import BreadCrumbs from '../InformationBreadCrumbs';
import BackwardsLink from '../../components/BackwardLink';
import ViewListPopover from '../ViewListPopover';
import TableLabel from '../TableLabel';
import InnerHeader from '../InnerHeader';
import Loader from '../Loader';
import DistributionTable from './DistributionTable';

import { INDEX_PATH } from '../../constants/RouterConstants';
import { BLOCK_GRID } from '../../constants/TableConstants';
import { TITLE_TEMPLATES, ECHO_ASSET } from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';


class BlockInformation extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			operations: null,
			currentBlockNumber: '',
			loader: false,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { sizePerPage } = nextProps.filterAndPaginateData.toJS();
		if (!prevState.operations && nextProps.blockInformation.get('round')) {
			return {
				operations: nextProps.blockInformation.get('operations').slice(0, sizePerPage),
			};
		}
		return null;
	}

	componentDidMount() {
		this.props.getBlockInfo();
	}

	shouldComponentUpdate(nextProps) {
		if (this.state.currentBlockNumber !== nextProps.blockInformation.get('blockNumber')) {
			this.setState({
				loader: false,
				currentBlockNumber: nextProps.blockInformation.get('blockNumber'),
			});
		}

		return true;
	}

	componentDidUpdate(prevProps) {
		if (this.props.blockInformation) {
			this.props.setTitle(TITLE_TEMPLATES.BLOCK.replace(/round/, this.props.match.params.round));
		}
		if (
			this.props.match.params.round !== prevProps.match.params.round ||
			(this.props.latestBlock > prevProps.latestBlock && (new BN(this.props.latestBlock).eq(new BN(this.state.currentBlockNumber).plus(1))))
		) {
			this.props.getBlockInfo(this.props.match.params.round);
		}
	}

	componentWillUnmount() {
		this.props.clearBlockInfo();
	}

	onBlockLink(blockNumber, e) {
		e.preventDefault();
		this.setState({ loader: true });

		this.props.history.push(URLHelper.createBlockUrl(blockNumber));
	}

	returnFunction() {
		this.props.history.push(INDEX_PATH);
	}

	loadMoreTransactions() {
		let operations = this.props.blockInformation.get('operations') || new List([]);
		const { filters: { from, to }, currentPage, sizePerPage } = this.props.filterAndPaginateData.toJS();
		operations = operations.filter((operation) => {
			const isAllowFrom = from ? (from === operation.mainInfo.from.name || from === operation.mainInfo.from.id) : true;
			const isAllowTo = to ? (to === operation.mainInfo.subject.name || to === operation.mainInfo.subject.id) : true;
			return isAllowFrom && isAllowTo;
		});
		this.props.setTotalDataSize(operations.size);
		operations = operations.slice((currentPage - 1) * sizePerPage, currentPage * sizePerPage);
		this.setState({ operations });
	}

	renderLoader() {
		return <Loader />;
	}

	renderBlockInformation(blockInformation, latestBlock) {
		const { toggleRewardDistribution, isDistributionRewardOpen } = this.props;
		const { operations } = this.state;

		const formattedBlockNumber = blockInformation.get('blockNumber') || '';
		const time = blockInformation.get('time');
		const producer = blockInformation.get('producer') || {};
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const transactionCount = blockInformation.get('transactionCount') || 0;
		const rewardDistribution = blockInformation.get('rewardDistribution');

		const breadcrumbs = [
			{
				title: 'Blocks list',
				path: INDEX_PATH,
			},
		];

		const blockNumber = Number(FormatHelper.removeCommas(formattedBlockNumber));

		return (
			<React.Fragment>
				<InnerHeader title={`Block ${formattedBlockNumber}`} withTopPanel>
					<BackwardsLink returnFunction={() => this.returnFunction()} />
					<BreadCrumbs
						breadcrumbs={breadcrumbs}
						returnFunction={() => this.returnFunction()}
					/>
					<div className="block-navigation">
						<button
							className={classnames('prev', { active: blockNumber > 1 })}
							disabled={blockNumber <= 1}
							onClick={(e) => this.onBlockLink(blockNumber - 1, e)}
						>
							Older block
						</button>
						<button
							className={classnames('next', { active: latestBlock !== blockNumber })}
							disabled={latestBlock === blockNumber}
							onClick={(e) => this.onBlockLink(blockNumber + 1, e)}
						>
							Next block
						</button>
					</div>
				</InnerHeader>
				<div className="block-description">
					<div className="container time">
						<div className="title">Date, time</div>
						<div className="value">{time}</div>
					</div>
					<div className="container size">
						<div className="title">Size</div>
						<div className="value">{size}</div>
					</div>
					<div className="container producer">
						<div className="title">Producer</div>
						<Link to={URLHelper.createAccountUrl(producer.name)}>
							<div className="value blue">{producer.name}</div>
						</Link>
					</div>
					<div className="container verifiers">
						<div className="title">Verifiers</div>
						<div className="value">
							{(rewardDistribution && rewardDistribution.length) ? rewardDistribution.length - 1 : '—'}
						</div>
					</div>
					<div className="container reward">
						<div className="title">Reward</div>
						<div className="value">{`${FormatHelper.formatAmount(reward, ECHO_ASSET.PRECISION)} ${ECHO_ASSET.SYMBOL}`}</div>
					</div>
				</div>

				<TableLabel label="Block Certificate">
					{
						rewardDistribution && rewardDistribution.length && (
							<ViewListPopover
								toggleReward={toggleRewardDistribution}
								isOpen={isDistributionRewardOpen}
							/>
						)
					}
				</TableLabel>
				{
					(rewardDistribution && rewardDistribution.length) ? (
						isDistributionRewardOpen &&
						<DistributionTable rewards={rewardDistribution} />
					) : (
						<TableLabel label="Certificate list will be available after next block will be produced" />
					)
				}
				<div className="blocks-table-wrap">
					{ (transactionCount) ?
						<OperationsTable
							gridName={BLOCK_GRID}
							onLoadMoreHistory={() => this.loadMoreTransactions()}
							label={FormatHelper.getFormatTransactionsTitle(transactionCount)}
							fee
							operations={operations}
							history={this.props.history}
							location={this.props.location}
						/> : null
					}
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { blockInformation, latestBlock } = this.props;
		return (
			<div className="inner-information-container">
				{
					!blockInformation.get('blockNumber') || this.state.loader ?
						this.renderLoader() : this.renderBlockInformation(blockInformation, latestBlock)
				}
			</div>
		);
	}

}

BlockInformation.propTypes = {
	filterAndPaginateData: PropTypes.object.isRequired,
	latestBlock: PropTypes.number.isRequired,
	blockInformation: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
	setTotalDataSize: PropTypes.func.isRequired,
	toggleRewardDistribution: PropTypes.func.isRequired,
	isDistributionRewardOpen: PropTypes.bool.isRequired,
};

export default BlockInformation;
