import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SettingsRow from '../TransactionInfo/Rows/SettingsRow';

const InfoBlock = ({ children, settings }) => (
	<div className="info-block">
		<div className="info-block-main">{children}</div>
		{(settings && settings.length) ?
			<div className="info-block-secondary">
				<SettingsRow title="Settings" settings={settings} className="white" />
			</div> : null
		}
	</div>
);

InfoBlock.propTypes = {
	children: PropTypes.node.isRequired,
	settings: PropTypes.array,
};

InfoBlock.defaultProps = {
	settings: [],
};
export default memo(InfoBlock);
