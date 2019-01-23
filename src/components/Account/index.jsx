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

	componentWillUnmount() {
		this.props.clearAccountInfo();
	}

	render() {
		const {
			account, balances, history, cacheObjects, match: { params: { id } },
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
							<div className="title">Account <span className="accent">{id}</span></div>
							{
								account && balances && cacheObjects ?
									<div className="help-container">
										<AccountInfo
											echo={assetBalances.get(ECHO_ASSET.ID)}
											name={account.get('name')}
										/>
										<AccountBalances
											balances={assetBalances.delete(ECHO_ASSET.ID)}
											owner={account.get('assets')}
										/>
									</div> : null
							}
						</div>
						{
							account && history ?
								<React.Fragment>
									<h2>{account.get('history').size} Transactions</h2>
									<TransactionsTable transactions={history} />
								</React.Fragment> : null
						}
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
	history: PropTypes.object,
	cacheObjects: PropTypes.object,
	match: PropTypes.object.isRequired,
	getAccountInfo: PropTypes.func.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
};

Account.defaultProps = {
	account: null,
	balances: null,
	cacheObjects: null,
	history: null,
};

export default Account;
