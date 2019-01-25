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
			history, hints, getHints,
		} = this.props;

		return (
			<div>
				<div className="top-section">
					<Navigation
						history={history}
						hints={hints}
						getHints={getHints}
					/>
					<PreparingSection />
				</div>
			</div>
		);
	}

}

Header.propTypes = {
	history: PropTypes.object.isRequired,
	hints: PropTypes.array.isRequired,
	getHints: PropTypes.func.isRequired,
};

export default withRouter(connect(
	(state) => ({
		hints: state.search.getIn(['headerSearch', 'hints']),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(searchActions.headerSearchHint(str)),
	}),
)(Header));
