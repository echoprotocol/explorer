import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

import { DEFAULT_ROWS_COUNT } from '../../constants/GlobalConstants';

import ContractBytecode from './ContractBytecode';
import AssetBalances from '../Account/AssetBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';
import Loader from '../Loader';

class Contract extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loadingMoreHistory: false,
		};
	}

	componentDidMount() {
		this.props.getContractInfo();

	}

	componentWillUnmount() {
		this.props.clearContractInfo();
	}

	async onLoadMoreHistory() {
		try {
			this.setState({ loadingMoreHistory: true });
			await this.props.loadContractHistory(this.props.history.last()[0].id);
		} catch (e) {
			//
		} finally {
			this.setState({ loadingMoreHistory: false });
		}
	}

	render() {
		const {
			loading, bytecode, history, balances, cacheObjects, match: { params: { id } },
		} = this.props;
		const { loadingMoreHistory } = this.state;

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
						<Tab>Transactions{history.size ? `(${history.size})` : ''}</Tab>
						<Tab>Bytecode</Tab>
						<Tab>Balances</Tab>
					</TabList>
					<TabPanel>
						{
							!loading ?
								<TransactionsTable
									transactions={history}
									loading={loadingMoreHistory}
									loadMore={history.size >= DEFAULT_ROWS_COUNT ? () => this.onLoadMoreHistory() : null}
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
	bytecode: PropTypes.string,
	cacheObjects: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	balances: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getContractInfo: PropTypes.func.isRequired,
	clearContractInfo: PropTypes.func.isRequired,
	loadContractHistory: PropTypes.func.isRequired,
};

Contract.defaultProps = {
	loading: false,
	bytecode: null,
};

export default Contract;
