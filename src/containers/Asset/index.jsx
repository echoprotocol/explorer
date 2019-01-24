import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Asset from '../../components/Asset';

import { getFullAssetInformation } from '../../actions/AssetActions';

export default withRouter(connect(
	(state, props) => {
		const asset = state.echoCache.getIn(['objectsById', props.match.params.id]);
		if (!asset) {
			return { asset: {}, issuer: {} };
		}

		const issuer = state.echoCache.getIn(['objectsById', asset.get('issuer')]);

		if (!issuer) {
			return { asset: {}, issuer: {} };
		}

		// console.log(asset.toJS())
		return { asset, issuer };

	},
	(dispatch, props) => ({
		getAssetInfo: (id = props.match.params.id) => getFullAssetInformation(id),
	}),
)(Asset));
