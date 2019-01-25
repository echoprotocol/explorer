import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BlockInformation from '../../../components/BlockInformation';
import { getBlockInformation, clearBlockInformation } from '../../../actions/BlockActions';

export default withRouter(connect(
	(state) => ({
		blockInformation: state.block.get('blockInformation'),
		historyLength: state.global.get('historyLength'),
	}),
	(dispatch, props) => ({
		getBlockInfo: (round = props.match.params.round) => dispatch(getBlockInformation(round)),
		clearBlockInfo: () => dispatch(clearBlockInformation()),
	})
	,
)(BlockInformation));
