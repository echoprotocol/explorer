import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import echo from 'echojs-lib';
import { Link } from 'react-router-dom';
import URLHelper from '../../helpers/URLHelper';
import ContractBytecode from './ContractBytecode';
import AssetBalances from '../Account/AssetBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';
import Loader from '../Loader';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import { CONTRACT_BALANCES, CONTRACT_BYTECODE, CONTRACT_DETAILS_NUMBERS_TAB } from '../../constants/RouterConstants';

class Contract extends React.Component {

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.CONTRACT.replace(/id/, this.props.match.params.id));
		this.props.getContractInfo();
		echo.subscriber.setBlockApplySubscribe(this.updateInfo.bind(this));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.props.getContractInfo();
			this.props.setTitle(TITLE_TEMPLATES.CONTRACT.replace(/id/, this.props.match.params.id));
		}
	}

	componentWillUnmount() {
		this.props.clearContractInfo();
		echo.subscriber.removeBlockApplySubscribe(this.updateInfo.bind(this));
	}

	onLoadMoreHistory() {
		this.props.loadContractHistory(this.props.history.last()[0].id.split('.')[2]);
	}

	updateInfo() {
		const { history, loading } = this.props;
		const first = history.first();

		if (loading) { return; }

		this.props.updateContractInfo(first ? first[0].id : first);
	}


	render() {
		const {
			loading, isFullHistory, loadingMoreHistory,
			bytecode, history, balances, match: { params: { id, detail } },
		} = this.props;

		return (
			<div className="table-container inner-information-container block-information account-page contract-page with-d-table">
				<div className="account-page-t-block">
					<div className="title">Contract {id}</div>
				</div>

				<Tabs selectedIndex={CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0} onSelect={() => {}}>
					<TabList className="tab-panel" onSelect={() => {}}>
						<Tab><Link to={URLHelper.createContractUrl(id)}>Transactions</Link></Tab>
						<Tab><Link to={URLHelper.createContractUrl(id, CONTRACT_BYTECODE)}>Bytecode</Link></Tab>
						<Tab><Link to={URLHelper.createContractUrl(id, CONTRACT_BALANCES)}>Balances</Link></Tab>
					</TabList>
					<TabPanel>
						{
							!loading ?
								<TransactionsTable
									transactions={history}
									loading={loadingMoreHistory}
									loadMore={history.size && !isFullHistory ? () => this.onLoadMoreHistory() : null}
									hasMore={!isFullHistory}
								/> : <Loader />
						}
					</TabPanel>
					<TabPanel>
						{!loading ? <ContractBytecode bytecode={bytecode} /> : <Loader />}
					</TabPanel>
					<TabPanel>
						<div className="contract-asset-panel">
							{!loading ? <AssetBalances title="assets" balances={balances} /> : <Loader />}
						</div>
					</TabPanel>
				</Tabs>
			</div>
		);
	}

}

Contract.propTypes = {
	loading: PropTypes.bool,
	isFullHistory: PropTypes.bool,
	loadingMoreHistory: PropTypes.bool,
	bytecode: PropTypes.string,
	history: PropTypes.object.isRequired,
	balances: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getContractInfo: PropTypes.func.isRequired,
	clearContractInfo: PropTypes.func.isRequired,
	loadContractHistory: PropTypes.func.isRequired,
	updateContractInfo: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
};

Contract.defaultProps = {
	loading: false,
	isFullHistory: false,
	loadingMoreHistory: false,
	bytecode: null,
};

export default Contract;
