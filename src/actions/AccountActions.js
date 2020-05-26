import echo, { validators, OPERATIONS_IDS } from 'echojs-lib';
import Inmmutable, { List, fromJS } from 'immutable';
import BN from 'bignumber.js';

import { TITLE_TEMPLATES, TOKEN_TYPE, ECHO_ASSET, EBTC_ASSET_ID, EETH_ASSET_ID } from '../constants/GlobalConstants';
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

		let accountHistory = transactions.map(async (t) => {
			const { op: operation, result } = t;
			const block = await echo.api.getBlock(t.block_num);

			return TransactionActions.getOperation(
				operation,
				t.block_num,
				block ? block.timestamp : null,
				t.trx_in_block,
				t.op_in_trx,
				result,
				null,
				accountId,
				t.id,
				t.virtual,
				true,
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

				let objects = await echo.api.getObjects(objectIds);

				objects = objects.reduce((result, item) => result.set(item.id, fromJS(item)), new Map());

				const filteredObjects = fromJS(account.balances).reduce(
					(map, s, a) => map.set(a, objects.get(a)).set(s, objects.get(s)),
					Inmmutable.Map({}),
				);

				const balanceToSave = fromJS(account.balances).mapEntries(([assetId, statsId]) => ([
					assetId,
					{
						asset: filteredObjects.get(assetId),
						amount: filteredObjects.getIn([statsId, 'balance']),
						id: filteredObjects.getIn([statsId, 'id']),
					},
				]));

				const { total } = await dispatch(this.loadAccountHistory(account.id));
				dispatch(GlobalActions.setTitle(TITLE_TEMPLATES.ACCOUNT.replace(/name/, account.name)));
				dispatch(this.setMultipleValue({ id: account.id, balances: balanceToSave, echoAccountInfo: fromJS(account) }));
				let balances = [];
				try {
					balances = await getBalances([account.id]);
				} catch (err) {
					console.log('EchoDb error', err);
				}
				const tokens = balances.data.getBalances.filter((balanceItem) =>
					balanceItem.type === TOKEN_TYPE && !(new BN(balanceItem.amount)).isEqualTo(0));

				dispatch(this.setMultipleValue({ tokens, totalAccountHistory: total }));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
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
				trx_in_block: data.trx_in_block,
				op_in_trx: data.op_in_trx,
				virtual_op: 0,
				virtual: data.virtual,
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
			let total = 0;
			let items = [];
			try {
				const queryData = getState().grid.get(ACCOUNT_GRID).toJS();
				dispatch(this.setValue('loadingMoreHistory', true));
				const subject = accountId;

				const getObjectId = async (objectId) => {
					if (!objectId) { return null; }
					if (validators.isContractId(objectId)) {
						return objectId;
					}
					let account = null;
					try {
						account = await echo.api.getAccountByName(objectId.trim());
						if (account) {
							account = account.id;
						}
						// eslint-disable-next-line no-empty
					} catch (err) { }
					return account;
				};

				const [fromFilter, toFilter] = await Promise.all([
					getObjectId(queryData.filters.from),
					getObjectId(queryData.filters.to),
				]);

				try {
					({ items, total } = await getHistory({
						subject,
						fromFilter: fromFilter || undefined,
						toFilter: toFilter || undefined,
						offset: (queryData.currentPage - 1) * queryData.sizePerPage,
						count: queryData.sizePerPage,
						operations: Object.keys(OPERATIONS_IDS),
					}));
				} catch (err) {
					console.log('EchoDb error', err);
				}

				dispatch(GridActions.setTotalDataSize(ACCOUNT_GRID, total));
				let transactions = this.formatHistoryFromEchoDB(items);
				transactions = await this.formatAccountHistory(accountId, transactions);
				dispatch(this.setValue('history', new List(transactions)));
				return { total, items };
			} catch (e) {
				dispatch(this.setValue('error', e.message));
				return { total, items };
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

	incTotalAccountHistory() {
		return (dispatch, getState) => {
			const totalAccountHistory = getState().account.get('totalAccountHistory');
			dispatch(this.setValue('totalAccountHistory', totalAccountHistory + 1));
		};
	}

	/**
	* Format account history
	* @param {String} accountId
	* @returns {Promise<Object>}
	*/
	async getCommitteAdditionalInfo(accountId) {
		const assetsIds = [
			ECHO_ASSET.ID,
			EETH_ASSET_ID,
			EBTC_ASSET_ID,
		];
		const [committeBalances, committeeFrozenData, assetsData, committeMember] = await Promise.all([
			echo.api.getAccountBalances(accountId, assetsIds),
			echo.api.getFrozenBalances(accountId),
			echo.api.getAssets(assetsIds),
			echo.api.getCommitteeMemberByAccount(accountId),
		]);
		const assets = assetsData.map((el) => ({
			amount: committeBalances.find((b) => b.asset_id === el.id).amount,
			asset_id: el.id,
			precision: el.precision,
			symbol: el.symbol,
		}));
		const website = committeMember && committeMember.url;
		const frozenBalance = committeeFrozenData.length ? committeeFrozenData.map((b) => {
			const currentAsset = assetsData.find((el) => el.asset_id === b.asset_id);
			return {
				amount: b.amount,
				asset_id: b.asset_id,
				precision: currentAsset.precision,
				symbol: currentAsset.symbol,
			};
		}) : [{
			amount: 0,
			asset_id: ECHO_ASSET.ID,
			precision: ECHO_ASSET.PRECISION,
			symbol: ECHO_ASSET.SYMBOL,
		}];
		return { assets, frozenBalance, website };
	}

}

export default new AccountActions();
