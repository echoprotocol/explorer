import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import BackwardIcon from '../BackwardIcon';

const BackwardLink = React.memo(({ returnFunction, className }) => (
	<React.Fragment>
		<a
			href=""
			className={cn('backwards-link', className)}
			onClick={(e) => { e.preventDefault(); returnFunction(false); }}
		>
			<BackwardIcon />
		</a>
	</React.Fragment>
));

BackwardLink.propTypes = {
	returnFunction: PropTypes.func,
	className: PropTypes.string,
};

BackwardLink.defaultProps = {
	returnFunction: () => {},
	className: '',
};

export default BackwardLink;
