import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import DropdownList from './DropdownList';
import DropdownArrow from './DropdownArrow';
import { MAINNET_MODE, TESTNET_MODE } from '../../constants/GlobalConstants';

const Dropdown = ({ options, mode }) => {
	const triggerRef = useRef(null);
	const [open, toggleOpen] = useState(false);
	const [active, setActive] = useState(0);
	const handleTrigger = (e) => {
		e.target.blur();
		toggleOpen(!open);
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
				<span className="dropdorn-trigger__value">{activeOption && activeOption.title}</span>
				<DropdownArrow />
			</button>
			{open && (
				<DropdownList
					active={active}
					triggerRef={triggerRef}
					options={options}
					toggleOpen={toggleOpen}
					setActive={setActive}
				/>
			)}
		</div>
	);
};

Dropdown.propTypes = {
	options: PropTypes.array.isRequired,
	mode: PropTypes.string.isRequired,
};

export default connect((state) => ({
	mode: state.global.get('mode'),
}), null)(Dropdown);
