/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
// import LoadMoreBtn from '../../../components/LoadMoreBtn';
import BreadCrumbs from '../../../components/InformationBreadCrumbs';
import FormatHelper from '../../../helpers/FormatHelper';
import { INDEX_PATH, BLOCK_INFORMATION_PATH } from '../../../constants/RouterConstants';

class TransactionsInfo extends React.Component {

	constructor() {
		super();

		this.returnFunction = this.returnFunction.bind(this);
	}

	returnFunction() {
		this.props.switchToBlockInfo(true);
	}

	render() {

		const blockNumber = 10000;
		const breadcrumbs = [
			{
				title: 'Block list',
				path: INDEX_PATH,
			},
			{
				title: `Block ${FormatHelper.formatAmount(blockNumber, 0)}`,
				path: BLOCK_INFORMATION_PATH.replace(':round', blockNumber),
			},
		];

		return (
			<React.Fragment>
				<div className="table-container inner-information-container transaction-information">
					<BreadCrumbs breadcrumbs={breadcrumbs} title="Transactions 12 in Block 1,265,456" returnFunction={this.returnFunction} />
					<div className="transaction-info-table">
						<div className="operation-title"><span className="gray">operation 1:</span>&nbsp;Transfer</div>
						<div className="table-help-container">
							<div className="row">
								<div className="title">Type</div>
								<div className="value">Transfer</div>
							</div>
							<div className="row">
								<div className="title">Block</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>1,265,456</a></div>
							</div>
							<div className="row">
								<div className="title">From</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>test92</a></div>
							</div>
							<div className="row">
								<div className="title">To</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>test90</a></div>
							</div>
							<div className="row bytecode">
								<div className="title">bytecode</div>
								<div className="value">
								608060405234801561001057600080fd5b506101a2806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630775107014610046575b600080fd5b34801561005257600080fd5b5061005b61005d565b005b60405180807f312e322e35206c69666574696d655f7265666572726572b8281111561013f578251825591602001919060010190610124565b5b50905061014d9190610151565b5090565b61017391905b8082111561016f576000816000905550600101610157565b5090565b905600a165627a7a72305820f15a07ca60484fc3690bf46c388f8330643974e18925d812c5a73ba93e5c9e400029
									<a href="" className="load-more" onClick={(e) => e.preventDefault()}>Show All</a>
									<button className="copy-bytecode">Copy</button>
								</div>
							</div>
							<div className="row">
								<div className="title">Contract id</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>28938910</a></div>
							</div>
							<div className="row">
								<div className="title">Excepted</div>
								<div className="value">None</div>
							</div>
							<div className="row">
								<div className="title">Code deposit</div>
								<div className="value">Success</div>
							</div>
						</div>
					</div>
					<div className="transaction-info-table">
						<div className="operation-title"><span className="gray">operation 2:</span>&nbsp;Account update</div>
						<div className="table-help-container">
							<div className="row">
								<div className="title">Type</div>
								<div className="value">Transfer</div>
							</div>
							<div className="row">
								<div className="title">Block</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>1,265,456</a></div>
							</div>
							<div className="row">
								<div className="title">From</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>test92</a></div>
							</div>
							<div className="row">
								<div className="title">To</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>test90</a></div>
							</div>
							<div className="row bytecode">
								<div className="title">bytecode</div>
								<div className="value">
								608060405234801561001057600080fd5b506101a2806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630775107014610046575b600080fd5b34801561005257600080fd5b5061005b61005d565b005b60405180807f312e322e35206c69666574696d655f7265666572726572b8281111561013f578251825591602001919060010190610124565b5b50905061014d9190610151565b5090565b61017391905b8082111561016f576000816000905550600101610157565b5090565b905600a165627a7a72305820f15a07ca60484fc3690bf46c388f8330643974e18925d812c5a73ba93e5c9e400029
									<a href="" className="load-more" onClick={(e) => e.preventDefault()}>Show All</a>
									<button className="copy-bytecode">Copy</button>
								</div>
							</div>
							<div className="row">
								<div className="title">Contract id</div>
								<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>28938910</a></div>
							</div>
							<div className="row">
								<div className="title">Excepted</div>
								<div className="value">None</div>
							</div>
							<div className="row">
								<div className="title">Code deposit</div>
								<div className="value">Success</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

}

TransactionsInfo.propTypes = {
	switchToBlockInfo: PropTypes.func,
};

TransactionsInfo.defaultProps = {
	switchToBlockInfo: null,
};

export default TransactionsInfo;
