import React from 'react';
import PropTypes from 'prop-types';

import LogsTopicsItem from './LogsTopicsItem';

const LogsTopicsRow = ({ topics }) => (
	<div className="od-row sm">
		<div className="od-col">Topics:</div>
		<div className="od-col logs">
			{topics.map((topic, id) => (
				<LogsTopicsItem id={id} value={topic} key={topic} />
			))}
		</div>
	</div>
);

LogsTopicsRow.propTypes = {
	topics: PropTypes.array.isRequired,
};

export default LogsTopicsRow;
