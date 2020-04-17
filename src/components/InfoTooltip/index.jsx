import React from 'react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TooltipIcon from './TooltipIcon';
import SenderIcon from './SenderIcon';
import ReceiverIcon from './ReceiverIcon';

const InfoTooltip = React.memo(({
	placement, iconFilled, type, ...props
}) => (
	<Tooltip
		trigger={['hover']}
		placement={placement}
		{...props}
	>
		<span className={cn(`tooltip-icon ${type}`, { filled: iconFilled })}>
			{!type && <TooltipIcon filled={iconFilled} />}
			{type === 'sender' && <SenderIcon />}
			{type === 'receiver' && <ReceiverIcon />}
		</span>
	</Tooltip>
));


InfoTooltip.propTypes = {
	placement: PropTypes.string,
	iconFilled: PropTypes.bool,
	type: PropTypes.string,
};

InfoTooltip.defaultProps = {
	placement: 'rightBottom',
	iconFilled: true,
	type: '',
};

export default InfoTooltip;
