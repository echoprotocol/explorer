import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const ArrowBtn = ({ children, ...props }) => (
	<button {...props} className={cn('arrow-btn', 'btn')}>
		{children}
		<svg width="19" height="9" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M14.35.65l3.86 3.85-3.86 3.85-.7-.7L16.29 5H0V4h16.3l-2.65-2.65.7-.7z" />
		</svg>
	</button>
);

ArrowBtn.propTypes = {
	children: PropTypes.any.isRequired,
};

export default ArrowBtn;
