import React from 'react';
import PropTypes from 'prop-types';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import OperationsTable from '../../containers/OperationsTable';
import InnerHeader from '../InnerHeader';
import { ECHO_ASSET, TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import Loader from '../../components/Loader';
import { ACCOUNT_GRID } from '../../constants/TableConstants';

class Account extends React.Component {

	componentDidMount() {
		this.props.getAccountInfo();
		if (this.props.location.search) {
			this.props.history.push(this.props.location.pathname);
		}
	}

	componentDidUpdate(prevProps) {
		if ((!prevProps.account && this.props.account) ||
			(prevProps.account && prevProps.account.get('name') !== this.props.account.get('name'))
		) {
			this.props.setTitle(TITLE_TEMPLATES.ACCOUNT.replace(/name/, this.props.account.get('name')));
			this.onLoadMoreHistory();
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

		const prevCountOps = prevAccount.getIn(['statistics', 'total_ops']);
		const currCountOps = account.getIn(['statistics', 'total_ops']);

		if (prevCountOps !== currCountOps) {
			this.onLoadMoreHistory();
		}

		if (!prevAccount.get('balances').equals(account.get('balances'))) {
			this.props.updateAccountBalances(account.get('balances'));
		}

	}

	componentWillUnmount() {
		this.props.clearAccountInfo();
	}

	onLoadMoreHistory() {
		const { account } = this.props;
		this.props.loadAccountHistory(account.get('id'));
	}

	renderLoader(loading) {
		return loading ? <Loader /> : null;
	}

	render() {
		const {
			loading, loadingMoreHistory, account, balances, tokens, accountHistory,
		} = this.props;

		return (
			<div className="inner-information-container account-page">
				<div className="account-page-info">
					{account && <InnerHeader title={`Account ${account.get('id')}`} />}
					<div className="account-page-t-block">
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
				</div>
				<div className="account-page-table">
					{ account && !loading ?
						<React.Fragment>
							{account.getIn(['statistics', 'total_ops']) ? (
								<OperationsTable
									onLoadMoreHistory={() => this.onLoadMoreHistory()}
									gridName={ACCOUNT_GRID}
									label="Transactions"
									operations={accountHistory}
									history={this.props.history}
									location={this.props.location}
									loading={loadingMoreHistory}
									timestamp
								/>) : null
							}
						</React.Fragment> : this.renderLoader(loading)
					}
				</div>
			</div>
		);
	}

}

Account.propTypes = {
	loading: PropTypes.bool,
	loadingMoreHistory: PropTypes.bool,
	account: PropTypes.object,
	balances: PropTypes.object,
	tokens: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	history: PropTypes.object,
	accountHistory: PropTypes.object,
	location: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getAccountInfo: PropTypes.func.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
	updateAccountBalances: PropTypes.func.isRequired,
	loadAccountHistory: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
};

Account.defaultProps = {
	loading: false,
	loadingMoreHistory: false,
	account: null,
	balances: null,
	tokens: null,
	history: null,
	accountHistory: null,
};

export default Account;
