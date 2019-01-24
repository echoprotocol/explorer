import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';


class Navigation extends React.Component {

	render() {
		const {
			history, hints, getHints,
		} = this.props;
		return (
			<div className="wrap">
				<Header
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
	hints: PropTypes.array,
	getHints: PropTypes.func,
};

Navigation.defaultProps = {
	hints: [],
	history: {},
	getHints: () => {},
};

export default Navigation;
