import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { OrderedMap } from 'immutable';

import FormatHelper from '../../helpers/FormatHelper';
import BlockReducer from '../../reducers/BlockReducer';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import GlobalActions from '../../actions/GlobalActions';
import { BLOCK_INFORMATION_PATH, SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { BLOCKS_GRID } from '../../constants/TableConstants';

import BlocksTable from '../../components/BlocksTable';
import InnerHeader from '../../components/InnerHeader';
import { getBlocksByIndexes as getBlocks } from '../../actions/BlockActions';
import GridActions from '../../actions/GridActions';
import Loader from '../../components/Loader';


class BlocksTablePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loader: !props.blocksOnTable.size,
		};
	}

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.BLOCKS_TABLE);
	}

	async componentDidUpdate() {
		if (this.state.loader) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({
				loader: false,
			});
		}
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

	goToBlock(e, block) {
		e.preventDefault();
		Router.push(SSR_BLOCK_INFORMATION_PATH, BLOCK_INFORMATION_PATH.replace(/:round/, block));
	}

	renderLoader() {
		return <Loader />;
	}

	render() {
		const {
			router, filterAndPaginateData, getBlocksByIndexes,
			blocksOnTable, initData, loading,
		} = this.props;
		return (
			<div className="inner-container blocks-page">
				<InnerHeader title="Blocks list" />
				{(loading || this.state.loader) ? this.renderLoader() : <BlocksTable
					router={router}
					isAllBlocks
					goToBlock={(e, block) => this.goToBlock(e, block)}
					blocks={this.getBlocks(blocksOnTable)}
					filterAndPaginateData={filterAndPaginateData.toJS()}
					getBlocks={() => getBlocksByIndexes()}
					initData={initData}
				/>}
			</div>
		);
	}

}

BlocksTablePage.propTypes = {
	blocksOnTable: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
	getBlocksByIndexes: PropTypes.func.isRequired,
	filterAndPaginateData: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
	initData: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

BlocksTablePage.getInitialProps = async ({ store }) => {
	let fetchedBlocks = new OrderedMap();
	await store.dispatch(GridActions.initData(BLOCKS_GRID));
	fetchedBlocks = (await store.dispatch(getBlocks())).blocks;
	return { blocks: fetchedBlocks };
};

export default withRouter(connect(
	(state) => ({
		loading: state.block.get('loading'),
		blocks: state.block.get('blocks'),
		blocksOnTable: state.block.get('blocksOnTable'),
		filterAndPaginateData: state.grid.get(BLOCKS_GRID),
	}),
	(dispatch) => ({
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		getBlocksByIndexes: () => dispatch(getBlocks()),
		initData: (params) => dispatch(GridActions.initData(BLOCKS_GRID, params)),
	}),
)(BlocksTablePage));
