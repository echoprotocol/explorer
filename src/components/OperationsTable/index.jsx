import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import queryString from 'query-string';
import Router from 'next/router';

import URLHelper from '../../helpers/URLHelper';
import TableLabel from '../TableLabel';
import FilterBtn from '../FilterBtn';
import Operations from '../../constants/Operations';

import OperationRow from './Row';
import Thead from './Thead';
import OperationsPagination from './Pagination';
import OperationsFilter from './Filter';
import { DEBOUNCE_TIMEOUT } from '../../constants/TableConstants';
import { NOT_FOUND_PATH, SSR_TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';
import TypesHelper from '../../helpers/TypesHelper';
import Loader from '../Loader';

class OperationsTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			from: '',
			to: '',
			showedOperations: [],
			airRows: [],
			isFilterOpen: false,
		};
		this.timeoutSearch = null;
		this.toggleFilter = this.toggleFilter.bind(this);
		this.tableRefs = [];
		this.updateScroll = this.updateScroll.bind(this);
	}

	componentDidMount() {
		const { showedOperations } = this.state;
		const queryProps = queryString.parse(this.props.router.asPath.split('?')[1]);

		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({
			isFilterOpen: !!this.props.filterAndPaginateData.get('filters').from || !!this.props.filterAndPaginateData.get('filters').to,
			from: this.props.filterAndPaginateData.get('filters').from,
			to: this.props.filterAndPaginateData.get('filters').to,
		});

		if (!queryProps.op) {
			return;
		}

		if (!TypesHelper.isStringNumber(queryProps.op)) {
			Router.push(NOT_FOUND_PATH);
		}

		const op = parseInt(queryProps.op, 10);
		if (!this.tableRefs[op - 1]) {
			return;
		}
		showedOperations.push(op - 1);
		this.setState({ showedOperations }); // eslint-disable-line react/no-did-mount-set-state
	}

	async componentDidUpdate(prevProps) {
		const { loading, router: { asPath } } = this.props;
		const { loading: prevLoading, router: { asPath: asPrevPath } } = prevProps;

		const { query: search } = queryString.parseUrl(asPath);
		const { query: prevSearch } = queryString.parseUrl(asPrevPath);

		if (prevSearch.l !== search.l || prevSearch.p !== search.p ||
			prevSearch.from !== search.from || prevSearch.to !== search.to
		) {
			await this.onChangeOperationFilters(search);
			return;
		}

		if (!loading && loading !== prevLoading) {
			if (!search.op || !this.tableRefs[search.op - 1]) {
				return;
			}
			this.tableRefs[search.op - 1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		if (!search.op && prevSearch.op) {
			this.setState({ showedOperations: [] }); // eslint-disable-line react/no-did-update-set-state
		} else if (search.op && !prevSearch.op) {
			const { showedOperations } = this.state;
			const op = parseInt(search.op, 10);
			showedOperations.push(op - 1);
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ showedOperations });
		}

		window.addEventListener('resize', this.updateScroll);
	}

	componentWillUnmount() {
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		window.removeEventListener('resize', this.updateScroll);
	}

	async onChangeFilter(e) {
		const { name, value } = e.target;
		const { filterAndPaginateData, router } = this.props;
		const { filters } = filterAndPaginateData.toJS();
		filters[name] = value;
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		this.setState({ [name]: value });
		this.timeoutSearch = setTimeout(() => {
			const { url: pathname, query } = queryString.parseUrl(router.asPath);
			const linkToPage = URLHelper.createOperationUrlByFilter(pathname, query, {
				from: filters.from.trim(), to: filters.to.trim(), p: 1,
			});
			Router.push(router.route, linkToPage);
		}, DEBOUNCE_TIMEOUT);

	}

	onClearFilter(name) {
		const { filterAndPaginateData, router } = this.props;
		const { filters } = filterAndPaginateData.toJS();
		filters[name] = '';
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		this.setState({ [name]: '' });
		this.timeoutSearch = setTimeout(() => {
			const { url: pathname, query } = queryString.parseUrl(router.asPath);
			const linkToPage = URLHelper.createOperationUrlByFilter(pathname, query, {
				from: filters.from, to: filters.to, p: 1,
			});
			Router.push(router.route, linkToPage);
		}, DEBOUNCE_TIMEOUT);
	}

	async onChangeOperationFilters(filters) {
		const { totalDataSize } = this.props.filterAndPaginateData.toJS();
		await this.props.initData({ ...filters, totalDataSize });
		this.props.onLoadMoreHistory();
	}

	updateScroll() {
		console.log('updte');
		if (this.scrollBarRef) {
			this.scrollBarRef.updateScroll();
		}
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
			const { trIndex, opIndex } = operations.get(index);

			// TODO delete in future
			if (Operations.block_reward.name === type) {
				const transactionUrl = URLHelper.createTransactionUrl(blockNumber, 1);
				Router.push(SSR_TRANSACTION_INFORMATION_PATH, transactionUrl);
				return;
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
		const { from, to } = this.state;
		const {
			isTransaction, label, loading, router, isMobile, isASCOps,
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
					from={from}
					to={to}
					open={isFilterOpen}
					onChangeFilter={(e) => this.onChangeFilter(e)}
					onClearFilter={(name) => this.onClearFilter(name)}
				/>
				<PerfectScrollbar ref={(ref) => { this.scrollBarRef = ref; }}>
					<table>
						<Thead isTransaction={isTransaction} />
						<tbody>
							<tr className="air"><td /></tr>
							{this.props.operations.map((op, i) => (
								<OperationRow
									isASCOps={isASCOps}
									isMobile={isMobile}
									totalDataSize={filterAndPaginateData.totalDataSize}
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
					{loading && <Loader />}
				</PerfectScrollbar>
				{!isTransaction && (
					<OperationsPagination
						from={filterAndPaginateData.filters.from}
						to={filterAndPaginateData.filters.to}
						router={router}
						totalDataSize={filterAndPaginateData.totalDataSize}
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
	isASCOps: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	filterAndPaginateData: PropTypes.object.isRequired,
	initData: PropTypes.func.isRequired,
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

	onLoadMoreHistory: () => {},
};

export default OperationsTable;
