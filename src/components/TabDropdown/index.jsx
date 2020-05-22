import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import arrow from '../../public/images/icons/dd-icon.svg';

const TabDropdown = ({
	value, children, opened, toggleDropdown, trigerRef,
}) => {
	const dropdownRef = useRef(null);

	const handleClick = (e) => {
		if (dropdownRef.current.contains(e.target)) {
			return;
		}
		toggleDropdown(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	return (
		<div className={cn('dropdown-tab', { opened })} ref={dropdownRef}>
			<button
				ref={trigerRef}
				className="dropdown-tab__trigger"
				onClick={() => toggleDropdown(!opened)}
			>
				<span className="dropdown-tab__trigger__trigger-value">{value}</span>
				<img src={arrow} alt="" className="toggle-icon" />
			</button>
			{opened && <div className="dropdown-tab-list">{children}</div>}

		</div>
	);
};

TabDropdown.propTypes = {
	children: PropTypes.node,
	value: PropTypes.string.isRequired,
	opened: PropTypes.bool.isRequired,
	toggleDropdown: PropTypes.func.isRequired,
	trigerRef: PropTypes.any,
};

TabDropdown.defaultProps = {
	children: null,
	trigerRef: null,
};
export default TabDropdown;
