import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import InfoTooltip from '../InfoTooltip';

import { MAINNET_MODE, TESTNET_MODE } from '../../constants/GlobalConstants';
import config from '../../config/chain';

const DropdownList = ({
	options, toggleOpen, triggerRef, mode,
}) => {
	const listRef = useRef(null);

	const handleClick = (e) => {
		if (listRef.current.contains(e.target) || triggerRef.current.contains(e.target)) {
			return;
		}
		toggleOpen(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	const handleSelect = () => {
		toggleOpen(false);
		triggerRef.current.focus();
	};

	const renderTestNet = () => (
		<React.Fragment>
			<a
				href={config.EXPLORER_URLS.MAINNET}
				className={cn('dropdown-item', { active: mode === MAINNET_MODE })}
				onClick={() => 	handleSelect()}
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="dropdown-item__value">
					{options[0].title}
				</span>
			</a>
			<button
				className={cn('dropdown-item', { active: mode === TESTNET_MODE })}
				onClick={() => 	handleSelect()}
			>
				<span className="dropdown-item__value">
					{options[1].title}
					<InfoTooltip
						overlay="The test network has no real transaction and asset value and is used by developers to test their applications during development"
						iconFilled={false}
					/>
				</span>
			</button>
		</React.Fragment>
	);


	const renderMainNet = () => (
		<React.Fragment>
			<button
				className={cn('dropdown-item', { active: mode === MAINNET_MODE })}
				onClick={() => handleSelect()}
				target="_blank"
			>
				<span className="dropdown-item__value">
					{options[0].title}
				</span>
			</button>
			<a
				href={config.EXPLORER_URLS.TESTNET}
				className={cn('dropdown-item', { active: mode === TESTNET_MODE })}
				onClick={() => handleSelect()}
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="dropdown-item__value">
					{options[1].title}
					<InfoTooltip
						overlay="The test network has no real transaction and asset value and is used by developers to test their applications during development"
						iconFilled={false}
					/>
				</span>
			</a>
		</React.Fragment>
	);

	return (
		<div ref={listRef} className="dropdown-list">
			{mode === TESTNET_MODE && renderTestNet()}
			{mode === MAINNET_MODE && renderMainNet()}
		</div>
	);
};

DropdownList.propTypes = {
	options: PropTypes.array.isRequired,
	toggleOpen: PropTypes.func.isRequired,
	triggerRef: PropTypes.any.isRequired,
	mode: PropTypes.string.isRequired,
};
export default DropdownList;
