import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';


class Navigation extends React.Component {

	render() {
		const {
			hints, getHints, loadingSearch, errorSearch, isMobile,
		} = this.props;
		return (
			<div className="wrap sm">
				<Header
					isMobile={isMobile}
					errorSearch={errorSearch}
					loadingSearch={loadingSearch}
					hints={hints}
					getHints={getHints}
				/>
			</div>
		);
	}

}

Navigation.propTypes = {
	isMobile: PropTypes.bool.isRequired,
	errorSearch: PropTypes.string,
	hints: PropTypes.array,
	loadingSearch: PropTypes.bool,
	getHints: PropTypes.func,
};

Navigation.defaultProps = {
	hints: [],
	errorSearch: '',
	loadingSearch: false,
	getHints: () => {},
};

export default Navigation;
