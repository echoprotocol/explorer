import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import DropdownList from './DropdownList';
import DropdownArrow from './DropdownArrow';
import InfoTooltip from '../InfoTooltip';
import { MAINNET_MODE, TESTNET_MODE } from '../../constants/GlobalConstants';

const Dropdown = React.memo(({ options, mode }) => {
	const triggerRef = useRef(null);
	const [open, toggleOpen] = useState(false);

	const handleTrigger = (e) => {
		e.target.blur();
		toggleOpen(!open);
		triggerRef.current.focus();
	};

	const isTestNetMode = mode === TESTNET_MODE;
	const isMainNetMode = mode === MAINNET_MODE;
	const activeOption = options.find((option) => option.id === mode);

	return (
		<div className={cn('net-dropdown', { opened: open }, { testnet: isTestNetMode }, { mainnet: isMainNetMode })}>
			<button
				ref={triggerRef}
				className="dropdown-trigger"
				onClick={(e) => handleTrigger(e)}
			>
				<React.Fragment>
					<span className="dropdown-trigger__value">
						{activeOption && activeOption.title}
						{isTestNetMode && <InfoTooltip
							overlay="The test network has no real transaction and asset value and is used by developers to test their applications during development"
							iconFilled={false}
							placent="rightBottom"
						/>}
					</span>
					<DropdownArrow />
				</React.Fragment>
			</button>
			{open && (
				<DropdownList
					triggerRef={triggerRef}
					options={options}
					toggleOpen={toggleOpen}
					mode={mode}
				/>
			)}
		</div>
	);
});

Dropdown.propTypes = {
	options: PropTypes.array.isRequired,
	mode: PropTypes.string.isRequired,
};

export default connect((state) => ({
	mode: state.global.get('mode'),
}), null)(Dropdown);
