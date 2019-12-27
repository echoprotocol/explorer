import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({
	value, icon, action, labelFor,
}) => {
	if (labelFor) {
		return (
			<label
				className="action-button"
				htmlFor={labelFor}
			>
				{value}
			</label>
		);
	}
	return (
		<button className="action-button" onClick={() => action()}>
			{
				icon &&
				<img src={icon} alt="" />
			}
			<span className="content">{value}</span>
		</button>
	);
};

ActionButton.defaultProps = {
	icon: null,
	action: null,
	labelFor: null,
};

ActionButton.propTypes = {
	value: PropTypes.string.isRequired,
	icon: PropTypes.string,
	action: PropTypes.func,
	labelFor: PropTypes.string,
};

export default ActionButton;
