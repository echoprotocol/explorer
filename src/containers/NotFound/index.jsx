import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NotFound from '../../components/NotFound';
import GlobalReducer from '../../reducers/GlobalReducer';

export default withRouter(connect(
	() => ({}),
	(dispatch) => ({
		resetErrorPath: () => dispatch(GlobalReducer.actions.set({ field: 'errorPath', value: false })),
	})
	,
)(NotFound));
