import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Switch from '../../Switch';

const LogsTopicsItem = ({
	id, value, isLink, decValue,
}) => {
	const [isDec, setDec] = useState(!!decValue);

	const toggleToDec = () => {
		setDec(true);
	};

	const toggleToHex = () => {
		setDec(false);
	};
	const decRowText = decValue || `This is not ${id === 0 ? '' : 'argument of'} commmon ERC20 event and ABI was not provided`;

	return (
		<div className="logs-topics-item">
			<div className="logs-topics-item__id">{id}.</div>
			{isLink ?
				<a href="" className="logs-topics-item__value link">{isDec ? decRowText : value}</a> :
				<div className="logs-topics-item__value">{isDec ? decRowText : value}</div>
			}

			<Switch isLeftActive={isDec} leftName="Dec" rightName="Hex" onLeftToggle={toggleToDec} onRightToggle={toggleToHex} />
		</div>
	);
};

LogsTopicsItem.propTypes = {
	id: PropTypes.number.isRequired,
	value: PropTypes.string.isRequired,
	isLink: PropTypes.bool,
	decValue: PropTypes.string.isRequired,
};

LogsTopicsItem.defaultProps = {
	isLink: false,
};

export default LogsTopicsItem;
