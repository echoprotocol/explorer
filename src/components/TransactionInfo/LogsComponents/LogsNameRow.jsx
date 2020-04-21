import React from 'react';
import propTypes from 'prop-types';

const LogsNameRow = ({ name }) => (
	<div className="od-row sm align-center">
		<div className="od-col">Name:</div>
		<div className="od-col logs">
			<div className="logs-name">
				<div className="logs-name__value">{name.name}&nbsp;</div>
				<div className="logs-name__params">({name.params.join(', ')})</div>
				<button className="yellow-button">View Source</button>
			</div>
		</div>
	</div>
);

LogsNameRow.propTypes = {
	name: propTypes.object.isRequired,
};

export default LogsNameRow;
