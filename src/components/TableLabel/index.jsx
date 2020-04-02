import React from 'react';

import PropTypes from 'prop-types';


const TableLabel = React.memo(({ label, children }) => (
	<div className="table-label-wrap">
		<h3 className="table-label">{label}</h3>
		{children}
	</div>
));

TableLabel.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

TableLabel.defaultProps = {
	label: '',
	children: null,
};

export default TableLabel;

