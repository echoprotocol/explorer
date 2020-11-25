import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import queryString from 'query-string';

import { INDEX_PATH, BLOCK_INFORMATION_PATH, SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import { TRANSACTION_GRID } from '../../constants/TableConstants';

import FormatHelper from '../../helpers/FormatHelper';
import BreadCrumbs from '../../components/InformationBreadCrumbs';
import BackwardsLink from '../BackwardLink';
import InnerHeader from '../InnerHeader';
import Loader from '../Loader';
import OperationsTable from '../../containers/OperationsTable';

import GlobalActions from '../../actions/GlobalActions';
import { getBlockInformation } from '../../actions/BlockActions';
import TransactionActions from '../../actions/TransactionActions';
import GridActions from '../../actions/GridActions';
import URLHelper from '../../helpers/URLHelper';

class TransactionsInfo extends React.Component {

	componentDidMount() {
		const { router: { query: { round, index }, asPath }, blockInformation, operations } = this.props;
		const { query } = queryString.parseUrl(asPath);

		if (!blockInformation.get('blockNumber') || !operations.size) {
			this.props.setTitle(TITLE_TEMPLATES.TRANSACTION.replace(/index/, index).replace(/round/, round));
			this.props.getBlockInfo(round);
			this.props.getTransaction(round, index, query.virtual);
		}
	}

	componentWillUnmount() {
		this.props.clearTransaction();
	}

	returnFunction() {
		const { route, path } = this.props.history;
		if (!route) {
			Router.push(SSR_BLOCK_INFORMATION_PATH, BLOCK_INFORMATION_PATH.replace(/:round/, this.props.router.query.round));
		} else {
			Router.push(route, path);
		}
	}

	renderLoader(loading) {
		return loading ? <Loader /> : null;
	}

	render() {
		const { query: { round, index }, asPath } = this.props.router;
		const { query: { virtual } } = queryString.parseUrl(asPath);
		const {
			operations, blockInformation, loading, router, transactionHash,
		} = this.props;

		const breadcrumbs = [
			{
				title: 'Blocks list',
				href: INDEX_PATH,
				as: INDEX_PATH,
			},
			{
				title: `Block ${FormatHelper.formatAmount(round, 0)}`,
				href: SSR_BLOCK_INFORMATION_PATH,
				as: BLOCK_INFORMATION_PATH.replace(/:round/, round),
			},
		];

		const timeBlockCreated = FormatHelper.timestampToBlockCreationTime(blockInformation.get('timestamp'));

		return (
			<div className="inner-container">
				<div className="page-breadcrumbs">
					<BreadCrumbs breadcrumbs={breadcrumbs} />
				</div>
				<InnerHeader>
					<BackwardsLink returnFunction={() => this.returnFunction()} className="move-top" />
					<div className="inner-header-title">{`Transaction ${index} in Block ${FormatHelper.formatAmount(round, 0)}`}</div>
				</InnerHeader>
				{ !loading ?
					<React.Fragment>
						<p className="description-text">{`Block has been created ${timeBlockCreated.date} ${timeBlockCreated.time}`}</p>
						<p className="description-text">
							{transactionHash ?
								<React.Fragment>
									Tx hash: <a href={URLHelper.createTransactionUrlByHash(transactionHash)}>{transactionHash}</a>
								</React.Fragment>
								: null
							}
						</p>
						<OperationsTable
							isASCOps
							onLoadMoreHistory={() => this.props.getTransaction(round, index, virtual)}
							gridName={TRANSACTION_GRID}
							label={FormatHelper.getFormaOperationsTitle(operations.size)}
							isTransaction
							operations={operations}
							router={router}
							loading={loading}
							txHash={transactionHash}
							changeUrl
						/>
					</React.Fragment> : this.renderLoader(loading)
				}
			</div>
		);
	}

}

TransactionsInfo.propTypes = {
	history: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	transactionHash: PropTypes.string,
	operations: PropTypes.object,
	getTransaction: PropTypes.func.isRequired,
	clearTransaction: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	blockInformation: PropTypes.object.isRequired,
};

TransactionsInfo.defaultProps = {
	operations: null,
	loading: false,
	transactionHash: '',
};

TransactionsInfo.getInitialProps = async ({ store, query, asPath }) => {
	const { round, index, ...filters } = query;

	const { query: { virtual } } = queryString.parseUrl(asPath);

	const title = TITLE_TEMPLATES.TRANSACTION.replace(/index/, index).replace(/round/, round);
	await store.dispatch(GridActions.initData(TRANSACTION_GRID, filters));
	await Promise.all([
		store.dispatch(GlobalActions.setTitle(title)),
		store.dispatch(getBlockInformation(round)),
		store.dispatch(TransactionActions.getTransaction(round, index, virtual)),
	]);
	return {};
};

export default TransactionsInfo;
