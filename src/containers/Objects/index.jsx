import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Objects from '../../components/Objects';

import { getObjectInfo, setError } from '../../actions/ObjectsActions';
import GlobalActions from '../../actions/GlobalActions';

export default withRouter(connect(
	(state) => ({
		data: state.objects.get('data'),
		error: state.objects.get('error'),
	}),
	(dispatch) => ({
		getObjectInfo: (id) => dispatch(getObjectInfo(id)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		setError: (text) => dispatch(setError(text)),
	}),
)(Objects));
