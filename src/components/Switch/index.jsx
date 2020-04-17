import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Switch = ({
	isLeftActive, leftName, rightName, onLeftToggle, onRightToggle,
}) => {
	const [isSwitchLeft, setSwitchActive] = useState(isLeftActive);

	return (
		<span className="switch">
			<button
				className={cn('switch-item', { active: isSwitchLeft })}
				onClick={() => {
					onLeftToggle();
					setSwitchActive(true);
				}}
			>{leftName}
			</button>
			<button
				className={cn('switch-item', { active: !isSwitchLeft })}
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
	isLeftActive: PropTypes.bool.isRequired,
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
