import React from 'react';
import PropTypes from 'prop-types';

const AuthorityRow = ({ value, weight }) => (
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
	</div>
);

AuthorityRow.propTypes = {
	value: PropTypes.string.isRequired,
	weight: PropTypes.string.isRequired,
};


export default AuthorityRow;
