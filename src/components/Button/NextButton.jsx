import React from 'react';
import PropTypes from 'prop-types';

export const NextButton = React.memo(({ reverse }) => (
	<div className="pg-arrow">
		<div className="pg-arrow-caption">{reverse ? 'Previous' : 'Next'}</div>
		<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 2.5L0 5V0l4 2.5z" />
		</svg>
	</div>
));

NextButton.propTypes = {
	reverse: PropTypes.bool,
};

NextButton.defaultProps = {
	reverse: false,
};
