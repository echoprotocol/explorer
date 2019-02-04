import React from 'react';
import PropTypes from 'prop-types';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';

import { ECHO_ASSET, TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import Loader from '../../components/Loader';

class Account extends React.Component {

	componentDidMount() {
		this.props.getAccountInfo();
	}

	componentDidUpdate(prevProps) {
		if (this.props.account) {
			this.props.setTitle(TITLE_TEMPLATES.ACCOUNT.replace(/name/, this.props.account.get('name')));
		}

		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.props.getAccountInfo();
			return;
		}

		if (!prevProps.account) {
			return;
		}

		const { account: prevAccount } = prevProps;
		const { account } = this.props;
		if (!prevAccount.get('history').equals(account.get('history'))) {
			this.props.updateAccountHistory(account.get('history'), prevAccount.get('history'));
		}

		if (!prevAccount.get('balances').equals(account.get('balances'))) {
			this.props.updateAccountBalances(account.get('balances'));
		}
	}

	componentWillUnmount() {
		this.props.clearAccountInfo();
	}

	onLoadMoreHistory() {
		this.props.loadAccountHistory(this.props.history.last()[0].id.split('.')[2]);
	}

	renderLoader(loading) {
		return loading ? <Loader /> : null;
	}

	render() {
		const {
			loading, loadingMoreHistory, isFullHistory,
			account, balances, history, cacheObjects, match: { params: { id } },
		} = this.props;

		const assetBalances = balances.mapEntries(([assetId, statsId]) => ([
			assetId,
			{
				asset: cacheObjects.get(assetId),
				amount: cacheObjects.getIn([statsId, 'balance']),
				id: cacheObjects.getIn([statsId, 'id']),
			},
		]));

		return (
			<div className="table-container inner-information-container block-information account-page">
				<div className="account-page-t-block">
					<div className="title">Account {id}</div>
					<div className="help-container">
						{
							account ?
								<React.Fragment>
									<AccountInfo
										echo={assetBalances.get(ECHO_ASSET.ID)}
										name={account.get('name')}
									/>
									<AccountBalances
										balances={assetBalances.delete(ECHO_ASSET.ID).reduce((arr, b) => [...arr, b], [])}
										owner={account.get('assets')}
									/>
								</React.Fragment> : null
						}
					</div>
				</div>
				{
					account && !loading ?
						<React.Fragment>
							<h2>Transactions</h2>
							{
								history.size ?
									<TransactionsTable
										transactions={history}
										loading={loadingMoreHistory}
										loadMore={history.size && !isFullHistory ? () => this.onLoadMoreHistory() : null}
									/> : null
							}
						</React.Fragment> : this.renderLoader(loading)
				}
			</div>
		);
	}

}

Account.propTypes = {
	loading: PropTypes.bool,
	loadingMoreHistory: PropTypes.bool,
	isFullHistory: PropTypes.bool,
	account: PropTypes.object,
	balances: PropTypes.object,
	history: PropTypes.object,
	cacheObjects: PropTypes.object,
	match: PropTypes.object.isRequired,
	getAccountInfo: PropTypes.func.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
	updateAccountHistory: PropTypes.func.isRequired,
	updateAccountBalances: PropTypes.func.isRequired,
	loadAccountHistory: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
};

Account.defaultProps = {
	loading: false,
	loadingMoreHistory: false,
	isFullHistory: false,
	account: null,
	balances: null,
	cacheObjects: null,
	history: null,
};

export default Account;