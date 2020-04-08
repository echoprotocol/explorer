import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import BlockInformation from '../../../components/BlockInformation';
import { getBlockInformation, clearBlockInformation, toggleRewardDistribution } from '../../../actions/BlockActions';
import GlobalActions from '../../../actions/GlobalActions';
import GridActions from '../../../actions/GridActions';
import { BLOCK_GRID } from '../../../constants/TableConstants';

export default withRouter(connect(
	(state) => ({
		filterAndPaginateData: state.grid.get(BLOCK_GRID),
		blockInformation: state.block.get('blockInformation'),
		historyLength: state.global.get('historyLength'),
		isDistributionRewardOpen: state.block.get('isDistributionRewardOpen'),
		latestBlock: state.round.get('latestBlock'),
	}),
	(dispatch) => ({
		setTotalDataSize: (count) => dispatch(GridActions.setTotalDataSize(BLOCK_GRID, count)),
		getBlockInfo: (round) => dispatch(getBlockInformation(round)),
		clearBlockInfo: () => dispatch(clearBlockInformation()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		toggleRewardDistribution: () => dispatch(toggleRewardDistribution()),
	}),
)(BlockInformation));
