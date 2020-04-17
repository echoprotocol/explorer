import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const PrimaryRow = ({
	title, description, isText, status, className,
}) => (
	<div className={`od-row ${className}`}>
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{description && <span className={cn(`description ${status}`, { text: isText })}>{description}</span>}
		</div>
	</div>
);

PrimaryRow.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	isText: PropTypes.bool,
	status: PropTypes.string,
	className: PropTypes.string,
};

PrimaryRow.defaultProps = {
	description: '',
	isText: false,
	status: '',
	className: '',
};

export default PrimaryRow;
