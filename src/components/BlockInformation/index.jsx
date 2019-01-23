import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TransactionsTable from './TransactionsTable';
import BreadCrumbs from '../InformationBreadCrumbs';
import ViewListPopover from '../ViewListPopover';

import { INDEX_PATH } from '../../constants/RouterConstants';

import URLHelper from '../../helpers/URLHelper';

class BlockInformation extends React.Component {

	constructor() {
		super();
		this.returnFunction = this.returnFunction.bind(this);
	}

	componentDidMount() {
		this.props.getBlockInfo();

	}

	componentWillUnmount() {
		this.props.clearBlockInfo();
	}

	returnFunction() {
		this.props.history.push(INDEX_PATH);
	}

	renderLoader() {
		// TODO loader
		return null;
	}

	render() {
		const { blockInformation, match: { params: { round } } } = this.props;

		const blockNumber = blockInformation.get('blockNumber') || '';
		const time = blockInformation.get('time');
		const producer = blockInformation.get('producer') || {};
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const transactions = blockInformation.get('transactions') || [];

		let verifiers = blockInformation.get('verifiers');
		if (verifiers) {
			verifiers = verifiers.map(({ name, id }) => ({ id, name, to: URLHelper.createAccountUrl(id) }));
		}

		const breadcrumbs = [
			{
				title: 'Block list',
				path: INDEX_PATH,
			},
		];

		return (
			<React.Fragment>
				<div className="table-container inner-information-container block-information">
					<BreadCrumbs breadcrumbs={breadcrumbs} title={`Block ${blockNumber}`} returnFunction={this.returnFunction} />
					<div className="block-description">
						<div className="container time">
							<div className="title">Time, Date</div>
							<div className="value">{time}</div>
						</div>
						<div className="container size">
							<div className="title">Size</div>
							<div className="value">{size}</div>
						</div>
						<div className="container producer">
							<div className="title">Producer</div>
							<Link to={URLHelper.createAccountUrl(producer.id)}>
								<div className="value blue">{producer.name}</div>
							</Link>
						</div>
						<div className="container reward">
							<div className="title">Reward</div>
							<div className="value">{reward}</div>
						</div>
						<div className="container verifiers">
							<div className="title">Verifiers</div>
							<div className="value">{verifiers && verifiers.length}<ViewListPopover list={verifiers || []} /></div>
						</div>
					</div>
					<h2>{`${transactions && transactions.length} Transactions`}</h2>
					{transactions && transactions.length ? <TransactionsTable transactions={transactions} round={round} /> : null}
				</div>
			</React.Fragment>
		);
	}

}

BlockInformation.propTypes = {
	blockInformation: PropTypes.object.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
};

export default BlockInformation;
