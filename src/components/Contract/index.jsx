import React from 'react';
import { Map, List } from 'immutable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

import ContractBytecode from './ContractBytecode';
import AssetBalances from '../Account/AssetBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';

import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';

class Contract extends React.Component {

	componentDidMount() {
		this.props.getContractInfo();

		this.props.setTitle(TITLE_TEMPLATES.CONTRACT.replace(/id/, this.props.match.params.id));
	}

	componentWillUnmount() {
		this.props.clearContractInfo();
	}

	render() {
		const { bytecode, match: { params: { id } } } = this.props;

		return (
			<div className="table-container inner-information-container block-information account-page contract-page">
				<div className="account-page-t-block">
					<div className="title">Contract {id}</div>
				</div>
				<Tabs>
					<TabList className="tab-panel">
						<Tab>Transactions(43)</Tab>
						<Tab>Bytecode</Tab>
						<Tab>Assets</Tab>
					</TabList>
					<TabPanel>
						<TransactionsTable transactions={new List([])} />
					</TabPanel>
					<TabPanel>
						<ContractBytecode bytecode={bytecode} />
					</TabPanel>
					<TabPanel>
						<div className="contract-asset-panel">
							<AssetBalances balances={new Map({})} owner={new List([])} />
						</div>
					</TabPanel>
				</Tabs>
			</div>
		);
	}

}

Contract.propTypes = {
	bytecode: PropTypes.string,
	match: PropTypes.object.isRequired,
	getContractInfo: PropTypes.func.isRequired,
	clearContractInfo: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
};

Contract.defaultProps = {
	bytecode: null,
};

export default Contract;
