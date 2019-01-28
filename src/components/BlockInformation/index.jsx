import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TransactionsTable from './TransactionsTable';
import BreadCrumbs from '../InformationBreadCrumbs';
import ViewListPopover from '../ViewListPopover';
import Loader from '../Loader';

import { INDEX_PATH } from '../../constants/RouterConstants';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';

class BlockInformation extends React.Component {

	componentDidMount() {
		this.props.getBlockInfo();

	}

	componentDidUpdate(prevProps) {
		if (this.props.blockInformation) {
			this.props.setTitle(TITLE_TEMPLATES.BLOCK.replace(/round/, this.props.blockInformation.get('round')));
		}

		if (this.props.match.params.round !== prevProps.match.params.round) {
			this.props.getBlockInfo(this.props.match.params.round);
		}
	}

	componentWillUnmount() {
		this.props.clearBlockInfo();
	}

	returnFunction() {
		if (!this.props.historyLength) {
			this.props.history.push(INDEX_PATH);
		} else {
			this.props.history.goBack();
		}
	}

	renderLoader() {
		return <Loader />;
	}

	renderBlockInformation(blockInformation) {

		const blockNumber = blockInformation.get('blockNumber') || '';
		const time = blockInformation.get('time');
		const producer = blockInformation.get('producer') || {};
		const reward = blockInformation.get('reward');
		const size = blockInformation.get('size');
		const transactions = blockInformation.get('transactions') || [];

		let verifiers = blockInformation.get('verifiers') || [];
		verifiers = verifiers.map(({ name, id }) => ({ id, name, to: URLHelper.createAccountUrl(id) }));

		const breadcrumbs = [
			{
				title: 'Block list',
				path: INDEX_PATH,
			},
		];

		return (
			<React.Fragment>
				<div className="table-container inner-information-container block-information">
					<BreadCrumbs
						breadcrumbs={breadcrumbs}
						title={`Block ${blockNumber}`}
						returnFunction={() => this.returnFunction()}
					/>
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
							<div className="value">{verifiers && verifiers.length}<ViewListPopover list={verifiers} /></div>
						</div>
					</div>
					<h2>{`${transactions && transactions.length} Transactions`}</h2>
					{transactions && transactions.length ? <TransactionsTable transactions={transactions} /> : null}
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { blockInformation } = this.props;

		return blockInformation.get('blockNumber') ? this.renderBlockInformation(blockInformation) : this.renderLoader();
	}

}

BlockInformation.propTypes = {
	blockInformation: PropTypes.object.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	historyLength: PropTypes.number,
	match: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
};

BlockInformation.defaultProps = {
	historyLength: 0,
};

export default BlockInformation;
