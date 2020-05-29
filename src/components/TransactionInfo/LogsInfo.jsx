import React from 'react';
import PropTypes from 'prop-types';

import LogsDataRow from './LogsComponents/LogsDataRow';
import LogsAddressRow from './LogsComponents/LogsAddressRow';
import LogsTopicsRow from './LogsComponents/LogsTopicsRow';
import LogsNameRow from './LogsComponents/LogsNameRow';

const LogsInfo = ({ logs }) => (
	<div className="logs-info">
		{logs.map((log, id) => (
			<div className="logs-item" key={`${log.address}${id.toString()}`}>
				<div className="logs-item__id">
					<span>{id + 1}.</span>
				</div>
				<div className="logs-item-info">
					{log.address && <LogsAddressRow address={log.address} />}
					{log.name && <LogsNameRow name={log.name} />}
					{log.topics && <LogsTopicsRow topics={log.topics} />}
					{log.data && <LogsDataRow data={log.data} />}
				</div>
			</div>
		))}

	</div>
);

LogsInfo.propTypes = {
	logs: PropTypes.array.isRequired,
};
export default LogsInfo;
