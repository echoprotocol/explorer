import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Switch from '../../Switch';

const LogsTopicsItem = ({ id, value, isLink }) => {
	const [isDec, setDec] = useState(false);

	const toggleToDec = () => {
		setDec(true);
	};

	const toggleToHex = () => {
		setDec(false);
	};

	// Only for example
	const decValue = 'dec value';

	return (
		<div className="logs-topics-item">
			<div className="logs-topics-item__id">{id}.</div>
			{isLink ?
				<a href="" className="logs-topics-item__value link">{isDec ? decValue : value}</a> :
				<div className="logs-topics-item__value">{isDec ? decValue : value}</div>
			}

			<Switch isLeftActive={isDec} leftName="Dec" rightName="Hex" onLeftToggle={toggleToDec} onRightToggle={toggleToHex} />
		</div>
	);
};

LogsTopicsItem.propTypes = {
	id: PropTypes.number.isRequired,
	value: PropTypes.string.isRequired,
	isLink: PropTypes.bool,
};

LogsTopicsItem.defaultProps = {
	isLink: false,
};

export default LogsTopicsItem;
