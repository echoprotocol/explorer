import React from 'react';
import PropTypes from 'prop-types';

import AssetBalances from './AssetBalances';

class AccountBalances extends React.Component {

	render() {
		const { owner, balances } = this.props;

		return (
			<div className="right-container">
				<AssetBalances title="other assets" owner={owner} balances={balances} />
				{/*
					<div className="elem">
						<div className="title">tokens: <span className="gray">none</span></div>
					</div>
				*/}
			</div>
		);
	}

}

AccountBalances.propTypes = {
	balances: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	owner: PropTypes.object,
};

AccountBalances.defaultProps = {
	balances: null,
	owner: null,
};

export default AccountBalances;
