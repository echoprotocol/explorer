import React from 'react';
import PropTypes from 'prop-types';

const SettingsRow = ({
	title, settings,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className="settings-field">
				{settings.map((item) => (
					<div className={`settings-item ${item.value}`}>
						{item.key}
					</div>
				))}
			</div>
		</div>
	</div>
);

SettingsRow.propTypes = {
	title: PropTypes.string.isRequired,
	settings: PropTypes.array,
};

SettingsRow.defaultProps = {
	settings: [],
};

export default SettingsRow;
