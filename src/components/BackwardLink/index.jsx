import React from 'react';
import PropTypes from 'prop-types';
import BackwardIcon from '../BackwardIcon';

const BackwardLink = React.memo(({ returnFunction }) => (
	<React.Fragment>
		<a
			href=""
			className="backwards-link"
			onClick={(e) => { e.preventDefault(); returnFunction(false); }}
		>
			<BackwardIcon />
		</a>
	</React.Fragment>
));

BackwardLink.propTypes = {
	returnFunction: PropTypes.func,
};

BackwardLink.defaultProps = {
	returnFunction: () => {},
};

export default BackwardLink;
