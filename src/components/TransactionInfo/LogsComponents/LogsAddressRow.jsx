import React from 'react';
import PropTypes from 'prop-types';

const LogsAddressRow = ({ address }) => (
	<div className="od-row sm">
		<div className="od-col">Address:</div>
		<div className="od-col logs">
			<a href="" className="link">{address}</a>
		</div>
	</div>
);

LogsAddressRow.propTypes = {
	address: PropTypes.string.isRequired,
};

export default LogsAddressRow;
