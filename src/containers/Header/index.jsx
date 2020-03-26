import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import searchActions from '../../actions/SearchActions';

import Navigation from '../../containers/Navigation';
import PreparingSection from '../../containers/PreparingSection';

class Header extends React.Component {

	render() {

		const {
			history, hints, getHints, loadingSearch, errorSearch, isMobileDevice,
		} = this.props;

		return (
			<div className="top-section">
				<Navigation
					isMobileDevice={isMobileDevice}
					loadingSearch={loadingSearch}
					errorSearch={errorSearch}
					history={history}
					hints={hints}
					getHints={getHints}
				/>
				<PreparingSection />
			</div>
		);
	}

}

Header.propTypes = {
	history: PropTypes.object.isRequired,
	hints: PropTypes.array.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	isMobileDevice: PropTypes.bool.isRequired,
	errorSearch: PropTypes.string.isRequired,
	getHints: PropTypes.func.isRequired,
};

export default withRouter(connect(
	(state) => ({
		hints: state.search.getIn(['headerSearch', 'hints']),
		errorSearch: state.search.getIn(['headerSearch', 'error']),
		loadingSearch: state.search.getIn(['headerSearch', 'loading']),
		isMobileDevice: state.global.get('isMobileDevice'),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(searchActions.headerSearchHint(str)),
	}),
)(Header));
