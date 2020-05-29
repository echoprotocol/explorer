import React from 'react';
import PropTypes from 'prop-types';

import LogsTopicsItem from './LogsTopicsItem';

const LogsTopicsRow = ({ topics, decValues }) => (
	<div className="od-row sm">
		<div className="od-col">Topics:</div>
		<div className="od-col logs">
			{topics.map((topic, id) => (
				<LogsTopicsItem id={id} value={topic} key={topic} decValue={decValues[id]} />
			))}
		</div>
	</div>
);

LogsTopicsRow.propTypes = {
	topics: PropTypes.array.isRequired,
	decValues: PropTypes.array.isRequired,
};

export default LogsTopicsRow;
