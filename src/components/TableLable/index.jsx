import React from 'react';

import PropTypes from 'prop-types';


const TableLable = (props) => {

	const { label, children } = props;

	return (
		<div className="table-label-wrap">
			<h3 className="table-label">{label}</h3>
			{children}
		</div>
	);

};

TableLable.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

TableLable.defaultProps = {
	label: '',
	children: null,
};

export default TableLable;

