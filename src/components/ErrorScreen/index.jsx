import React from 'react';
import PropTypes from 'prop-types';
import Logotype from '../../components/Logotype';

class ErrorScreen extends React.Component {

	reload() {
		window.location.reload();
	}


	render() {
		const { error } = this.props;
		return (
			<div className="not-found-page bad-internet">
				<div className="logo-container"><Logotype onClick={() => this.reload()} /></div>


				<div className="container">
					<div className="img" />
					<div className="txt-block">
						<div className="title">{ error }</div>
						<button className="n-f-button" onClick={() => this.reload()}>TRY AGAIN</button>
					</div>
				</div>
			</div>
		);
	}

}

ErrorScreen.propTypes = {
	error: PropTypes.string.isRequired,
};

export default ErrorScreen;
