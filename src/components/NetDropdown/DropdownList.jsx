import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const DropdownList = ({
	options, toggleOpen, setActive, active, triggerRef,
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
	const handleSelect = (i) => {
		setActive(i);
		toggleOpen(false);
	};
	return (
		<div ref={listRef} className="dropdown-list">
			<button
				className={cn('dropdown-item')}
				onClick={() => handleSelect(0)}
			>
				<span className="dropdown-item__value">{options[0].title}</span>
			</button>
			<button
				className={cn('dropdown-item')}
				onClick={() => handleSelect(1)}
			>
				<span className="dropdown-item__value">{options[1].title}</span>
			</button>
		</div>
	);
};
DropdownList.propTypes = {
	active: PropTypes.number.isRequired,
	options: PropTypes.array.isRequired,
	setActive: PropTypes.func.isRequired,
	toggleOpen: PropTypes.func.isRequired,
	triggerRef: PropTypes.any.isRequired,
};
export default DropdownList;
