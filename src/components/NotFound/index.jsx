import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logotype from '../../components/Logotype';
import { INDEX_PATH } from '../../constants/RouterConstants';

class NotFound extends Component {

	render() {
		return (
			<div className="not-found-page">
				<div className="logo-container"><Logotype onClick={() => this.props.history.push(INDEX_PATH)} /></div>
				<div className="container">
					<div className="img" />
					<div className="txt-block">
						<div className="title">404</div>
						<div className="desc">page doesn&#39;t exist</div>
						<button className="n-f-button" onClick={() => this.props.history.push(INDEX_PATH)}>GO TO HOMEPAGE</button>
					</div>
				</div>
			</div>
		);
	}

}

NotFound.propTypes = {
	history: PropTypes.object.isRequired,
};

export default NotFound;
