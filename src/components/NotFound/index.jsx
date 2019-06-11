import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logotype from '../../components/Logotype';
import { INDEX_PATH } from '../../constants/RouterConstants';

class NotFound extends Component {

	goToHome() {
		this.props.resetErrorPath();
		this.props.history.push(INDEX_PATH);
	}

	render() {
		return (
			<div className="not-found-page">
				<div className="logo-container"><Logotype onClick={() => this.goToHome()} /></div>
				<div className="container">
					<div className="img" />
					<div className="txt-block">
						<div className="title">404</div>
						<div className="desc">page doesn&#39;t exist</div>
						<button className="n-f-button" onClick={() => this.goToHome()}>GO TO HOMEPAGE</button>
					</div>
				</div>
			</div>
		);
	}

}

NotFound.propTypes = {
	history: PropTypes.object.isRequired,
	resetErrorPath: PropTypes.func.isRequired,
};

export default NotFound;
