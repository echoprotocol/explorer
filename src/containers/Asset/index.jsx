import { connect } from 'react-redux';

import Asset from '../../components/Asset';

import { getFullAssetInformation } from '../../actions/AssetActions';

export default connect(
	(state, props) => {
		const asset = state.echoCache.getIn(['objectsById', props.match.params.id]);
		if (!asset) {
			return { asset: null, issuer: null };
		}

		const issuer = state.echoCache.getIn(['objectsById', asset.get('issuer')]);

		if (!issuer) {
			return { asset: null, issuer: null };
		}

		return { asset, issuer };

	},
	(dispatch, props) => ({
		getAssetInfo: (id = props.match.params.id) => getFullAssetInformation(id),
	}),
)(Asset);
