import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import BlockInformation from '../../../components/BlockInformation';
import {
	getBlockInformation,
	clearBlockInformation,
	toggleRewardDistribution,
	loadBlockHistory,
} from '../../../actions/BlockActions';
import GlobalActions from '../../../actions/GlobalActions';
import { BLOCK_GRID } from '../../../constants/TableConstants';
import GridActions from '../../../actions/GridActions';

export default withRouter(connect(
	(state) => ({
		filterAndPaginateData: state.grid.get(BLOCK_GRID),
		blockInformation: state.block.get('blockInformation'),
		filteredOperations: state.block.get('filteredOperations'),
		historyLength: state.global.get('historyLength'),
		isDistributionRewardOpen: state.block.get('isDistributionRewardOpen'),
		latestBlock: state.round.get('latestBlock'),
		previousPath: state.global.getIn(['history', 'route']),
	}),
	(dispatch) => ({
		onSetFilter: (params) => dispatch(GridActions.setFilter(BLOCK_GRID, params)),
		onSetPage: (newPage) => dispatch(GridActions.setPage(BLOCK_GRID, newPage)),
		getBlockInfo: (round) => dispatch(getBlockInformation(round)),
		clearBlockInfo: () => dispatch(clearBlockInformation()),
		loadBlockHistory: () => dispatch(loadBlockHistory()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		toggleRewardDistribution: () => dispatch(toggleRewardDistribution()),
	}),
)(BlockInformation));
