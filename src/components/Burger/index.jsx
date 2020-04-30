import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const BurgerIcon = ({ isActive, onClick }) => (
	<button className={classnames('menu-icon', { active: isActive })} onClick={onClick}>
		<span />
		<span />
		<span />
		<span />
	</button>
);

BurgerIcon.propTypes = {
	isActive: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default BurgerIcon;
