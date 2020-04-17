import React from 'react';
import PropTypes from 'prop-types';

const TransformedLogsItem = ({ name, value, isLink }) => (
	<div className="transformed-logs-item">
		<div className="transformed-logs-item__name">{name}:&nbsp;</div>
		{isLink ?
			<a href="" className="transformed-logs-item__value">{value}</a> :
			<div className="transformed-logs-item__value">{value}</div>
		}

	</div>
);

TransformedLogsItem.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	isLink: PropTypes.bool,
};

TransformedLogsItem.defaultProps = {
	isLink: false,
};

export default TransformedLogsItem;
