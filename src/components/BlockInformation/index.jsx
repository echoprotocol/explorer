import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import OperationsTable from '../TransactionInfo/OperationsTable';
import BreadCrumbs from '../InformationBreadCrumbs';
import ViewListPopover from '../ViewListPopover';
import Loader from '../Loader';
import DistributionTable from './DistributionTable';

import { INDEX_PATH } from '../../constants/RouterConstants';
import { DEFAULT_TABLE_LENGTH } from '../../constants/TableConstants';
import { TITLE_TEMPLATES, ECHO_ASSET } from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

class BlockInformation extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentTransactionLength: DEFAULT_TABLE_LENGTH,
		};
	}

	componentDidMount() {
		this.props.getBlockInfo();
	}

	componentDidUpdate(prevProps) {
		if (this.props.blockInformation) {
			this.props.setTitle(TITLE_TEMPLATES.BLOCK.replace(/round/, this.props.match.params.round));
		}

		if (this.props.match.params.round !== prevProps.match.params.round) {
			this.props.getBlockInfo(this.props.match.params.round);
		}
	}

	componentWillUnmount() {
		this.props.clearBlockInfo();
	}

	onBlockLink(blockNumber, e) {
		e.preventDefault();

		this.props.history.push(URLHelper.createBlockUrl(blockNumber));
	}

	returnFunction() {
		if (!this.props.historyLength) {
			this.props.history.push(INDEX_PATH);
		} else {
			this.props.history.goBack();
		}
	}

	loadMoreTransactions() {
		this.setState({
			currentTransactionLength: this.state.currentTransactionLength + DEFAULT_TABLE_LENGTH,
		});
	}

	renderLoader() {
		return <Loader />;
	}

	renderBlockInformation(blockInformation, latestBlock) {

		const { toggleRewardDistribution, isDistributionRewardOpen } = this.props;
		const { currentTransactionLength } = this.state;

		const formattedBlockNumber = blockInformation.get('blockNumber') || '';
		const time = blockInformation.get('time');
		const producer = blockInformation.get('producer') || {};
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const operations = blockInformation.get('operations') || [];
		const transactionCount = blockInformation.get('transactionCount') || 0;
		const rewardDistribution = blockInformation.get('rewardDistribution');
		const slicedOperations = operations.slice(0, currentTransactionLength);

		let verifiers = blockInformation.get('verifiers') || [];
		verifiers = verifiers.map(({ name, id }) => ({ id, name, to: URLHelper.createAccountUrl(name) }));

		const breadcrumbs = [
			{
				title: 'Blocks list',
				path: INDEX_PATH,
			},
		];

		const blockNumber = Number(FormatHelper.removeCommas(formattedBlockNumber));

		return (
			<React.Fragment>
				<div className="block-navigation-wrap">
					<BreadCrumbs
						breadcrumbs={breadcrumbs}
						title={`Block ${formattedBlockNumber}`}
						returnFunction={() => this.returnFunction()}
					/>
					<div className="block-navigation">
						<button
							className={classnames('prev', { active: blockNumber > 1 })}
							disabled={blockNumber <= 1}
							onClick={(e) => this.onBlockLink(blockNumber - 1, e)}
						>
							Older <span>block</span>
						</button>
						<button
							className={classnames('next', { active: latestBlock !== blockNumber })}
							disabled={latestBlock === blockNumber}
							onClick={(e) => this.onBlockLink(blockNumber + 1, e)}
						>
							Next <span>block</span>
						</button>
					</div>
				</div>

				<div className="block-description">
					<div className="container time">
						<div className="title">Date, Time</div>
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
					<div className="container reward">
						<div className="title">Reward</div>
						<div className="value">{`${FormatHelper.formatAmount(reward, ECHO_ASSET.PRECISION)} ${ECHO_ASSET.SYMBOL}`}</div>
					</div>
					<div className="container verifiers">
						<div className="title">Verifiers</div>
						<div className="value">{verifiers && verifiers.length}<ViewListPopover list={verifiers} /></div>
					</div>
				</div>
				{
					(rewardDistribution && rewardDistribution.length) ? (
						<DistributionTable
							rewards={rewardDistribution}
							toggleReward={toggleRewardDistribution}
							isOpen={isDistributionRewardOpen}
						/>
					) : (
						<h2>Certificate list will be available after next block will be produced</h2>
					)
				}
				<h2>{FormatHelper.getFormatTransactionsTitle(transactionCount)}</h2>
				<div className="help-table-wrapper">
					{
						(slicedOperations && slicedOperations.length) ?
							<OperationsTable
								isBlock
								fee
								operations={slicedOperations}
								history={this.props.history}
								location={this.props.location}
								loadMore={currentTransactionLength < operations.length ? () => this.loadMoreTransactions() : null}
								hasMore={currentTransactionLength < operations.length}
							/> : null
					}
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { blockInformation, latestBlock } = this.props;

		return (
			<div className="table-container inner-information-container block-information account-page with-d-table">
				{
					blockInformation.get('blockNumber') ?
						this.renderBlockInformation(blockInformation, latestBlock) : this.renderLoader()
				}
			</div>
		);
	}

}

BlockInformation.propTypes = {
	historyLength: PropTypes.number,
	latestBlock: PropTypes.number.isRequired,
	blockInformation: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
	toggleRewardDistribution: PropTypes.func.isRequired,
	isDistributionRewardOpen: PropTypes.bool.isRequired,
};

BlockInformation.defaultProps = {
	historyLength: 0,
};

export default BlockInformation;
