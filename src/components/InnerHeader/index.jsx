import React from 'react';
import PropTypes from 'prop-types';

const InnerHeader = ({
	children, title, className, withTopPanel,
}) => (
	<div className={`inner-header ${className}`}>
		<div className="inner-header__title h2">{title}</div>
		{withTopPanel ?
			<div className="inner-header__top-panel">
				{children}
			</div> :
			<React.Fragment>{ children }</React.Fragment>
		}

	</div>
);


InnerHeader.propTypes = {
	children: PropTypes.element,
	title: PropTypes.string,
	className: PropTypes.string,
	withTopPanel: PropTypes.bool,
};

InnerHeader.defaultProps = {
	children: null,
	title: '',
	className: '',
	withTopPanel: false,
};
export default InnerHeader;
