import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import searchActions from '../../actions/SearchActions';

import PreparingSection from '../PreparingSection';
import Header from '../../components/Header';

const HeaderContainer = React.memo(({
	hints, getHints, loadingSearch, errorSearch,
}) => (
	<div className="top-section">
		<div className="wrap">
			<Header
				errorSearch={errorSearch}
				loadingSearch={loadingSearch}
				hints={hints}
				getHints={getHints}
			/>
			<PreparingSection />
		</div>
	</div>
));


HeaderContainer.propTypes = {
	hints: PropTypes.array.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	errorSearch: PropTypes.string.isRequired,
	getHints: PropTypes.func.isRequired,
};

export default withRouter(connect(
	(state) => ({
		hints: state.search.getIn(['headerSearch', 'hints']),
		errorSearch: state.search.getIn(['headerSearch', 'error']),
		loadingSearch: state.search.getIn(['headerSearch', 'loading']),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(searchActions.headerSearchHint(str)),
	}),
)(HeaderContainer));
