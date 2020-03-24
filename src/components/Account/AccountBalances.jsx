import React from 'react';
import PropTypes from 'prop-types';

import AssetBalances from './AssetBalances';
import TokenBalances from './TokenBalances';

class AccountBalances extends React.Component {

	render() {
		const { owner, balances, tokens } = this.props;

		return (
			<div className="right-container">
				<AssetBalances title="Other Assets" owner={owner} balances={balances} />
				<TokenBalances title="Tokens" tokens={tokens} />
			</div>
		);
	}

}

AccountBalances.propTypes = {
	balances: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	tokens: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	owner: PropTypes.object,
};

AccountBalances.defaultProps = {
	balances: null,
	tokens: null,
	owner: null,
};

export default AccountBalances;
