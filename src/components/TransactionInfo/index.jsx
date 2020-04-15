import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

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

class TransactionsInfo extends React.Component {

	componentDidMount() {
		const { router: { query: { round, index } }, blockInformation, operations } = this.props;
		if (!blockInformation.get('blockNumber') || !operations.size) {
			this.props.setTitle(TITLE_TEMPLATES.TRANSACTION.replace(/index/, index).replace(/round/, round));
			this.props.getBlockInfo(round);
			this.props.getTransaction(round, index);
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
		const { query: { round, index } } = this.props.router;

		const {
			operations, blockInformation, loading, router,
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

		const timeBlockCreated = FormatHelper.timestampToBlockCreationTime(blockInformation.get('time'));

		return (
			<div className="inner-container">
				<InnerHeader title={`Transaction ${index} in Block ${FormatHelper.formatAmount(round, 0)}`}>
					<BackwardsLink returnFunction={() => this.returnFunction()} />
					<BreadCrumbs breadcrumbs={breadcrumbs} />
				</InnerHeader>
				{ !loading ?
					<React.Fragment>
						<p className="description-text">{`Block has been created ${timeBlockCreated.date} ${timeBlockCreated.time}`}</p>
						<OperationsTable
							onLoadMoreHistory={() => { }}
							gridName={TRANSACTION_GRID}
							label={FormatHelper.getFormaOperationsTitle(operations.size)}
							isTransaction
							operations={operations}
							router={router}
							loading={loading}
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
};

TransactionsInfo.getInitialProps = async ({ store, query }) => {
	const { round, index, ...filters } = query;
	const title = TITLE_TEMPLATES.TRANSACTION.replace(/index/, index).replace(/round/, round);
	await store.dispatch(GridActions.initData(TRANSACTION_GRID, filters));
	await Promise.all([
		store.dispatch(GlobalActions.setTitle(title)),
		store.dispatch(getBlockInformation(round)),
		store.dispatch(TransactionActions.getTransaction(round, index)),
	]);
	return {};
};

export default TransactionsInfo;
