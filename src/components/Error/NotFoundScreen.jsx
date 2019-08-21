import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { INDEX_PATH } from '../../constants/RouterConstants';
import BaseError from './index';

class NotFoundScreen extends Component {

	goToHome() {
		this.props.resetErrorPath();
		this.props.history.push(INDEX_PATH);
	}

	render() {
		return (
			<BaseError
				titlePage="404"
				titleButton="GO TO HOMEPAGE"
				description={"page doesn't exist"}
				onHandler={() => this.goToHome()}
			/>
		);
	}

}

NotFoundScreen.propTypes = {
	history: PropTypes.object.isRequired,
	resetErrorPath: PropTypes.func.isRequired,
};

export default NotFoundScreen;
