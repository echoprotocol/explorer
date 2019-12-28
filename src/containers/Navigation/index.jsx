import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';


class Navigation extends React.Component {

	render() {
		const {
			history, hints, getHints, loadingSearch, errorSearch,
		} = this.props;
		console.log('Navigation hints', hints)

		return (
			<div className="wrap">
				<Header
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
