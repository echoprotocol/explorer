import React from 'react';
import PropTypes from 'prop-types';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';

import { ECHO_ASSET } from '../../constants/GlobalConstants';

import RecentBlockSidebar from '../../containers/RecentBlockSection/RecentBlockSidebar';

class Account extends React.Component {

	componentDidMount() {
		this.props.getAccountInfo();

	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.props.getAccountInfo();
			return;
		}

		if (!prevProps.account) {
			return;
		}

		const { account: prevAccount } = prevProps;
		const { account } = this.props;
		if (
			prevAccount.get('history').first() &&
            account.get('history').first() &&
			prevAccount.get('history').first().id !== account.get('history').first().id
		) {
			this.props.updateAccountHistory(account.get('history'));
		}

		if (!prevAccount.get('balances').equals(account.get('balances'))) {
			this.props.updateAccountBalances(account.get('balances'));
		}
	}

	componentWillUnmount() {
		this.props.clearAccountInfo();
	}

	renderLoader(loading) {
		return loading ? <div /> : null;
	}

	render() {
		const {
			loading, account, balances, history, cacheObjects, match: { params: { id } },
		} = this.props;

		const assetBalances = balances.mapEntries(([assetId, statsId]) => ([
			assetId,
			{
				asset: cacheObjects.get(assetId),
				stats: cacheObjects.get(statsId),
			},
		]));

		return (
			<div className="recent-block-section">
				<div className="wrap">
					<div className="table-container inner-information-container block-information account-page">
						<div className="account-page-t-block">
							<div className="title">Account {id}</div>
							<div className="help-container">
								{
									account ?
										<AccountInfo
											echo={assetBalances.get(ECHO_ASSET.ID)}
											name={account.get('name')}
										/> : null
								}
								{
									balances.size ?
										<AccountBalances
											balances={assetBalances.delete(ECHO_ASSET.ID)}
											owner={account.get('assets')}
										/> : null
								}
							</div>
						</div>
						{
							account && history.size && !loading ?
								<React.Fragment>
									<h2>{account.get('history').size} Transactions</h2>
									<TransactionsTable transactions={history} />
								</React.Fragment> : this.renderLoader(loading)
						}
					</div>
					<RecentBlockSidebar />
				</div>
			</div>
		);
	}

}

Account.propTypes = {
	loading: PropTypes.bool.isRequired,
	account: PropTypes.object,
	balances: PropTypes.object,
	history: PropTypes.object,
	cacheObjects: PropTypes.object,
	match: PropTypes.object.isRequired,
	getAccountInfo: PropTypes.func.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
	updateAccountHistory: PropTypes.func.isRequired,
	updateAccountBalances: PropTypes.func.isRequired,
};

Account.defaultProps = {
	account: null,
	balances: null,
	cacheObjects: null,
	history: null,
};

export default Account;
