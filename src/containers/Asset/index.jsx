import { connect } from 'react-redux';

import Asset from '../../components/Asset';

import GlobalActions from '../../actions/GlobalActions';
import { getFullAssetInformation } from '../../actions/AssetActions';

export default connect(
	(state) => ({
		asset: state.asset.get('asset'),
		issuer: state.asset.get('issuer'),
	}),
	(dispatch) => ({
		getAssetInfo: (id) => dispatch(getFullAssetInformation(id)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(Asset);
