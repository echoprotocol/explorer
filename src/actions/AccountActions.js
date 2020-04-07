import echo, { validators, OPERATIONS_IDS } from 'echojs-lib';
import { List, fromJS } from 'immutable';
import BN from 'bignumber.js';

import { TOKEN_TYPE } from '../constants/GlobalConstants';
import { MODAL_ERROR } from '../constants/ModalConstants';

import AccountReducer from '../reducers/AccountReducer';

import GlobalActions from './GlobalActions';
import BaseActionsClass from './BaseActionsClass';
import ModalActions from './ModalActions';
import TransactionActions from './TransactionActions';

import { BridgeService } from '../services/BridgeService';
import { getBalances } from '../services/queries/balance';
import { getHistory } from '../services/queries/history';
import { ACCOUNT_GRID } from '../constants/TableConstants';
import GridActions from './GridActions';

class AccountActions extends BaseActionsClass {

	/** Set reducer
	 * @constructor
	 */
	constructor() {
		super(AccountReducer);
	}

	/**
	 * Format account history
	 * @param {String} accountId
	 * @param {Array} transactions
	 * @returns {function}
	 */
	async formatAccountHistory(accountId, transactions) {
		await TransactionActions.fetchTransactionsObjects(transactions);

		let accountHistory = transactions.map(async (t) => {
			const { op: operation, result } = t;
			const block = await echo.api.getBlock(t.block_num);

			return TransactionActions.getOperation(
				operation,
				t.block_num,
				block.timestamp,
				t.trx_in_block,
				t.op_in_trx,
				result,
				null,
				accountId,
				t.id,
			);
		});

		accountHistory = await Promise.all(accountHistory);
		return accountHistory.filter((t) => t);
	}

	/**
	 * Get account info
	 * @param {string} id
	 * @returns {function}
	 */
	getAccountInfo(id) {
		return async (dispatch) => {
			if (!validators.isAccountId(id) && !validators.isAccountName(id)) {
				dispatch(GlobalActions.toggleErrorPath(true));
				return;
			}

			dispatch(this.setValue('loading', true));

			try {
				const [account] = await echo.api.getFullAccounts([id]);

				if (!account) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				const objectIds = Object.entries(account.balances).reduce((arr, b) => [...arr, ...b], []);

				await echo.api.getObjects(objectIds);

				dispatch(this.setMultipleValue({ id: account.id, balances: fromJS(account.balances) }));
				const balances = await getBalances([account.id]);

				const tokens = balances.data.getBalances.filter((balanceItem) =>
					balanceItem.type === TOKEN_TYPE && !(new BN(balanceItem.amount)).isEqualTo(0));

				dispatch(this.setMultipleValue({ tokens }));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

	/**
	 * Update account balances
	 * @param {Map} balances
	 * @returns {function}
	 */
	updateAccountBalances(balances) {
		return async (dispatch) => {
			const objectIds = balances.reduce((arr, key, value) => [...arr, key, value], []);
			await echo.api.getObjects(objectIds);

			dispatch(this.setMultipleValue({ balances }));
		};
	}

	/**
	 * @method formatHistoryFromEchoDB
	 * @param history
	 * @return {*}
	 */
	formatHistoryFromEchoDB(history) {
		return history.map((data) => {
			const operationId = parseInt(data.id, 10);
			return ({
				id: operationId,
				op: [operationId, data.body],
				result: [0, data.result],
				block_num: data.transaction ? data.transaction.block.round : data.block.round,
				trx_in_block: data.trx_in_block || 0,
				op_in_trx: data.op_in_trx || 0,
				virtual_op: 0,
			});
		});
	}

	/**
	 * Load account history
	 * @param {string} accountId
	 * @returns {function}
	 */
	loadAccountHistory(accountId) {
		return async (dispatch, getState) => {
			try {
				const queryData = getState().grid.get(ACCOUNT_GRID).toJS();
				dispatch(this.setValue('loadingMoreHistory', true));

				const subject = accountId;
				const relationSubjects = [];

				const addRelationSubjects = async (objectId) => {
					if (!objectId) { return; }
					if (validators.isContractId(objectId)) {
						relationSubjects.push(objectId);
					} else {
						let account = null;
						try {
							account = await echo.api.getAccountByName(objectId);
							if (account && accountId !== account.id) {
								relationSubjects.push(account.id);
							}
						} catch (err) {
							console.log('Error set filter', objectId, err);
						}
					}
				};

				await Promise.all(Array.from(new Set([queryData.filters.from, queryData.filters.to]))
					.map((filter) => addRelationSubjects(filter)));

				const { items, total } = await getHistory({
					subject,
					relationSubjects,
					offset: (queryData.currentPage - 1) * queryData.sizePerPage,
					count: queryData.sizePerPage,
					operations: Object.keys(OPERATIONS_IDS),
				});
				dispatch(GridActions.setTotalDataSize(ACCOUNT_GRID, total));
				let transactions = this.formatHistoryFromEchoDB(items);
				transactions = await this.formatAccountHistory(accountId, transactions);
				dispatch(this.setValue('history', new List(transactions)));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loadingMoreHistory', false));
			}
		};
	}

	loadActiveAccount() {
		return async (dispatch) => {
			if (!BridgeService.isExist()) return;

			const account = BridgeService.loadActiveAccount();

			dispatch(this.setActiveAccount(account));
		};
	}

	checkActiveAccount() {
		return async (dispatch, getState) => {
			const activeAccountId = getState().global.getIn(['activeAccount', 'id']);

			if (!activeAccountId) {
				const account = await BridgeService.getAccount();

				if (!account) {
					dispatch(ModalActions.openModal(MODAL_ERROR, { title: 'No accounts' }));
					return false;
				}

				dispatch(this.setActiveAccount(account));
				return true;
			}

			return true;
		};
	}

	setActiveAccount(account) {
		return (dispatch) => {
			dispatch(GlobalActions.setValue('activeAccount', fromJS(account)));
		};
	}

}

export default new AccountActions();
