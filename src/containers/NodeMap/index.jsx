import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NetworkActions from '../../actions/NetworkActions';

import NodeMap from '../../components/NodeMap';

export default withRouter(connect(
	(state) => ({
		peers: state.network.get('peers'),
	}),
	(dispatch) => ({
		getPeers: (connected) => dispatch(NetworkActions.getPeers(connected)),
	}),
)(NodeMap));
