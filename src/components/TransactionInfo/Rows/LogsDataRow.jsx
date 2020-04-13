import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Switch from '../../../components/Switch/';


const LogsDataRow = ({ data }) => {
	const [isDataTransformed, setDataTransformed] = useState(false);

	const toggleToTransformedData = () => {
		setDataTransformed(true);
	};
	const toggleToDefaultData = () => {
		setDataTransformed(false);
	};

	const renderTransformedData = () => (
		<div className="transformed-log-item">
			<div className="transformed-log-item__name">pay_gem:</div>
			<div className="transformed-log-item__value">0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2</div>
		</div>
	);

	return (
		<div className="od-row sm">
			<div className="od-col">Data:</div>
			<div className="od-col">
				<div className="logs-row">
					{isDataTransformed && <span>Transformed data</span>}
					{!isDataTransformed && <span className="logs-text">{data}</span>}
					<Switch isActive={isDataTransformed} leftName="Dec" rightName="Hex" onLeftToggle={toggleToTransformedData} onRightToggle={toggleToDefaultData} />
				</div>
			</div>
		</div>
	);
};

LogsDataRow.propTypes = {
	data: PropTypes.string.isRequired,
};
export default LogsDataRow;
