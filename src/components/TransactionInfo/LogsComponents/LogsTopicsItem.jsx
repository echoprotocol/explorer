import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Switch from '../../Switch';
import { ERC20_EVENT_HASHES } from '../../../constants/GlobalConstants';

const LogsTopicsItem = ({ id, value, isLink }) => {
	const [isDec, setDec] = useState(false);

	const toggleToDec = () => {
		setDec(true);
	};

	const toggleToHex = () => {
		setDec(false);
	};

	let decValue;
	if (id === 0) {
		const event = Object.entries(ERC20_EVENT_HASHES).find((el) => el[1] === value.substring(0, 8));
		decValue = event ? event[0] : 'Unsupported event';
	} else {
		decValue = Number(`0x${value}`, 10);
	}

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
