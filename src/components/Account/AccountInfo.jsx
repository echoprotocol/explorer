import React from 'react';
import PropTypes from 'prop-types';

const AccountInfo = React.memo(({ children }) => (
	<div className="left-card">
		{children}
	</div>
));

AccountInfo.propTypes = {
	children: PropTypes.node,
};

AccountInfo.defaultProps = {
	children: null,
};

export default AccountInfo;
