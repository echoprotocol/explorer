import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Loader extends Component {

	render() {
		const { global, text } = this.props;

		return (
			<div className={classnames({ 'app-loader': global })} >
				<div className="f-h-loader">
					<div className="spin" />
					<div className="text">{text}</div>
				</div>
			</div>
		);
	}

}

Loader.propTypes = {
	text: PropTypes.string,
	global: PropTypes.bool,
};

Loader.defaultProps = {
	text: 'Please wait while data is loading',
	global: false,
};

export default Loader;
