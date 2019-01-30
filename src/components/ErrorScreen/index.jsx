import React from 'react';
import PropTypes from 'prop-types';

class ErrorScreen extends React.Component {

	render() {

		const { error } = this.props;

		return (
			<div className="f-h-loader">
				<span className="txt">{error}</span>
			</div>
		);
	}

}

ErrorScreen.propTypes = {
	error: PropTypes.string.isRequired,
};

export default ErrorScreen;
