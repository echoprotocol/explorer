import React from 'react';
import PropTypes from 'prop-types';

const InnerHeader = ({ children, title, className }) => (
	<div className={`inner-header ${className}`}>
		<div className="inner-header__title h2">{title}</div>
		{children}
	</div>
);


InnerHeader.propTypes = {
	children: PropTypes.element,
	title: PropTypes.string,
	className: PropTypes.string,
};

InnerHeader.defaultProps = {
	children: null,
	title: '',
	className: '',
};
export default InnerHeader;
