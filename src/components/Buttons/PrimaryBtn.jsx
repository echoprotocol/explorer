import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const PrimaryBtn = ({ children, ...props }) => (
	<button {...props} className={cn('primary-btn', 'btn')}>
		{children}
	</button>
);

PrimaryBtn.propTypes = {
	children: PropTypes.any.isRequired,
};

export default PrimaryBtn;
