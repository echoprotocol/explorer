import React from 'react';
import cn from 'classnames';

import PropTypes from 'prop-types';


const TableLabel = React.memo(({ label, children, className }) => (
	<div className={cn('table-label-wrap', className)}>
		{label && <h3 className="table-label">{label}</h3>}
		{children}
	</div>
));

TableLabel.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

TableLabel.defaultProps = {
	label: '',
	children: null,
	className: '',
};

export default TableLabel;

