import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BackwardsLink from '../../components/BackwardLink';

const InnerHeader = React.memo(({
	children, title, className, returnFunction,
}) => (
	<div className={cn('inner-header', className)}>
		<div className="inner-header-line">
			{returnFunction && <BackwardsLink returnFunction={returnFunction} />}
			{title && <div className="inner-header-title"> {title}</div>}
			{children && children}
		</div>
	</div>
));


InnerHeader.propTypes = {
	title: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	returnFunction: PropTypes.func,
};

InnerHeader.defaultProps = {
	title: '',
	children: null,
	className: '',
	returnFunction: null,
};
export default InnerHeader;
