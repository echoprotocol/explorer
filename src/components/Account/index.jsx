import React from 'react';
import PropTypes from 'prop-types';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import AccountHistory from './AccountHistory';

import { ECHO_ASSET } from '../../constants/GlobalConstants';

import RecentBlockSidebar from '../../containers/RecentBlockSection/RecentBlockSidebar';

class Account extends React.Component {

	componentDidMount() {
		this.props.getAccountInfo();

	}

	componentWillUnmount() {
		this.props.clearAccountInfo();
	}

	renderAccount(account, balances) {
		return (
			<React.Fragment>
				<div className="account-page-t-block">
					<div className="title">Account <span className="accent">{account.get('id')}</span></div>
					<div className="help-container">
						<AccountInfo echo={balances.get(ECHO_ASSET.ID)} name={account.get('name')} />
						<AccountBalances />
					</div>
				</div>
				<h2>43 Transactions</h2>
				<AccountHistory />
			</React.Fragment>
		);
	}

	render() {
		const { account, balances } = this.props;

		return (
			<div className="recent-block-section">
				<div className="wrap">
					<div className="table-container inner-information-container block-information account-page">
						{ account ? this.renderAccount(account, balances) : null }
					</div>
					<RecentBlockSidebar />
				</div>
			</div>
		);
	}

}

Account.propTypes = {
	account: PropTypes.object,
	balances: PropTypes.object,
	getAccountInfo: PropTypes.func.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
};

Account.defaultProps = {
	account: null,
	balances: null,
};

export default Account;
