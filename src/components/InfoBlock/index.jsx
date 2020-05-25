import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SettingsRow from '../TransactionInfo/Rows/SettingsRow';

const InfoBlock = ({ children, settings }) => (
	<div className="info-block">
		<div className="info-block-main">{children}</div>
		{settings &&
		<div className="info-block-secondary">
			<SettingsRow title="Settings" settings={settings} className="white" />
		</div>
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
