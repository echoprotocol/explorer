import React from 'react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TooltipIcon from './TooltipIcon';

const InfoTooltip = React.memo(({ placement, iconFilled, ...props }) => (
	<Tooltip
		trigger={['hover']}
		placement={placement}
		{...props}
	>
		<span className={cn('tooltip-icon', { filled: iconFilled })}>
			<TooltipIcon filled={iconFilled} />
		</span>
	</Tooltip>
));


InfoTooltip.propTypes = {
	placement: PropTypes.string,
	iconFilled: PropTypes.bool,
};

InfoTooltip.defaultProps = {
	placement: 'rightBottom',
	iconFilled: true,
};

export default InfoTooltip;
