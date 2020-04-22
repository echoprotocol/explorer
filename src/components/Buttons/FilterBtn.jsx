import React from 'react';
import PropTypes from 'prop-types';
import loadingIcon from '../../public/images/icons/loader-l.png';

const FilterBtn = ({
	name, className, isLoading, ...props
}) => (
	<button className={`filter-button ${className}`} {...props}>
		<span>{name}</span>
		{isLoading &&
		<img src={loadingIcon} className="filter-button__loading" alt="loading" />}
	</button>
);

FilterBtn.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	isLoading: PropTypes.bool,
};

FilterBtn.defaultProps = {
	className: '',
	isLoading: false,
};
export default FilterBtn;

