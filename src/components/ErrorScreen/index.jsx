import React from 'react';
import PropTypes from 'prop-types';

import Logotype from '../../components/Logotype';
import { INDEX_PATH } from '../../constants/RouterConstants';

class ErrorScreen extends React.Component {

	render() {

		// const { error } = this.props;

		return (
			<div className="not-found-page bad-internet">
				<div className="logo-container"><Logotype onClick={() => this.props.history.push(INDEX_PATH)} /></div>
				<div className="container">
					<div className="img" />
					<div className="txt-block">
						<div className="title">Couldn&#39;t reach server or bad internet access</div>
						<button className="n-f-button" onClick={() => this.props.history.push(INDEX_PATH)}>TRY AGAIN</button>
					</div>
				</div>
			</div>
		);
	}

}

ErrorScreen.propTypes = {
	// error: PropTypes.string.isRequired,
	history: PropTypes.object.isRequired,
};

export default ErrorScreen;
