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

class Account extends React.Component {

	componentDidMount() {
		const { router: { query: { id } } } = this.props;
		if (!this.props.account || (id !== this.props.account.get('id') && id !== this.props.account.get('name'))) {
			this.props.getAccountInfo(this.props.router.query.id);
		}
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.router.query.id !== this.props.router.query.id) {
			await this.props.onSetFilter({ from: '', to: '' });
			await this.props.onSetPage(1);
			await this.props.getAccountInfo(this.props.router.query.id);
			return;
		}

		if (!prevProps.account || !this.props.account) {
			return;
		}

		const prevCountOps = prevProps.account.getIn(['statistics', 'total_ops']);
		const currCountOps = this.props.account.getIn(['statistics', 'total_ops']);

		if (prevCountOps !== currCountOps) {
			this.onLoadMoreHistory();
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
			loading, loadingMoreHistory, account, balances, tokens, accountHistory, isMobile,
		} = this.props;

		return (
			<div className="inner-information-container account-page">
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
							{account.getIn(['statistics', 'total_ops']) ? (
								<OperationsTable
									onLoadMoreHistory={() => this.onLoadMoreHistory()}
									gridName={ACCOUNT_GRID}
									label="Transactions"
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
	clearAccountInfo: PropTypes.func.isRequired,
	loadAccountHistory: PropTypes.func.isRequired,
	getAccountInfo: PropTypes.func.isRequired,
	onSetFilter: PropTypes.func.isRequired,
	onSetPage: PropTypes.func.isRequired,
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
