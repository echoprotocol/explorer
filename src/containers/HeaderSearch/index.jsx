import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchFields from '../../components/SearchFields';
import { headerSearchHint } from '../../actions/SearchActions';


export default withRouter(connect(
	(state) => ({
		hints: state.search.getIn(['headerSearch', 'hints']),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(headerSearchHint(str)),
	}),
)(SearchFields));
