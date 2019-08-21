import React from 'react';
import PropTypes from 'prop-types';

import BaseError from './index';

class ErrorScreen extends React.Component {

	reload() {
		window.location.reload();
	}

	render() {
		const { error } = this.props;
		return (
			<BaseError
				typeError="bad-internet"
				titlePage={error}
				titleButton="TRY AGAIN"
				onHandler={() => this.reload()}
			/>
		);
	}

}

ErrorScreen.propTypes = {
	error: PropTypes.string.isRequired,
};

export default ErrorScreen;
