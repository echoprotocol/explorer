import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import queryString from 'query-string';
import Router from 'next/router';

import URLHelper from '../../helpers/URLHelper';
import TableLabel from '../TableLabel';
import FilterBtn from '../FilterBtn';
import LoadMore from '../LoadMore';
import Operations from '../../constants/Operations';

import OperationRow from './Row';
import Thead from './Thead';
import OperationsPagination from './Pagination';
import OperationsFilter from './Filter';
import { DEBOUNCE_TIMEOUT } from '../../constants/TableConstants';
import { SSR_TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';

class OperationsTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showedOperations: [],
			airRows: [],
			isFilterOpen: false,
		};
		this.timeoutSearch = null;
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

	async componentDidUpdate(prevProps) {
		const { loading, router: { query, asPath } } = this.props;
		const { loading: prevLoading, router: { query: prevQuery, asPath: asPrevPath } } = prevProps;

		const { query: search } = queryString.parseUrl(asPath);
		const { query: prevSearch } = queryString.parseUrl(asPrevPath);

		if (search.l && prevSearch.l !== search.l) {
			await this.onChangeSizePerPage(parseInt(search.l, 10));
			return;
		}

		if (search.p && prevSearch.p !== search.p) {
			await this.onChangeCurrentPage(parseInt(search.p, 10));
			return;
		}

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

	componentWillUnmount() {
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
	}

	async onChangeFilter(e) {
		const { name, value } = e.target;
		const { filterAndPaginateData } = this.props;
		const { filters } = filterAndPaginateData.toJS();
		filters[name] = value;
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		this.props.onChangeFilter(filters);
		this.timeoutSearch = setTimeout(() => {
			this.props.onLoadMoreHistory();
		}, DEBOUNCE_TIMEOUT);

	}

	onClearFilter(name) {
		const { filterAndPaginateData } = this.props;
		const { filters } = filterAndPaginateData.toJS();
		filters[name] = '';
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		this.props.onChangeFilter(filters);
		this.timeoutSearch = setTimeout(() => {
			this.props.onLoadMoreHistory();
		}, DEBOUNCE_TIMEOUT);
	}

	async onChangeCurrentPage(value) {
		await this.props.onChangeCurrentPage(value);
		this.props.onLoadMoreHistory();
	}

	async onChangeSizePerPage(value) {
		await Promise.all([
			this.props.onChangeSizePerPage(value),
			this.props.onChangeCurrentPage(1),
		]);
		this.props.onLoadMoreHistory();
	}

	filteredOperations() {
		const { filters: { from, to } } = this.props.filterAndPaginateData.toJS();
		return this.props.operations.filter((operation) => {
			const isAllowFrom = from ? (from === operation.mainInfo.from.name || from === operation.mainInfo.from.id) : true;
			const isAllowTo = to ? (to === operation.mainInfo.subject.name || to === operation.mainInfo.subject.id) : true;
			return isAllowFrom && isAllowTo;
		});
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
				trIndex = 0;
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

	toggleFilter(e) {
		const { isFilterOpen } = this.state;
		e.target.blur();
		this.setState({ isFilterOpen: !isFilterOpen });
	}

	renderTable() {
		const {
			isTransaction, label, loading, router,
		} = this.props;
		let { filterAndPaginateData } = this.props;
		const { showedOperations, airRows, isFilterOpen } = this.state;
		filterAndPaginateData = filterAndPaginateData.toJS();

		const filteredOperations = this.filteredOperations();
		const isFilteredData = filterAndPaginateData.filters.from || filterAndPaginateData.filters.to;

		return (
			<div className="operations-table">
				<TableLabel label={label}>
					<FilterBtn onClick={this.toggleFilter} />
				</TableLabel>
				<OperationsFilter
					from={filterAndPaginateData.filters.from}
					to={filterAndPaginateData.filters.to}
					open={isFilterOpen}
					onChangeFilter={(e) => this.onChangeFilter(e)}
					onClearFilter={(name) => this.onClearFilter(name)}
				/>
				<PerfectScrollbar>
					<table>
						<Thead isTransaction={isTransaction} />
						<tbody>
							<tr className="air"><td /></tr>
							{filteredOperations.map((op, i) => (
								<OperationRow
									totalDataSize={isFilteredData ? filteredOperations.size : filterAndPaginateData.totalDataSize}
									sizePerPage={filterAndPaginateData.sizePerPage}
									currentPage={filterAndPaginateData.currentPage}
									key={i.toString()}
									isTransaction={isTransaction}
									operation={op}
									index={i}
									active={showedOperations.includes(i)}
									air={airRows.includes(i)}
									tableRefs={this.tableRefs}
									toggleOperationDetails={(index) => this.toggleOperationDetails(index)}
								/>
							))}
						</tbody>
					</table>
					{loading && <LoadMore />}
				</PerfectScrollbar>
				{!isTransaction && (
					<OperationsPagination
						router={router}
						totalDataSize={isFilteredData ? filteredOperations.size : filterAndPaginateData.totalDataSize}
						currentPage={filterAndPaginateData.currentPage}
						sizePerPage={filterAndPaginateData.sizePerPage}
					/>
				)}
			</div>
		);
	}

	render() {
		return this.renderTable();
	}

}

OperationsTable.propTypes = {
	filterAndPaginateData: PropTypes.object.isRequired,
	onChangeCurrentPage: PropTypes.func,
	onChangeSizePerPage: PropTypes.func,
	onChangeFilter: PropTypes.func,
	onLoadMoreHistory: PropTypes.func,

	operations: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	loading: PropTypes.bool,
	changeUrl: PropTypes.bool,
	isTransaction: PropTypes.bool,
	label: PropTypes.string,
	router: PropTypes.object.isRequired,
};


OperationsTable.defaultProps = {
	label: 'Transactions',
	changeUrl: false,
	loading: false,
	isTransaction: false,

	onChangeCurrentPage: () => {},
	onChangeSizePerPage: () => {},
	onChangeFilter: () => {},
	onLoadMoreHistory: () => {},
};

export default OperationsTable;
