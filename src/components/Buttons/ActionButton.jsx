import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({
	icon, name, label, ...props
}) => (
	<div className="action-button-wrap">
		<button className="action-button" {...props}>
			{icon && <img src={icon} alt="" className="action-button__icon" /> }
			<span className="action-button__name">{name}</span>
		</button>
		{label && <div className="action-button__label">{label}</div>}
	</div>
);

ActionButton.propTypes = {
	icon: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
};

ActionButton.defaultProps = {
	icon: '',
	label: '',
};
export default ActionButton;
