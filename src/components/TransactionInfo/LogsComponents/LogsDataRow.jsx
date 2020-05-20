import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Switch from '../../Switch';
import TransformedLogsItem from './TransformedLogItem';

const LogsDataRow = ({ data, decData }) => {
	const [isDataTransformed, setDataTransformed] = useState(false);

	const toggleToTransformedData = () => {
		setDataTransformed(true);
	};
	const toggleToDefaultData = () => {
		setDataTransformed(false);
	};

	const renderTransformedData = () => (
		<div className="logs-multy-row">
			{decData.map((d) => <TransformedLogsItem name="id" value={d} />)}
		</div>
	);

	return (
		<div className="od-row sm">
			<div className="od-col">Data:</div>
			<div className="od-col logs">
				<div className="logs-data-row">
					{isDataTransformed && renderTransformedData()}
					{!isDataTransformed && <span className="logs-text">{data}</span>}
					<Switch isLeftActive={isDataTransformed} leftName="Dec" rightName="Hex" onLeftToggle={toggleToTransformedData} onRightToggle={toggleToDefaultData} />
				</div>
			</div>
		</div>
	);
};

LogsDataRow.propTypes = {
	data: PropTypes.string.isRequired,
	decData: PropTypes.array.isRequired,
};
export default LogsDataRow;
