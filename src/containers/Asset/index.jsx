import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Asset from '../../components/Asset';
import { getFullAssetInformation } from '../../actions/AssetActions';
import GlobalActions from '../../actions/GlobalActions';

export default withRouter(connect(
	(state) => ({
		isMobile: state.global.get('isMobile'),
	}),
	(dispatch) => ({
		getAssetInfo: (id) => dispatch(getFullAssetInformation(id)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(Asset));
