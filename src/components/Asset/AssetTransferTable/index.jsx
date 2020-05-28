import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import queryString from 'query-string';
import Router from 'next/router';
import echo, { validators } from 'echojs-lib';

import TableLabel from '../../TableLabel';
import Thead from './Thead';
import FilterBtn from '../../FilterBtn';
import TableFilter from '../../../components/TableFilter';
import TablePagination from '../../../components/TablePagination';
import Row from './Row';
import { DEBOUNCE_TIMEOUT } from '../../../constants/TableConstants';
import { NOT_FOUND_PATH, SSR_TRANSACTION_INFORMATION_PATH } from '../../../constants/RouterConstants';
import TypesHelper from '../../../helpers/TypesHelper';
import URLHelper from '../../../helpers/URLHelper';

class AssetTransfersTable extends React.Component {

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
			isFilterOpen: false,
		};
		this.timeoutSearch = null;
		this.toggleFilter = this.toggleFilter.bind(this);
		this.tableRefs = [];
	}

	componentDidMount() {
		const { showedOperations } = this.state;
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
		showedOperations.push(op - 1);
		this.setState({ showedOperations }); // eslint-disable-line react/no-did-mount-set-state
	}

	async componentDidUpdate(prevProps) {
		const { router: { asPath } } = this.props;
		const { router: { asPath: asPrevPath } } = prevProps;

		const { query: search } = queryString.parseUrl(asPath);
		const { query: prevSearch } = queryString.parseUrl(asPrevPath);

		if (prevSearch.l !== search.l || prevSearch.p !== search.p ||
      prevSearch.from !== search.from || prevSearch.to !== search.to
		) {
			await this.onChangeAssetFilters(search);
			return;
		}

		if (!search.op || !this.tableRefs[search.op - 1]) {
			return;
		}
		this.tableRefs[search.op - 1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });

		if (!search.op && prevSearch.op) {
			this.setState({ showedOperations: [] }); // eslint-disable-line react/no-did-update-set-state
		} else if (search.op && !prevSearch.op) {
			const { showedOperations } = this.state;
			const op = parseInt(search.op, 10);
			showedOperations.push(op - 1);
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ showedOperations });
		}

	}

	componentWillUnmount() {
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
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

	async onChangeAssetFilters(filters) {
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

	toggleFilter(e) {
		const { isFilterOpen } = this.state;
		e.target.blur();
		this.setState({ isFilterOpen: !isFilterOpen });
	}

	goToTransaction(e, block, transaction, op, virtual) {
		e.preventDefault();
		const transactionUrl = URLHelper.createTransactionUrl(block, transaction + 1);
		const operationUrl = URLHelper.createTransactionOperationUrl(transactionUrl, op + 1, virtual);
		Router.push(SSR_TRANSACTION_INFORMATION_PATH, operationUrl);
	}

	render() {
		const { from: { value: from, error: fromError }, to: { value: to, error: toError } } = this.state;
		const {
			label, router, assetTransfers,
		} = this.props;
		let { filterAndPaginateData } = this.props;
		const { isFilterOpen } = this.state;
		filterAndPaginateData = filterAndPaginateData && filterAndPaginateData.toJS();
		return (
			<div className="transfers-table">
				<TableLabel label={label}>
					<FilterBtn onClick={this.toggleFilter} />
				</TableLabel>
				<TableFilter
					open={isFilterOpen}
					from={from}
					fromError={fromError}
					to={to}
					toError={toError}
					onChangeFilter={(e) => this.onChangeFilter(e)}
					onClearFilter={(name) => this.onClearFilter(name)}
					onSubmitFilter={() => this.onSubmitFilter()}
				/>
				<PerfectScrollbar>
					<table>
						<Thead />
						<tbody>
							{assetTransfers.map((tr, i) => (
								<React.Fragment key={`${tr.block}-${tr.trx_in_block}-${tr.op_in_trx}`}>
									<tr className="air"><td /></tr>
									<Row
										id={i + 1}
										operation={tr.operation}
										from={tr.from}
										to={tr.to}
										amount={tr.amount}
										fee={tr.feeData}
										asset={tr.asset}
										onClick={(e) => this.goToTransaction(e, tr.block, tr.trx_in_block, tr.op_in_trx, tr.virtual)}
									/>
								</React.Fragment>
							))}
						</tbody>
					</table>
				</PerfectScrollbar>
				<TablePagination
					from={filterAndPaginateData.filters.from}
					to={filterAndPaginateData.filters.to}
					router={router}
					totalDataSize={filterAndPaginateData.totalDataSize}
					currentPage={filterAndPaginateData.currentPage}
					sizePerPage={filterAndPaginateData.sizePerPage}
				/>
			</div>
		);
	}

}

AssetTransfersTable.propTypes = {
	assetTransfers: PropTypes.object,
	label: PropTypes.string,
	filterAndPaginateData: PropTypes.object.isRequired,
	initData: PropTypes.func.isRequired,
	router: PropTypes.object.isRequired,
	onLoadMoreHistory: PropTypes.func,
};


AssetTransfersTable.defaultProps = {
	assetTransfers: {},
	label: 'Asset transfers',
	onLoadMoreHistory: () => { },
};

export default AssetTransfersTable;
