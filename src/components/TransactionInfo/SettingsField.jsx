import React from 'react';
import PropTypes from 'prop-types';

const SettingsField = ({ settings }) => (
	<div className="settings-field">
		{settings.map((item) => (
			<div className={`settings-item ${item.value}`}>
				{item.key}
			</div>
		))}
	</div>
);

SettingsField.propTypes = {
	settings: PropTypes.array.isRequired,
};

export default SettingsField;
