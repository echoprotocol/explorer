
import { connect } from 'react-redux';

import TotalSupply from '../../components/Sidebar/TotalSupply';

export default connect(
	(state) => ({
		assets: state.statistics.get('assets'),
	}),
	() => ({}),
)(TotalSupply);
