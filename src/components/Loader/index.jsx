import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';


const Loader = ({ global, text }) => (
	<div className={cn({ 'app-loader': global })} >
		<div className="f-h-loader">
			<div className="spin" />
			<div className="text">{text}</div>
		</div>
	</div>
);


Loader.propTypes = {
	text: PropTypes.string,
	global: PropTypes.bool,
};

Loader.defaultProps = {
	text: 'Please wait while data is loading',
	global: false,
};

export default Loader;
