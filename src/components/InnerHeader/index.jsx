import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BackwardsLink from '../../components/BackwardLink';

const InnerHeader = React.memo(({
	children, title, className, returnFunction,
}) => (
	<div className={cn('inner-header', className)}>
		{children &&
		<div className="inner-header-line">
			{ children }
		</div>}
		<div className="inner-header-line">
			{returnFunction && <BackwardsLink returnFunction={returnFunction} />}
			<div className="inner-header-title">
				{title}
			</div>
		</div>
	</div>
));


InnerHeader.propTypes = {
	title: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.node,
	returnFunction: PropTypes.func,
};

InnerHeader.defaultProps = {
	children: null,
	className: '',
	returnFunction: null,
};
export default InnerHeader;
