import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NotFound from '../../components/Error/NotFoundScreen';
import GlobalActions from '../../actions/GlobalActions';

export default withRouter(connect(
	() => ({}),
	(dispatch) => ({
		resetErrorPath: () => dispatch(GlobalActions.toggleErrorPath(false)),
	})
	,
)(NotFound));
