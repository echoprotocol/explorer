import React from 'react';
import PropTypes from 'prop-types';

export const PrevButton = React.memo(({ reverse }) => (
	<div className="pg-arrow">
		<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 2.5L0 5V0l4 2.5z" />
		</svg>
		<div className="pg-arrow-caption">{reverse ? 'Next' : 'Previous'}</div>
	</div>
));

PrevButton.propTypes = {
	reverse: PropTypes.bool,
};

PrevButton.defaultProps = {
	reverse: false,
};
