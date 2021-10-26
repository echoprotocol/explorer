import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';

import FormatHelper from '../../helpers/FormatHelper';

import BlockReducer from '../../reducers/BlockReducer';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import GlobalActions from '../../actions/GlobalActions';
import { BLOCK_INFORMATION_PATH, SSR_BLOCK_INFORMATION_PATH, SSR_TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';
import LatestBlocksTable from '../../components/BlocksTable';
import LatestOperationsTable from './LatestOperationsTable';
import URLHelper from '../../helpers/URLHelper';


class MainPage extends React.Component {

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.MAIN);
	}

	getBlocks() {
		const { blocks } = this.props;
		const blocksResult = [];

		blocks.mapEntries(([key, value]) => {
			blocksResult.push({
				round: key,
				blockNumber: FormatHelper.formatAmount(key, 0),
				time: value.get('timestamp'),
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

	getOperations() {
		const { latestOperations } = this.props;
		const blockResult = [];
		if (latestOperations) {
			blockResult.push(...latestOperations);
		}

		return blockResult;
	}

	goToBlock(e, block) {
		e.preventDefault();
		Router.push(SSR_BLOCK_INFORMATION_PATH, BLOCK_INFORMATION_PATH.replace(/:round/, block));
	}

	goToTransaction(e, block, transaction, op, virtual) {
		e.preventDefault();
		const transactionUrl = URLHelper.createTransactionUrl(block, transaction + 1);
		const operationUrl = URLHelper.createTransactionOperationUrl(transactionUrl, op + 1, virtual);
		Router.push(SSR_TRANSACTION_INFORMATION_PATH, operationUrl);
	}

	render() {
		return (
			<div className="main-page">
				<div className="wrap">
					<LatestBlocksTable
						label="Latest Blocks"
						goToBlock={(e, block) => this.goToBlock(e, block)}
						blocks={this.getBlocks()}
					/>
					<LatestOperationsTable
						goToTransaction={(e, block, trx, op, virtual) => this.goToTransaction(e, block, trx, op, virtual)}
						operations={this.getOperations()}
						getOperations={() => this.getOperations()}
					/>
				</div>
			</div>
		);
	}

}

MainPage.propTypes = {
	blocks: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
	latestOperations: PropTypes.array.isRequired,
};

export default withRouter(connect(
	(state) => ({
		loading: state.block.get('loading'),
		blocks: state.block.get('blocks'),
		latestBlock: state.round.get('latestBlock'),
		latestOperations: state.block.get('latestOperations'),
	}),
	(dispatch) => ({
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(MainPage));
