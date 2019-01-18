import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Objects from '../../components/Objects';
import { getObjectInfo, setError } from '../../actions/ObjectsActions';


export default withRouter(connect(
	(state) => ({
		data: state.objects.get('data'),
		error: state.objects.get('error'),
	}),
	(dispatch, props) => ({
		getObjectInfo: (id) => dispatch(getObjectInfo(id)),
		setError: (text) => dispatch(setError(text)),
	})
)(Objects));