import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Switch = ({
	isActive, leftName, rightName, onLeftToggle, onRightToggle,
}) => {
	const [isSwitchActive, setSwitchActive] = useState(isActive);

	return (
		<span className="switch">
			<button
				className={cn('switch-item', { active: isSwitchActive })}
				onClick={() => {
					onLeftToggle();
					setSwitchActive(true);
				}}
			>{leftName}
			</button>
			<button
				className={cn('switch-item', { active: !isSwitchActive })}
				onClick={() => {
					onRightToggle();
					setSwitchActive(false);
				}
				}
			>{rightName}
			</button>
		</span>
	);
};

Switch.propTypes = {
	isActive: PropTypes.bool.isRequired,
	leftName: PropTypes.string.isRequired,
	rightName: PropTypes.string.isRequired,
	onLeftToggle: PropTypes.func,
	onRightToggle: PropTypes.func,
};

Switch.defaultProps = {
	onLeftToggle: () => {},
	onRightToggle: () => {},
};
export default Switch;
