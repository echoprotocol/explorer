import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import searchActions from '../../actions/SearchActions';

import Navigation from '../../containers/Navigation';
import PreparingSection from '../../containers/PreparingSection';

class Header extends React.Component {

	render() {

		const {
			hints, getHints, loadingSearch, errorSearch, isMobile,
		} = this.props;

		return (
			<div className="top-section">
				<Navigation
					isMobile={isMobile}
					loadingSearch={loadingSearch}
					errorSearch={errorSearch}
					hints={hints}
					getHints={getHints}
				/>
				<PreparingSection />
			</div>
		);
	}

}

Header.propTypes = {
	isMobile: PropTypes.bool.isRequired,
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
		isMobile: state.global.get('isMobile'),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(searchActions.headerSearchHint(str)),
	}),
)((Header)));
