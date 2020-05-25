import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const SettingsRow = ({
	title, settings, className,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className={cn('settings-field', className)}>
				{settings.map((item) => (
					<div className={`settings-item ${item.value}`} key={item.key}>
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
	className: PropTypes.string,
};

SettingsRow.defaultProps = {
	settings: [],
	className: '',
};

export default SettingsRow;
