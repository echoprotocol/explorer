import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const TableLable = (props) => {

	const { label, children, additionalClass } = props;

	return (
		<div className={classNames('table-label-wrap', { [`${additionalClass}`]: additionalClass })}>
			<h3 className="table-label">{label}</h3>
			{children}
		</div>
	);

};

TableLable.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	additionalClass: PropTypes.string,
};

TableLable.defaultProps = {
	label: '',
	children: null,
	additionalClass: null,
};

export default TableLable;

