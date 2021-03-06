import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import queryString from 'query-string';
import Router from 'next/router';
import echo, { validators } from 'echojs-lib';

import URLHelper from '../../helpers/URLHelper';
import TableLabel from '../TableLabel';
import FilterBtn from '../FilterBtn';
import Operations from '../../constants/Operations';

import OperationRow from './Row';
import Thead from './Thead';
import TablePagination from '../TablePagination';
import TableFilter from '../TableFilter';
import { DEBOUNCE_TIMEOUT } from '../../constants/TableConstants';
import { NOT_FOUND_PATH, SSR_TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';
import TypesHelper from '../../helpers/TypesHelper';
import Loader from '../Loader';

class OperationsTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			from: {
				error: '',
				value: '',
			},
			to: {
				error: '',
				value: '',
			},
			showedOperations: [],
			showEventLogs: [],
			airRows: [],
			isFilterOpen: false,
		};
		this.timeoutSearch = null;
		this.toggleFilter = this.toggleFilter.bind(this);
		this.tableRefs = [];
		this.updateScroll = this.updateScroll.bind(this);
	}

	componentDidMount() {
		const { showedOperations, showEventLogs } = this.state;
		const queryProps = queryString.parse(this.props.router.asPath.split('?')[1]);

		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({
			isFilterOpen: !!this.props.filterAndPaginateData.get('filters').from || !!this.props.filterAndPaginateData.get('filters').to,
			from: {
				value: this.props.filterAndPaginateData.get('filters').from,
				error: '',
			},
			to: {
				value: this.props.filterAndPaginateData.get('filters').to,
				error: '',
			},
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

		if (queryProps.logs === 'true') {
			showEventLogs.push(op - 1);
		}
		showedOperations.push(op - 1);
		this.setState({ showedOperations, showEventLogs }); // eslint-disable-line react/no-did-mount-set-state
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
			this.setState({ showedOperations: [], showEventLogs: [] }); // eslint-disable-line react/no-did-update-set-state
		} else if (search.op && !prevSearch.op) {
			const { showedOperations, showEventLogs } = this.state;
			const op = parseInt(search.op, 10);
			showedOperations.push(op - 1);
			if (search.logs === 'true') {
				showEventLogs.push(op - 1);
			}
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ showedOperations, showEventLogs });
		}

		window.addEventListener('resize', this.updateScroll);
	}

	componentWillUnmount() {
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		window.removeEventListener('resize', this.updateScroll);
	}

	onChangeFilter(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: {
				value,
			},
		});
	}

	async onSubmitFilter() {
		const { router } = this.props;
		const fromValidation = await this.validateFilterInput(this.state.from.value);
		const toValidation = await this.validateFilterInput(this.state.to.value);
		const isFilterValid = fromValidation === '' && toValidation === '';
		if (!isFilterValid) {
			this.setState({
				from: {
					...this.state.from,
					error: fromValidation,
				},
				to: {
					...this.state.to,
					error: toValidation,
				},
			});
			return false;
		}

		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}

		this.timeoutSearch = setTimeout(() => {
			const { url: pathname, query } = queryString.parseUrl(router.asPath);
			const linkToPage = URLHelper.createOperationUrlByFilter(pathname, query, {
				from: this.state.from.value.trim(), to: this.state.to.value.trim(), p: 1,
			});
			Router.push(router.route, linkToPage);
		}, DEBOUNCE_TIMEOUT);

		return null;
	}

	onClearFilter(name) {
		const { filterAndPaginateData, router } = this.props;
		const { filters } = filterAndPaginateData.toJS();
		filters[name] = '';
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		this.setState({
			[name]: {
				value: '',
			},
		});
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

	async validateFilterInput(value) {
		if (!value) { return ''; }
		if (validators.isAccountId(value)) {
			return '';
		}
		let account = null;
		try {
			account = await echo.api.getAccountByName(value.trim());
			if (account) {
				return '';
			}
			return 'invalid value';
		} catch (err) {
			return 'invalid value';
		}
	}

	updateScroll() {
		if (this.scrollBarRef) {
			this.scrollBarRef.updateScroll();
		}
	}

	toggleOperationDetails(index) {
		const { operations } = this.props;
		const { asPath } = this.props.router;
		const [pathname, search] = asPath.split('?');
		const { showedOperations, airRows, showEventLogs } = this.state;
		const queryProps = queryString.parse(search);
		const v = showedOperations.indexOf(index);
		const showLog = queryProps.logs === 'true';

		if (!this.props.changeUrl && operations && operations.size) {
			const { blockNumber, type } = operations.get(index);
			const { trIndex, opIndex, virtual } = operations.get(index);

			// TODO delete in future
			if (Operations.block_reward.name === type) {
				const transactionUrl = URLHelper.createTransactionUrl(blockNumber, 1, virtual);
				Router.push(SSR_TRANSACTION_INFORMATION_PATH, transactionUrl);
				return;
			}

			const transactionUrl = URLHelper.createTransactionUrl(blockNumber, trIndex + 1);
			const operationUrl = URLHelper.createTransactionOperationUrl(transactionUrl, opIndex + 1, virtual, showLog);
			Router.push(SSR_TRANSACTION_INFORMATION_PATH, operationUrl);

			return;
		}

		if (v !== -1) {
			showedOperations.splice(v, 1);
			showEventLogs.splice(v, 1);

			if (queryProps.op && parseInt(queryProps.op, 10) - 1 === index) {
				Router.push(SSR_TRANSACTION_INFORMATION_PATH, `${pathname}?virtual=${queryProps.virtual}`);
			}

			[index - 1, index].forEach((i) => {
				const airIndex = airRows.indexOf(i);

				if (airIndex !== -1) {
					airRows.splice(airIndex, 1);
				}
			});
		} else {
			const mainOperation = operations.get(index) || {};
			showedOperations.push(index);
			if (showLog) {
				showEventLogs.push(index);
			}
			Router.push(SSR_TRANSACTION_INFORMATION_PATH, URLHelper.createTransactionOperationUrl(pathname, index + 1, mainOperation.virtual, showLog));
		}

		if (showedOperations.includes(index) && airRows.indexOf(index - 1) === -1) {
			airRows.push(index - 1);
		}

		if (showedOperations.includes(index) && airRows.indexOf(index) === -1) {
			airRows.push(index);
		}

		this.setState({ showedOperations, airRows, showEventLogs });
	}

	toggleFilter(e) {
		const { isFilterOpen } = this.state;
		e.target.blur();
		this.setState({ isFilterOpen: !isFilterOpen });
	}

	renderTable() {
		const { from: { value: from, error: fromError }, to: { value: to, error: toError } } = this.state;
		const {
			isTransaction, label, loading, router, isMobile, isASCOps,
		} = this.props;
		let { filterAndPaginateData } = this.props;
		const { showedOperations, isFilterOpen, showEventLogs } = this.state;
		filterAndPaginateData = filterAndPaginateData.toJS();
		return (
			<div className="operations-table">
				<TableLabel label={label}>
					<FilterBtn onClick={this.toggleFilter} />
				</TableLabel>
				<TableFilter
					from={from}
					fromError={fromError}
					loading={loading}
					to={to}
					toError={toError}
					open={isFilterOpen}
					onChangeFilter={(e) => this.onChangeFilter(e)}
					onClearFilter={(name) => this.onClearFilter(name)}
					onSubmitFilter={() => this.onSubmitFilter()}
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
									key={`${i.toString()}${op.id}${op.type}`}
									isTransaction={isTransaction}
									operation={op}
									index={i}
									active={showedOperations.includes(i)}
									showLogs={showEventLogs.includes(i)}
									tableRefs={this.tableRefs}
									toggleOperationDetails={(index) => this.toggleOperationDetails(index)}
								/>
							))}
						</tbody>
					</table>
					{loading && <Loader />}
				</PerfectScrollbar>
				{!isTransaction && (
					<TablePagination
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
