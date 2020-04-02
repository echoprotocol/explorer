import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ClearBtn from './ClearBtn';

const Input = ({
	hundleClear, className, value, onChange, name, ...props
}) => {
	const [isFocused, setFocus] = useState(false);
	const input = useRef(null);
	const onClear = () => {
		input.current.focus();
		hundleClear(name);
	};
	return (
		<div className={cn('input-wrapper', className)}>
			<input
				className={cn('input', { focus: isFocused, clerable: hundleClear, filled: value })}
				name={name}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				value={value}
				onChange={onChange}
				ref={input}
				{...props}
			/>
			{hundleClear && value && <ClearBtn
				onClearFocus={() => setFocus(true)}
				onClearBlur={() => setFocus(false)}
				onClick={() => onClear()}
			/>}
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	className: PropTypes.string,
	hundleClear: PropTypes.func,
	onChange: PropTypes.func,
};
Input.defaultProps = {
	className: '',
	value: '',
	hundleClear: null,
	onChange: () => {},
};
export default Input;

