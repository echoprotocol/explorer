import React from 'react';
import PropTypes from 'prop-types';

const TooltipIcon = React.memo(({ filled }) => (
	filled ?
		<svg width="11" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M5.33 9.7C2.73 9.7.63 7.5.63 5S2.73.3 5.33.3a4.7 4.7 0 110 9.4zm0-7.2c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5zm0 2c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5V5c0-.3-.2-.5-.5-.5z" />
		</svg> :
		<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9">
			<path d="M4.5 2c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5zm0-2C2 0 0 2 0 4.5S2 9 4.5 9 9 7 9 4.5 7 0 4.5 0zm0 8C2.6 8 1 6.4 1 4.5S2.6 1 4.5 1 8 2.6 8 4.5 6.4 8 4.5 8zm0-4c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.3-.2-.5-.5-.5z" fillRule="evenodd" clipRule="evenodd" />
		</svg>

));

TooltipIcon.propTypes = {
	filled: PropTypes.bool.isRequired,
};

export default TooltipIcon;
