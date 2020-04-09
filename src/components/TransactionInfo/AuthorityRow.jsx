import React from 'react';
import PropTypes from 'prop-types';

const AuthorityRow = ({ value, weight, withButton }) => (
	<div className="account-field">
		<div className="account-field__info">
			<a href="" className="link">
				{value}
			</a>
			<span className="account-field__info-description">
				<span>Weight:&nbsp;</span>
				<span>{weight}</span>
			</span>
		</div>
		{withButton &&
			<button className="account-field__button">
				View WIF
			</button>
		}
	</div>
);

AuthorityRow.propTypes = {
	value: PropTypes.string.isRequired,
	weight: PropTypes.string.isRequired,
	withButton: PropTypes.bool,
};

AuthorityRow.defaultProps = {
	withButton: false,
};

export default AuthorityRow;
