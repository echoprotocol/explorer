import { connect } from 'react-redux';
import SearchFields from '../../components/SearchFields';
import { headerSearchHint } from '../../actions/SearchActions';


export default connect(
	(state) => ({
		hints: state.search.getIn(['headerSearch', 'hints']),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(headerSearchHint(str)),
	}),
)(SearchFields);
