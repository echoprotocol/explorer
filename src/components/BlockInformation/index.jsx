import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import classnames from 'classnames';
import BN from 'bignumber.js';

import OperationsTable from '../../containers/OperationsTable';
import BreadCrumbs from '../InformationBreadCrumbs';
import BackwardsLink from '../BackwardLink';
import ViewListPopover from '../ViewListPopover';
import TableLabel from '../TableLabel';
import InnerHeader from '../InnerHeader';
import Loader from '../Loader';
import DistributionTable from './DistributionTable';
import InfoBlock from '../InfoBlock';
import InfoBlockItem from '../InfoBlock/InfoBlockItem';

import {
	INDEX_PATH,
	SSR_ACCOUNTS_PATH,
	SSR_BLOCK_INFORMATION_PATH,
	BLOCKS_TABLE_PATH,
} from '../../constants/RouterConstants';
import { BLOCK_GRID } from '../../constants/TableConstants';

import { TITLE_TEMPLATES, ECHO_ASSET } from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';
import { getBlockInformation } from '../../actions/BlockActions';
import GridActions from '../../actions/GridActions';


class BlockInformation extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentBlockNumber: '',
			loader: false,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (!prevState.operations && nextProps.blockInformation.get('round')) {
			return {
				currentBlockNumber: nextProps.blockInformation.get('blockNumber'),
			};
		}
		return null;
	}

	componentDidMount() {
		const { router: { query: { round } }, blockInformation } = this.props;
		if (blockInformation.get('blockNumber') !== round) {
			this.onResetFilter().then(() => {
				this.props.getBlockInfo(round);
			});
		}
	}

	async shouldComponentUpdate(nextProps) {
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
			this.props.setTitle(TITLE_TEMPLATES.BLOCK.replace(/round/, this.props.router.query.round));
		}
		if (
			this.props.router.query.round !== prevProps.router.query.round ||
			(this.props.latestBlock > prevProps.latestBlock && (new BN(this.props.latestBlock).eq(new BN(this.state.currentBlockNumber).plus(1))))
		) {
			this.onResetFilter().then(() => {
				this.props.getBlockInfo(this.props.router.query.round);
			});
		}
	}

	componentWillUnmount() {
		this.props.clearBlockInfo();
	}

	async onResetFilter() {
		return Promise.all([
			this.props.onSetFilter({ from: '', to: '' }),
			this.props.onSetPage(1),
		]);
	}

	onBlockLink(blockNumber, e) {
		e.preventDefault();
		this.setState({ loader: true });
		Router.push(SSR_BLOCK_INFORMATION_PATH, URLHelper.createBlockUrl(blockNumber));
	}

	onLoadMoreHistory() {
		this.props.loadBlockHistory();
	}

	returnFunction() {
		const { previousPath } = this.props;
		Router.push(previousPath === BLOCKS_TABLE_PATH ? previousPath : INDEX_PATH);
	}

	renderLoader() {
		return <Loader />;
	}

	renderBlockInformation(blockInformation, latestBlock) {
		const {
			toggleRewardDistribution, isDistributionRewardOpen, filteredOperations, previousPath,
		} = this.props;

		const formattedBlockNumber = blockInformation.get('blockNumber') || '';
		const time = FormatHelper.timestampToBlockInformationTime(blockInformation.get('timestamp'));
		const producer = blockInformation.get('producer') || {};
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const otherAssetsRewards = blockInformation.get('otherAssetsRewards');
		const transactionCount = blockInformation.get('transactionCount') || 0;
		const operationCount = blockInformation.get('operations').size || transactionCount;
		const rewardDistribution = blockInformation.get('rewardDistribution');
		const label = FormatHelper.getFormatTransactionsOperationTitle(operationCount, transactionCount);
		const path = previousPath === BLOCKS_TABLE_PATH ? previousPath : INDEX_PATH;
		const breadcrumbs = [
			{
				title: 'Blocks list',
				as: path,
				href: path,
			},
		];
		const isOtherAssetsRewards = !!otherAssetsRewards.length;

		const blockNumber = Number(FormatHelper.removeCommas(formattedBlockNumber));
		return (
			<React.Fragment>
				<div className="page-breadcrumbs">
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
							Previous block
						</button>
						<button
							className={classnames('next', { active: latestBlock !== blockNumber })}
							disabled={latestBlock === blockNumber}
							onClick={(e) => this.onBlockLink(blockNumber + 1, e)}
						>
							Next block
						</button>
					</div>
				</div>
				<InnerHeader>
					<BackwardsLink returnFunction={() => this.returnFunction()} className="move-top" />
					<div className="inner-header-title">{`Block ${formattedBlockNumber}`}</div>
				</InnerHeader>
				<InfoBlock>
					<InfoBlockItem title="Date, time" value={time} className="time" />
					<InfoBlockItem title="Size" value={size} className="size" />
					<InfoBlockItem
						title="Producer"
						value={producer.name}
						isLink
						href={SSR_ACCOUNTS_PATH}
						as={URLHelper.createAccountUrl(producer.name)}
						className="producer"
					/>
					<InfoBlockItem
						title="Verifiers"
						value={(rewardDistribution && rewardDistribution.length) ? rewardDistribution.length - 1 : '—'}
						className="verifiers"
					/>
					<InfoBlockItem
						title="Reward"
						value={`${isOtherAssetsRewards ? '~' : ''}${reward} ${ECHO_ASSET.SYMBOL}`}
						className="reward"
						withTooltip={isOtherAssetsRewards}
						overlay={otherAssetsRewards.join(', ')}
					/>
				</InfoBlock>

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
						<div className="distribution-table__empty-message">Certificate list will be available after next block will be produced</div>
					)
				}
				<div className="blocks-table-wrap">
					{ transactionCount ?
						<OperationsTable
							isASCOps
							gridName={BLOCK_GRID}
							onLoadMoreHistory={() => this.onLoadMoreHistory()}
							label={label}
							fee
							operations={filteredOperations}
							router={this.props.router}
						/> : null
					}
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { blockInformation, latestBlock } = this.props;
		return (
			<div className="inner-container">
				{ !blockInformation.get('blockNumber') || this.state.loader ?
					this.renderLoader() : this.renderBlockInformation(blockInformation, latestBlock)
				}
			</div>
		);
	}

}

BlockInformation.propTypes = {
	filteredOperations: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
	latestBlock: PropTypes.number.isRequired,
	blockInformation: PropTypes.object.isRequired,
	previousPath: PropTypes.string.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	loadBlockHistory: PropTypes.func.isRequired,
	toggleRewardDistribution: PropTypes.func.isRequired,
	isDistributionRewardOpen: PropTypes.bool.isRequired,
	onSetFilter: PropTypes.func.isRequired,
	onSetPage: PropTypes.func.isRequired,
};

BlockInformation.defaultProps = {};

BlockInformation.getInitialProps = async ({ query: { round, ...filters }, store }) => {
	await store.dispatch(GridActions.initData(BLOCK_GRID, filters));
	await store.dispatch(getBlockInformation(round));
	return {};
};

export default BlockInformation;
