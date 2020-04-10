
import { connect } from 'react-redux';

import TotalSupply from '../../components/Sidebar/TotalSupply';
import StatisticsActions from '../../actions/StatisticsActions';

export default connect(
	(state) => ({
		assets: state.statistics.get('assets'),
	}),
	(dispatch) => ({
		getAssetInformationByIds: (assetIds) => dispatch(StatisticsActions.getAssetInformationByIds(assetIds)),
	}),
)(TotalSupply);
