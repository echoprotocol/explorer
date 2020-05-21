import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { OrderedMap } from 'immutable';
import queryString from 'query-string';

import FormatHelper from '../../helpers/FormatHelper';
import BlockReducer from '../../reducers/BlockReducer';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import GlobalActions from '../../actions/GlobalActions';
import { BLOCK_INFORMATION_PATH, SSR_BLOCK_INFORMATION_PATH, SSR_TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';
import { BLOCKS_GRID } from '../../constants/TableConstants';
import URLHelper from '../../helpers/URLHelper';

import BlocksTable from '../../components/BlocksTable';
import InnerHeader from '../../components/InnerHeader';
import { getBlocksByIndexes as getBlocks } from '../../actions/BlockActions';


class BlocksTablePage extends React.Component {

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.BLOCKS_TABLE);
	}

	getBlocks(blocks) {
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
		const {
			router, filterAndPaginateData, getBlocksByIndexes, latestBlock,
			blocksOnTable,
		} = this.props;
		return (
			<div className="inner-container blocks-page">
				<InnerHeader title="Blocks list" />
				<BlocksTable
					router={router}
					isAllBlocks
					goToBlock={(e, block) => this.goToBlock(e, block)}
					blocks={this.getBlocks(blocksOnTable)}
					filterAndPaginateData={filterAndPaginateData.toJS()}
					getBlocks={(page, size) => getBlocksByIndexes(page, size)}
					latestBlock={latestBlock}
				/>
			</div>
		);
	}

}

BlocksTablePage.propTypes = {
	blocksOnTable: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
	getBlocksByIndexes: PropTypes.func.isRequired,
	latestBlock: PropTypes.number.isRequired,
	latestOperations: PropTypes.array.isRequired,
	filterAndPaginateData: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
};

BlocksTablePage.getInitialProps = async ({ asPath, store }) => {
	let fetchedBlocks = new OrderedMap();
	let page;
	let onPage;
	if (asPath) {
		const { query: search } = queryString.parseUrl(asPath);
		page = search.p;
		onPage = search.l;
	}
	fetchedBlocks = (await store.dispatch(getBlocks(page, onPage))).blocks;
	return { blocks: fetchedBlocks };
};

export default withRouter(connect(
	(state) => ({
		loading: state.block.get('loading'),
		blocks: state.block.get('blocks'),
		blocksOnTable: state.block.get('blocksOnTable'),
		latestBlock: state.round.get('latestBlock'),
		latestOperations: state.block.get('latestOperations'),
		filterAndPaginateData: state.grid.get(BLOCKS_GRID),
	}),
	(dispatch) => ({
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		getBlocksByIndexes: (page, size) => dispatch(getBlocks(page, size)),
	}),
)(BlocksTablePage));
