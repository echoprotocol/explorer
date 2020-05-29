import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SettingsRow from '../TransactionInfo/Rows/SettingsRow';

const InfoBlock = ({ children, settings, className }) => (
	<div className={cn('info-block', className)}>
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
	className: PropTypes.string,
};

InfoBlock.defaultProps = {
	settings: null,
	className: '',
};
export default memo(InfoBlock);
