import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import BN from 'bignumber.js';

import OperationsTable from '../../containers/OperationsTable';
import BreadCrumbs from '../InformationBreadCrumbs';
import ViewListPopover from '../ViewListPopover';
import TableLabel from '../TableLabel';
import InnerHeader from '../InnerHeader';
import Loader from '../Loader';
import DistributionTable from './DistributionTable';

import {
	INDEX_PATH,
	SSR_ACCOUNTS_PATH,
	SSR_BLOCK_INFORMATION_PATH,
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
		Router.push(INDEX_PATH);
	}

	renderLoader() {
		return <Loader />;
	}

	renderBlockInformation(blockInformation, latestBlock) {
		const { toggleRewardDistribution, isDistributionRewardOpen, filteredOperations } = this.props;

		const formattedBlockNumber = blockInformation.get('blockNumber') || '';
		const time = FormatHelper.timestampToBlockInformationTime(blockInformation.get('timestamp'));
		const producer = blockInformation.get('producer') || {};
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const transactionCount = blockInformation.get('transactionCount') || 0;
		const operationCount = blockInformation.get('operations').size || transactionCount;
		const rewardDistribution = blockInformation.get('rewardDistribution');
		const label = FormatHelper.getFormatTransactionsOperationTitle(transactionCount, operationCount);
		const breadcrumbs = [
			{
				title: 'Blocks list',
				as: INDEX_PATH,
				href: INDEX_PATH,
			},
		];

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
				<InnerHeader returnFunction={() => this.returnFunction()} title={`Block ${formattedBlockNumber}`} />
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
						<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrl(producer.name)}>
							<a className="link value blue">{producer.name}</a>
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
