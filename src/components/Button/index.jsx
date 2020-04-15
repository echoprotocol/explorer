import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Button = ({ children, className, ...props }) => (
	<button {...props} className={cn(className, 'btn')}>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.oneOf(['primary-btn']),
};

Button.defaultProps = {
	className: 'primary-btn',
};

export default Button;
