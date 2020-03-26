import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import OperationsTable from '../TransactionInfo/OperationsTable';

import { ECHO_ASSET, TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import Loader from '../../components/Loader';
import URLHelper from '../../helpers/URLHelper';
import AccountActions from '../../actions/AccountActions';

class Account extends React.Component {

	componentDidMount() {
		if (this.props.connected) {
			this.props.getAccountInfo();
		}
		if (this.props.location.search) {
			this.props.history.push(this.props.location.pathname);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.account) {
			this.props.setTitle(TITLE_TEMPLATES.ACCOUNT.replace(/name/, this.props.account.get('name')));
		}

		if (prevProps.connected && prevProps.match.params.id
			&& prevProps.match.params.id !== this.props.match.params.id) {
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

	renderMeta() {
		const { account } = this.props;
		return !account ? null : (
			<Helmet>
				<title>{`Account ${account.get('name')} | Echo Explorer`}</title>
				<meta property="og:description" name="ECHO account page" />
				<meta property="og:image" content={URLHelper.getUrlAccountIcon(account.get('name'))} />
			</Helmet>
		);
	}

	render() {
		const {
			loading, loadingMoreHistory, isFullHistory,
			account, balances, tokens, accountHistory, isMobileDevice,
		} = this.props;

		return (
			<div className="table-container inner-information-container block-information account-page with-d-table">
				{this.renderMeta()}
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
										isMobileDevice={isMobileDevice}
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

export function loadData(store, data) {
	if (!data.params || !data.params.id) {
		return null;
	}
	return store.dispatch(AccountActions.getAccountInfo(data.params.id));
}

Account.propTypes = {
	isMobileDevice: PropTypes.bool.isRequired,
	connected: PropTypes.bool.isRequired,
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
