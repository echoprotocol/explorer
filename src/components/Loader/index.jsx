import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loader extends Component {

	render() {
		return (
			<div className="f-h-loader">
				<div className="spin" />
				<div className="text">{this.props.text}</div>
			</div>
		);
	}

}

Loader.propTypes = {
	text: PropTypes.string,
};

Loader.defaultProps = {
	text: 'Please wait while data is loading',
};

export default Loader;
