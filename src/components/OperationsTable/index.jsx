import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Router from 'next/router';

import URLHelper from '../../helpers/URLHelper';
import TableLabel from '../TableLabel';
import FilterBtn from '../FilterBtn';
import LoadMore from '../LoadMore';
import Operations from '../../constants/Operations';
import { SSR_TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';

import OperationRow from './Row';
import Thead from './Thead';
import OperationsPagination from './Pagination';
import OperationsFilter from './Filter';

class OperationsTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showedOperations: [],
			airRows: [],
			isFilterOpen: false,
		};
		this.toggleFilter = this.toggleFilter.bind(this);
		this.tableRefs = [];
	}

	componentDidMount() {
		const { showedOperations } = this.state;
		const queryProps = queryString.parse(this.props.router.asPath.split('?')[1]);
		if (!queryProps.op) {
			return;
		}
		const op = parseInt(queryProps.op, 10);

		if (!this.tableRefs[op - 1]) {
			return;
		}
		showedOperations.push(op - 1);
		this.setState({ showedOperations }); // eslint-disable-line react/no-did-mount-set-state
	}

	componentDidUpdate(prevProps) {
		const { loading, router: { query } } = this.props;
		const { loading: prevLoading, router: { query: prevQuery } } = prevProps;

		if (!loading && loading !== prevLoading) {
			if (!query.op || !this.tableRefs[query.op - 1]) {
				return;
			}
			this.tableRefs[query.op - 1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		if (!prevQuery.op && prevQuery.op) {
			this.setState({ showedOperations: [] }); // eslint-disable-line react/no-did-update-set-state
		}
	}

	toggleFilter(e) {
		const { isFilterOpen } = this.state;
		e.target.blur();
		this.setState({ isFilterOpen: !isFilterOpen });
	}

	toggleOperationDetails(index) {
		const { operations } = this.props;
		const { asPath } = this.props.router;
		const [pathname, search] = asPath.split('?');
		const { showedOperations, airRows } = this.state;
		const queryProps = queryString.parse(search);
		const v = showedOperations.indexOf(index);

		if (!this.props.changeUrl && operations && operations.size) {
			const { blockNumber, type } = operations.get(index);
			let { trIndex, opIndex } = operations.get(index);
			// TODO delete in future
			if (Operations.block_reward.name === type) {
				trIndex -= 1;
				opIndex = -2;
			}

			const transactionUrl = URLHelper.createTransactionUrl(blockNumber, trIndex + 1);
			const operationUrl = URLHelper.createTransactionOperationUrl(transactionUrl, opIndex + 1);
			Router.push(SSR_TRANSACTION_INFORMATION_PATH, operationUrl);
			return;
		}

		if (v !== -1) {
			showedOperations.splice(v, 1);

			if (queryProps.op && parseInt(queryProps.op, 10) - 1 === index) {
				Router.push(SSR_TRANSACTION_INFORMATION_PATH, pathname);
			}

			[index - 1, index].forEach((i) => {
				const airIndex = airRows.indexOf(i);

				if (airIndex !== -1) {
					airRows.splice(airIndex, 1);
				}
			});
		} else {
			showedOperations.push(index);
			Router.push(SSR_TRANSACTION_INFORMATION_PATH, URLHelper.createTransactionOperationUrl(pathname, index + 1));
		}

		if (showedOperations.includes(index) && airRows.indexOf(index - 1) === -1) {
			airRows.push(index - 1);
		}

		if (showedOperations.includes(index) && airRows.indexOf(index) === -1) {
			airRows.push(index);
		}

		this.setState({ showedOperations, airRows });
	}

	renderTable() {
		const {
			operations, hasMore, loading, isTransaction, label, loadMore,
		} = this.props;
		const { showedOperations, airRows, isFilterOpen } = this.state;

		return (
			<div className="operations-table">
				<TableLabel label={label}>
					<FilterBtn onClick={this.toggleFilter} />
				</TableLabel>
				<OperationsFilter open={isFilterOpen} />
				<PerfectScrollbar>
					<table>
						<Thead isTransaction={isTransaction} />
						<tbody>
							<tr className="air"><td /></tr>
							{ operations ? operations.map((op, i) => (
								<OperationRow
									key={i.toString()}
									isTransaction={isTransaction}
									operation={op}
									index={i}
									active={showedOperations.includes(i)}
									air={airRows.includes(i)}
									tableRefs={this.tableRefs}
									toggleOperationDetails={(index) => this.toggleOperationDetails(index)}
								/>
							)) : null }
						</tbody>
					</table>
					{hasMore && <LoadMore loading={loading} loadMore={() => loadMore()} />}
				</PerfectScrollbar>
				<OperationsPagination />
			</div>
		);
	}

	render() {
		const { hasMore, loadMore } = this.props;


		return (
			loadMore ?
				<InfiniteScroll loadMore={() => this.props.loadMore()} hasMore={hasMore} >
					{this.renderTable()}
				</InfiniteScroll> :
				this.renderTable()
		);
	}

}

OperationsTable.propTypes = {
	operations: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	router: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	hasMore: PropTypes.bool,
	changeUrl: PropTypes.bool,
	isTransaction: PropTypes.bool,
	loadMore: PropTypes.func,
	label: PropTypes.string,
};


OperationsTable.defaultProps = {
	label: 'Transactions',
	hasMore: false,
	changeUrl: false,
	loading: false,
	isTransaction: false,
	loadMore: null,
};

export default OperationsTable;
