import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';

import FormatHelper from '../../helpers/FormatHelper';
import BlockReducer from '../../reducers/BlockReducer';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import GlobalActions from '../../actions/GlobalActions';
import { BLOCK_INFORMATION_PATH, SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { BLOCKS_GRID } from '../../constants/TableConstants';

import BlocksTable from '../../components/BlocksTable';
import InnerHeader from '../../components/InnerHeader';


class BlocksTablePage extends React.Component {

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.BLOCKS_TABLE);
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

	goToBlock(e, block) {
		e.preventDefault();
		Router.push(SSR_BLOCK_INFORMATION_PATH, BLOCK_INFORMATION_PATH.replace(/:round/, block));
	}

	render() {
		const { router, filterAndPaginateData } = this.props;
		return (
			<div className="inner-container blocks-page">
				<InnerHeader title="Blocks list" />
				<BlocksTable
					router={router}
					isAllBlocks
					goToBlock={(e, block) => this.goToBlock(e, block)}
					blocks={this.getBlocks()}
					filterAndPaginateData={filterAndPaginateData.toJS()}
				/>
			</div>
		);
	}

}

BlocksTablePage.propTypes = {
	blocks: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
	filterAndPaginateData: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
};


export default withRouter(connect(
	(state) => ({
		loading: state.block.get('loading'),
		blocks: state.block.get('blocks'),
		latestBlock: state.round.get('latestBlock'),
		filterAndPaginateData: state.grid.get(BLOCKS_GRID),
	}),
	(dispatch) => ({
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(BlocksTablePage));
