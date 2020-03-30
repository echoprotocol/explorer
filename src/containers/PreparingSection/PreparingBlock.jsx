import React from 'react';
import PropTypes from 'prop-types';

const PreparingBlock = ({ children }) => (
	<div className="preparing-block">
		{children}
	</div>
);

PreparingBlock.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PreparingBlock;
