import React from 'react';

import LogsDataRow from './Rows/LogsDataRow';

const LogsInfo = ({ logs }) => (
	<div className="logs-info">
		{logs.map((log) => (
			<div className="logs-item">
				<div className="logs-item__id">
					<span>123.</span>
				</div>
				<div className="logs-item-info">
					{log.data && <LogsDataRow data={log.data} />}
				</div>
			</div>
		))}

	</div>
);

export default LogsInfo;
