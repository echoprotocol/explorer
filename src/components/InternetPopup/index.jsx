import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InternetPopup extends Component {

	render() {

		const { isConnected } = this.props;

		return (
			<div className={`internet-popup ${isConnected ? 'isConnected' : ''}`}>{(!isConnected) ? "Your computer seems to be offline. We'll keep trying to reconnect." : 'Connected!'}</div>
		);
	}

}

InternetPopup.propTypes = {
	isConnected: PropTypes.bool,
};

InternetPopup.defaultProps = {
	isConnected: false,
};

export default InternetPopup;
