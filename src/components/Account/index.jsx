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

	render() {
		const {
			account, balances, cacheObjects, match: { params: { id } },
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
											balances={assetBalances}
											owner={account.get('assets')}
										/>
									</div> : null
							}
						</div>
						<h2>43 Transactions</h2>
						<AccountHistory />
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
	cacheObjects: PropTypes.object,
	match: PropTypes.object.isRequired,
	getAccountInfo: PropTypes.func.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
};

Account.defaultProps = {
	account: null,
	balances: null,
	cacheObjects: null,
};

export default Account;
