import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import AccountInfo from './AccountInfo';
import AccountBalances from './AccountBalances';
import OperationsTable from '../../containers/OperationsTable';
import InnerHeader from '../InnerHeader';
import { ECHO_ASSET } from '../../constants/GlobalConstants';
import Loader from '../../components/Loader';
import AccountActions from '../../actions/AccountActions';
import URLHelper from '../../helpers/URLHelper';
import { ACCOUNT_GRID } from '../../constants/TableConstants';
import GridActions from '../../actions/GridActions';
import { subscribeAccountHistoryUpdate } from '../../services/subscriptions/account';

class Account extends React.Component {

	constructor(props) {
		super(props);
		this.updateHistorySubscriber = null;
	}

	componentDidMount() {
		const { router: { query: { id } } } = this.props;
		if (!this.props.account || (id !== this.props.account.get('id') && id !== this.props.account.get('name'))) {
			this.onResetFilter().then(async () => {
				await this.props.getAccountInfo(this.props.router.query.id);
			});
		}
		if (this.props.account) {
			this.subscribeHistoryUpdate(this.props.account.get('id'));
		}
	}

	async componentDidUpdate(prevProps) {
		if ((!prevProps.account && this.props.account) ||
			(prevProps.account && this.props.account && this.props.account.get('name') !== prevProps.account.get('name'))) {
			await this.unsubscribeHistoryUpdate();
			this.subscribeHistoryUpdate(this.props.account.get('id'));
		}
		if (prevProps.router.query.id !== this.props.router.query.id) {
			this.onResetFilter().then(async () => {
				await this.props.getAccountInfo(this.props.router.query.id);
			});
		}
	}

	componentWillUnmount() {
		const { account } = this.props;
		if (!account || (account && !account.get)) { return; }
		this.unsubscribeHistoryUpdate(account.get('id'));
		this.props.clearAccountInfo();
	}

	async onResetFilter() {
		return Promise.all([
			this.props.setFilter({ from: '', to: '' }),
			this.props.onSetPage(1),
		]);
	}

	onLoadMoreHistory() {
		const { account } = this.props;
		this.props.loadAccountHistory(account.get('id'));
	}

	getTableLabel() {
		const operationsCount = this.props.accountHistory.size;
		const transactionsCount = this.props.accountHistory.reduce((trxs, op) => {
			const currentIndexes = `${op.trIndex}-${op.blockNumber}`;
			return trxs.includes(currentIndexes) ? trxs : [...trxs, currentIndexes];
		}, []).length;
		return `${operationsCount} Operation${operationsCount > 1 ? 's' : ''},
			${transactionsCount} Transaction${transactionsCount > 1 ? 's' : ''}`;
	}

	async subscribeHistoryUpdate(id) {
		const updateHistory = await subscribeAccountHistoryUpdate([id]);
		const nextUpdate = () => {
			this.onLoadMoreHistory();
			this.props.incTotalAccountHistory();
		};
		this.updateHistorySubscriber = updateHistory.subscribe({
			next: nextUpdate.bind(this),
			error: (err) => { console.log('Update account history error: ', err.message || err); },
		});
	}

	async unsubscribeHistoryUpdate() {
		if (!this.updateHistorySubscriber) { return; }
		await this.updateHistorySubscriber.unsubscribe();
		this.updateHistorySubscriber = null;
	}

	renderLoader(loading) {
		return loading ? <Loader /> : null;
	}

	renderMeta() {
		const { account } = this.props;
		return !account ? null : (
			<Helmet
				title={`Account ${account.get('name')} | Echo Explorer`}
				meta={[
					{ property: 'og:description', name: 'ECHO account page' },
					{ property: 'og:image', content: URLHelper.getUrlAccountIcon(account.get('name')) },
				]}
			/>
		);
	}

	render() {
		const {
			loading, loadingMoreHistory, account, balances, tokens, accountHistory, isMobile, totalAccountHistory,
		} = this.props;

		return (
			<div className="inner-container">
				{this.renderMeta()}
				<div className="account-page-info">
					{account && <InnerHeader title={`Account ${account.get('id')}`} />}
					<div className="account-page-t-block">
						<div className="help-container">
							{
								account ?
									<React.Fragment>
										<AccountInfo
											isMobile={isMobile}
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
							{totalAccountHistory ? (
								<OperationsTable
									isASCOps={false}
									onLoadMoreHistory={() => this.onLoadMoreHistory()}
									gridName={ACCOUNT_GRID}
									label={this.getTableLabel()}
									router={this.props.router}
									operations={accountHistory}
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
	isMobile: PropTypes.bool.isRequired,
	router: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	loadingMoreHistory: PropTypes.bool,
	account: PropTypes.object,
	balances: PropTypes.object,
	tokens: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	accountHistory: PropTypes.object,
	totalAccountHistory: PropTypes.number.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
	loadAccountHistory: PropTypes.func.isRequired,
	getAccountInfo: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
	onSetPage: PropTypes.func.isRequired,
	incTotalAccountHistory: PropTypes.func.isRequired,
};

Account.defaultProps = {
	loading: false,
	loadingMoreHistory: false,
	account: null,
	balances: null,
	tokens: null,
	accountHistory: null,
};

Account.getInitialProps = async ({ query: { id: accountId, ...filters }, store }) => {
	await store.dispatch(GridActions.initData(ACCOUNT_GRID, filters));
	await store.dispatch(AccountActions.getAccountInfo(accountId));
	return {};
};

export default Account;
