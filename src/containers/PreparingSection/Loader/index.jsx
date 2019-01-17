import React from 'react';
import PropTypes from 'prop-types';

class Loader extends React.Component {

	render() {

		const { status } = this.props;

		return (
			<div className="preparing-loader">
				<div className="line" style={{ width: `${status}%` }} />
			</div>
		);
	}

}

Loader.propTypes = {
	status: PropTypes.number,
};

Loader.defaultProps = {
	status: '',
};


export default Loader;
