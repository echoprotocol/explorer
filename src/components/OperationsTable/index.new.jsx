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

import OperationRow from './Row.new';
import Thead from './Thead';
import OperationsPagination from './Pagination.new.';
import OperationsFilter from './Filter.new';
import { DEFAULT_SIZE_PER_PAGE } from '../../constants/TableConstants';
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
		this.props.onChangeFilter({ from: '', to: '' });
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
		}, 0);

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
		}, 300);
	}

	onChangeCurrentPage(value) {
		this.props.onChangeCurrentPage(value);
		this.props.onLoadMoreHistory();
	}

	onChangeSizePerPage(value) {
		this.props.onChangeSizePerPage(value);
		this.props.onLoadMoreHistory();
	}

	filteredOperations() {
		let { operations, filterAndPaginateData } = this.props;
		filterAndPaginateData = filterAndPaginateData.toJS();

		if (operations && (filterAndPaginateData.filters.from || filterAndPaginateData.filters.to)) {
			const { filters: { from, to } } = filterAndPaginateData;
			operations = operations.filter((operation) => {
				let [isAllowFrom, isAllowTo] = [false, false];
				if (!from && !to) {
					return true;
				}
				if (from && operation.mainInfo.from) {
					if (from === operation.mainInfo.from.name || from === operation.mainInfo.from.id) {
						isAllowFrom = true;
					}
				} else {
					isAllowFrom = true;
				}
				if (to && operation.mainInfo.subject) {
					if (to === operation.mainInfo.subject.name || to === operation.mainInfo.subject.id) {
						isAllowTo = true;
					}
				} else {
					isAllowTo = true;
				}
				return isAllowFrom && isAllowTo;
			});
		}
		return operations;
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

	toggleFilter(e) {
		const { isFilterOpen } = this.state;
		e.target.blur();
		this.setState({ isFilterOpen: !isFilterOpen });
	}

	renderTable() {
		const { isTransaction, label, loading } = this.props;
		let { filterAndPaginateData } = this.props;
		const { showedOperations, airRows, isFilterOpen } = this.state;
		filterAndPaginateData = filterAndPaginateData.toJS();

		const filteredOperations = this.filteredOperations();

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
				{filterAndPaginateData.totalDataSize > DEFAULT_SIZE_PER_PAGE ? (
					<OperationsPagination
						totalDataSize={filterAndPaginateData.totalDataSize}
						currentPage={filterAndPaginateData.currentPage}
						sizePerPage={filterAndPaginateData.sizePerPage}
						onChangeCurrentPage={(value) => this.onChangeCurrentPage(value)}
						onChangeSizePerPage={(value) => this.onChangeSizePerPage(value)}
					/>
				) : null}
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
