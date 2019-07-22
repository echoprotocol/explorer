import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';

import URLHelper from '../../helpers/URLHelper';
import { resetTags } from '../../helpers/GlobalHelper';

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
			this.props.updateAccountHistory(account.get('id'), account.get('history'), prevAccount.get('history'));
		}

		if (!prevAccount.get('balances').equals(account.get('balances'))) {
			this.props.updateAccountBalances(account.get('id'), account.get('balances'));
		}
	}

	componentWillUnmount() {
		this.props.clearAccountInfo();

		const metaTags = document.getElementsByTagName('meta');

		resetTags(metaTags, 'meta-temp');

	}

	onLoadMoreHistory() {
		const { account, history } = this.props;
		this.props.loadAccountHistory(account.get('id'), history.last()[0].id.split('.')[2]);
	}

	renderMetaData() {
		const { account } = this.props;

		if (!account) {
			return null;
		}

		return (
			<MetaTags>
				<title>{`Account ${account.get('name')} | Echo Explorer`}</title>
				<meta id="meta-temp" name="title" content={`Account ${account.get('name')} | Echo Explorer`} />
				<meta id="meta-temp" property="og:title" content={`Account ${account.get('name')} | Echo Explorer`} />
				<meta id="meta-temp" property="twitter:title" content={`Account ${account.get('name')} | Echo Explorer`} />

				<meta id="meta-temp" name="description" content="ECHO account page" />
				<meta id="meta-temp" property="og:description" content="ECHO account page" />
				<meta id="meta-temp" property="twitter:description" content="ECHO account page" />

				<meta id="meta-temp" property="og:image" content={URLHelper.getUrlAccountAvatar(account.get('name'))} />
				<meta id="meta-temp" property="twitter:image" content={URLHelper.getUrlAccountAvatar(account.get('name'))} />
			</MetaTags>
		);
	}

	renderLoader(loading) {
		return loading ? <Loader /> : null;
	}

	render() {
		const {
			loading, loadingMoreHistory, isFullHistory,
			account, balances, history,
		} = this.props;

		return (
			<div className="table-container inner-information-container block-information account-page with-d-table">
				{this.renderMetaData()}
				<div className="account-page-t-block">
					{account && <div className="title">Account {account.get('id')}</div>}
					<div className="help-container">
						{
							account ?
								<React.Fragment>
									<AccountInfo
										echo={balances.get(ECHO_ASSET.ID)}
										name={account.get('name')}
									/>
									<AccountBalances
										balances={balances.delete(ECHO_ASSET.ID).reduce((arr, b) => [...arr, b], [])}
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
										hasMore={!isFullHistory}
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
	history: null,
};

export default Account;
