import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import echo from 'echojs-lib';

import ContractBytecode from './ContractBytecode';
import AssetBalances from '../Account/AssetBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';
import Loader from '../Loader';

import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';

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
			bytecode, history, balances, cacheObjects, match: { params: { id } },
		} = this.props;

		const contractBalances = balances.map((b, i) => ({
			id: i,
			amount: b.get('amount'),
			asset: cacheObjects.get(b.get('asset_id')),
		}));

		return (
			<div className="table-container inner-information-container block-information account-page contract-page">
				<div className="account-page-t-block">
					<div className="title">Contract {id}</div>
				</div>
				<Tabs>
					<TabList className="tab-panel">
						<Tab>Transactions</Tab>
						<Tab>Bytecode</Tab>
						<Tab>Balances</Tab>
					</TabList>
					<TabPanel>
						{
							!loading ?
								<TransactionsTable
									transactions={history}
									loading={loadingMoreHistory}
									loadMore={history.size && !isFullHistory ? () => this.onLoadMoreHistory() : null}
								/> : <Loader />
						}
					</TabPanel>
					<TabPanel>
						{!loading ? <ContractBytecode bytecode={bytecode} /> : <Loader />}
					</TabPanel>
					<TabPanel>
						<div className="contract-asset-panel">
							{!loading ? <AssetBalances title="assets" balances={contractBalances} /> : <Loader />}
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
	cacheObjects: PropTypes.object.isRequired,
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
