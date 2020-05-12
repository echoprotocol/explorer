import React from 'react';
import PropTypes from 'prop-types';
import loadingIcon from '../../public/images/icons/loader-l.png';

const BlueBtn = ({
	name, className, isLoading, ...props
}) => (
	<button className={`blue-button ${className}`} {...props}>
		<span>{name}</span>
		{isLoading &&
		<img src={loadingIcon} className="blue-button__loading" alt="loading" />}
	</button>
);

BlueBtn.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	isLoading: PropTypes.bool,
};

BlueBtn.defaultProps = {
	className: '',
	isLoading: false,
};
export default BlueBtn;

