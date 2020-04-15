import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { INDEX_PATH } from '../../constants/RouterConstants';
import BaseError from './index';

class NotFoundScreen extends Component {

	goToHome() {
		this.props.resetErrorPath();
		Router.push(INDEX_PATH);
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
	resetErrorPath: PropTypes.func,
};

NotFoundScreen.defaultProps = {
	resetErrorPath: () => {},
};

export default NotFoundScreen;
