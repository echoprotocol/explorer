import { connect } from 'react-redux';

import Asset from '../../components/Asset';

export default connect((state) => ({
	isMobile: state.global.get('isMobile'),
}))(Asset);
