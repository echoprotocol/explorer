import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ClearBtn from './ClearBtn';

const Input = ({
	placeholder, type, clear, onChange, value, name,
}) => {
	const [isFocused, setFocus] = useState(false);
	const input = useRef(null);
	const onClear = () => {
		input.current.focus();
		clear(name);
	};
	return (
		<div className="input-wrapper">
			<input
				className={cn('input', { focus: isFocused, clerable: clear })}
				name={name}
				onChange={onChange}
				placeholder={placeholder}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				type={type}
				value={value}
				ref={input}
			/>
			{clear && value && <ClearBtn
				onClearFocus={() => setFocus(true)}
				onClearBlur={() => setFocus(false)}
				onClick={() => onClear()}
			/>}
		</div>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	clear: PropTypes.func,
	onChange: PropTypes.func,
};
Input.defaultProps = {
	type: 'text',
	value: '',
	clear: null,
	onChange: () => {},
};
export default Input;

