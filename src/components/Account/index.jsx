import React from 'react';
import PropTypes from 'prop-types';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import OperationsTable from '../TransactionInfo/OperationsTable';

import { ECHO_ASSET, TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import Loader from '../../components/Loader';

class Account extends React.Component {

	componentDidMount() {
		this.props.getAccountInfo();

		if (this.props.location.search) {
			this.props.history.push(this.props.location.pathname);
		}
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

		const prevAccountHistory = prevAccount.get('history');
		const accountHistory = account.get('history');

		if (prevAccountHistory.size !== accountHistory.size) {
			this.props.updateAccountHistory(account.get('id'), account.get('history'), prevAccount.get('history'));
		}

		if (!prevAccount.get('balances').equals(account.get('balances'))) {
			this.props.updateAccountBalances(account.get('balances'));
		}

	}

	componentWillUnmount() {
		this.props.clearAccountInfo();
	}


	onLoadMoreHistory() {
		const { account, accountHistory } = this.props;
		this.props.loadAccountHistory(account.get('id'), accountHistory.last().id.split('.')[2]);
	}

	renderLoader(loading) {
		return loading ? <Loader /> : null;
	}

	render() {
		const {
			loading, loadingMoreHistory, isFullHistory,
			account, balances, tokens, accountHistory,
		} = this.props;

		return (
			<div className="table-container inner-information-container block-information account-page with-d-table">
				<div className="account-page-t-block">
					{account && <div className="title">Account {account.get('id')}</div>}
					<div className="help-container">
						{
							account ?
								<React.Fragment>
									<AccountInfo
										echo={balances.get(ECHO_ASSET.ID)}
										name={account.get('name')}
										id={account.get('id')}
									/>
									<AccountBalances
										balances={balances.delete(ECHO_ASSET.ID).reduce((arr, b) => [...arr, b], [])}
										tokens={tokens}
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
								accountHistory.size ?
									<OperationsTable
										type="account"
										operations={accountHistory}
										history={this.props.history}
										location={this.props.location}
										loading={loadingMoreHistory}
										loadMore={accountHistory.size && !isFullHistory ? () => this.onLoadMoreHistory() : null}
										hasMore={!isFullHistory}
										timestamp
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
	tokens: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	history: PropTypes.object,
	accountHistory: PropTypes.object,
	location: PropTypes.object.isRequired,
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
	tokens: null,
	history: null,
	accountHistory: null,
};

export default Account;
