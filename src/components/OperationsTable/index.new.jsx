import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import queryString from 'query-string';

import URLHelper from '../../helpers/URLHelper';
import TableLabel from '../TableLabel';
import FilterBtn from '../FilterBtn';
import LoadMoreBtn from '../LoadMoreBtn';
import Operations from '../../constants/Operations';

import OperationRow from './Row.new';
import Thead from './Thead';
import OperationsPagination from './Pagination.new.';
import OperationsFilter from './Filter.new';
import { DEFAULT_SIZE_PER_PAGE } from '../../constants/TableConstants';

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
		const queryProps = queryString.parse(this.props.location.search);

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
		const { loading, location: { search } } = this.props;
		const { loading: prevLoading, location: { search: prevSearch } } = prevProps;

		const parsed = queryString.parse(search);
		const prevParsed = queryString.parse(prevSearch);
		if (!loading && loading !== prevLoading) {
			if (!parsed.op || !this.tableRefs[parsed.op - 1]) {
				return;
			}
			this.tableRefs[parsed.op - 1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		if (!parsed.op && prevParsed.op) {
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
		const { pathname, search } = this.props.location;
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
			this.props.history.push(operationUrl);

			return;
		}

		if (v !== -1) {
			showedOperations.splice(v, 1);

			if (queryProps.op && parseInt(queryProps.op, 10) - 1 === index) {
				this.props.history.push(pathname);
			}

			[index - 1, index].forEach((i) => {
				const airIndex = airRows.indexOf(i);

				if (airIndex !== -1) {
					airRows.splice(airIndex, 1);
				}
			});
		} else {
			showedOperations.push(index);
			this.props.history.push(URLHelper.createTransactionOperationUrl(pathname, index + 1));
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
			operations, isTransaction, label, loading,
		} = this.props;
		let { filterAndPaginateData } = this.props;
		const { showedOperations, airRows, isFilterOpen } = this.state;
		filterAndPaginateData = filterAndPaginateData.toJS();

		return (
			<div className="operations-table">
				<TableLabel label={label}>
					<FilterBtn onClick={this.toggleFilter} />
				</TableLabel>
				<OperationsFilter
					from={filterAndPaginateData.filters.from}
					to={filterAndPaginateData.filters.to}
					open={isFilterOpen}
					onChangeFilter={(e) => this.props.onChangeFilter(e)}
					onClearFilter={(name) => this.props.onClearFilter(name)}
				/>
				<PerfectScrollbar>
					<table>
						<Thead isTransaction={isTransaction} />
						<tbody>
							<tr className="air"><td /></tr>
							{ operations ? operations.map((op, i) => (
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
							)) : null }
						</tbody>
					</table>
					{loading && <LoadMoreBtn />}
				</PerfectScrollbar>
				{filterAndPaginateData.totalDataSize > DEFAULT_SIZE_PER_PAGE ? (
					<OperationsPagination
						totalDataSize={filterAndPaginateData.totalDataSize}
						currentPage={filterAndPaginateData.currentPage}
						sizePerPage={filterAndPaginateData.sizePerPage}
						onChangeCurrentPage={(value) => this.props.onChangeCurrentPage(value)}
						onChangeSizePerPage={(value) => this.props.onChangeSizePerPage(value)}
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
	onClearFilter: PropTypes.func,

	operations: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	changeUrl: PropTypes.bool,
	isTransaction: PropTypes.bool,
	label: PropTypes.string,
};


OperationsTable.defaultProps = {
	label: 'Transactions',
	changeUrl: false,
	loading: false,
	isTransaction: false,

	onChangeCurrentPage: () => {},
	onChangeSizePerPage: () => {},
	onChangeFilter: () => {},
	onClearFilter: () => {},
};

export default OperationsTable;
