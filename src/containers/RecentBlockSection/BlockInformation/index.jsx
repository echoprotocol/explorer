import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BlockInformation from '../../../components/BlockInformation';
import { getBlockInformation, clearBlockInformation } from '../../../actions/BlockActions';
import GlobalActions from '../../../actions/GlobalActions';

export default withRouter(connect(
	(state) => ({
		blockInformation: state.block.get('blockInformation'),
		historyLength: state.global.get('historyLength'),
		latestBlock: state.round.get('latestBlock'),
	}),
	(dispatch, props) => ({
		getBlockInfo: (round = props.match.params.round) => dispatch(getBlockInformation(round)),
		clearBlockInfo: () => dispatch(clearBlockInformation()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	})
	,
)(BlockInformation));
