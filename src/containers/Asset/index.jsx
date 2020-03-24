import { connect } from 'react-redux';

import Asset from '../../components/Asset';

import { getFullAssetInformation } from '../../actions/AssetActions';
import GlobalActions from '../../actions/GlobalActions';

export default connect(
	(state) => ({
		asset: state.asset.get('asset'),
		issuer: state.asset.get('issuer'),
	}),
	(dispatch, props) => ({
		getAssetInfo: (id = props.match.params.id) => dispatch(getFullAssetInformation(id)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(Asset);
