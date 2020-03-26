import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';


class Navigation extends React.Component {

	render() {
		const {
			history, hints, getHints, loadingSearch, errorSearch, isMobileDevice,
		} = this.props;
		return (
			<div className="wrap sm">
				<Header
					isMobileDevice={isMobileDevice}
					errorSearch={errorSearch}
					loadingSearch={loadingSearch}
					hints={hints}
					history={history}
					getHints={getHints}
				/>
			</div>
		);
	}

}

Navigation.propTypes = {
	history: PropTypes.object,
	errorSearch: PropTypes.string,
	hints: PropTypes.array,
	loadingSearch: PropTypes.bool,
	isMobileDevice: PropTypes.bool.isRequired,
	getHints: PropTypes.func,
};

Navigation.defaultProps = {
	hints: [],
	errorSearch: '',
	history: {},
	loadingSearch: false,
	getHints: () => {},
};

export default Navigation;
