import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InternetPopup extends Component {

	render() {
		const { isConnected, isShow } = this.props;

		return !isShow ? null : (
			<div className={`internet-popup ${isConnected ? 'isConnected' : ''}`}>{(!isConnected) ? "Your computer seems to be offline. We'll keep trying to reconnect." : 'Connected!'}</div>
		);
	}

}

InternetPopup.propTypes = {
	isShow: PropTypes.bool,
	isConnected: PropTypes.bool,
};

InternetPopup.defaultProps = {
	isShow: false,
	isConnected: false,
};

export default InternetPopup;
