import echo, { validators } from 'echojs-lib';

import SearchReducer from '../reducers/SearchReducer';

import { SEARCH_LIMIT, DEFAULT_ERROR_SEARCH } from '../constants/SearchConstants';
import {
	ACCOUNT_OBJECT_PREFIX,
	ASSET_OBJECT_PREFIX,
	CONTRACT_OBJECT_PREFIX,
} from '../constants/ObjectPrefixesConstants';

import BaseActionsClass from './BaseActionsClass';

import URLHelper from '../helpers/URLHelper';
import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';
import { getLimitHints } from '../helpers/SearchHelper';

import { getToken, getContractBySymbol } from '../services/queries/contract';
import { getAssetsBySymbols } from '../services/queries/asset';
import ApiService from '../services/ApiService';

class SearchActions extends BaseActionsClass {

	/** Set reducer
     * @constructor
     */
	constructor() {
		super(SearchReducer);
	}

	/**
	 * init load data before start search
	 * @param {String} type search
	 * @returns {Function}
	 */
	initSearch(type) {
		return (dispatch) => {
			dispatch(this.setMultipleValue({
				[type]: {
					loading: true,
					hints: [],
					error: '',
				},
			}));
		};
	}

	/**
	 * search object by id
	 * @param {String} str
	 * @returns {Promise<{prefix: *, section: *, to: *, value: *}[]|Array>}
	 */
	async searchObjectById(str) {
		if (!validators.isObjectId(str)) return [];
		let section = 'Id';
		let isAccount = false;
		let prefix = '';
		const to = str;

		if (validators.isAccountId(str)) {
			isAccount = true;
			section = 'Account';
		} else if (validators.isAssetId(str)) {
			section = 'Asset';
		} else if (validators.isContractId(str)) {
			section = 'Contract';
		}

		const object = await echo.api.getObject(str);

		if (!object) throw new Error(DEFAULT_ERROR_SEARCH);

		if (validators.isContractId(object.id)) {
			const { token } = await getToken(object.id);

			if (token) {
				section = 'ERC20 token';
				prefix = `${token.symbol} `;
				str = `(${object.id})`;
			}
		}


		if (isAccount) {
			prefix = `${object.name} `;
			str = `(${str})`;
		}

		const hint = [{
			section,
			prefix,
			value: str,
			to: URLHelper.createUrlById(isAccount ? object.name : to),
		}];

		return hint;
	}

	/**
	 * search object by number
	 * @param {String} str
	 * @returns {Promise<[]|Array>}
	 */
	async searchObjectByNumber(str) {
		const hints = [];

		if (!(TypesHelper.isStringNumber(str) || TypesHelper.isCommaNumberRepresentation(str))) return [];
		str = FormatHelper.removeCommas(str);
		str = FormatHelper.removeDots(str);

		const [accountId, assetId, contractId] = [
			`${ACCOUNT_OBJECT_PREFIX}.${str}`,
			`${ASSET_OBJECT_PREFIX}.${str}`,
			`${CONTRACT_OBJECT_PREFIX}.${str}`,
		];

		const block = await echo.api.getBlock(str);

		if (block) {
			const blockHint = {
				section: 'Block',
				value: str,
				to: URLHelper.createBlockUrl(str),
			};
			hints.push(blockHint);
		}

		const [[account], [asset, contract]] = await Promise.all([
			echo.api.getAccounts([accountId]),
			echo.api.getObjects([assetId, contractId]),
		]);

		if (account) {
			const accountHint = {
				section: 'Account',
				prefix: `${account.name} (${ACCOUNT_OBJECT_PREFIX}.`,
				postfix: ')',
				value: str,
				to: URLHelper.createAccountUrl(account.name),
			};
			hints.push(accountHint);
		}

		if (asset) {
			const assetHint = {
				section: 'Asset',
				prefix: `${asset.symbol} (${ASSET_OBJECT_PREFIX}.`,
				value: str,
				postfix: ')',
				to: URLHelper.createAssetUrl(assetId),
			};
			hints.push(assetHint);
		}

		if (contract) {
			const id = `${CONTRACT_OBJECT_PREFIX}.${str}`;
			const { token } = await getToken(id);
			let section = 'Contract';
			let prefix = `${CONTRACT_OBJECT_PREFIX}.`;

			if (token) {
				section = 'ERC20 token';
				prefix = `${token.symbol} ${CONTRACT_OBJECT_PREFIX}.`;
			}

			const contractHint = {
				section,
				prefix,
				value: str,
				to: URLHelper.createContractUrl(contractId),
			};
			hints.push(contractHint);
		}

		if (!hints.length) throw new Error(DEFAULT_ERROR_SEARCH);
		return hints;
	}


	/**
	 * search object by name
	 * @param {String} str
	 * @returns {Promise<[]|Array>}
	 */
	async searchObjectByName(str) {
		let hints = [];
		const [contractFromServer, contractFromGraphql] = await Promise.all([
			ApiService.searchContracts({
				name: str,
				limit: SEARCH_LIMIT.MAX,
			}),
			getContractBySymbol(str.toUpperCase(), SEARCH_LIMIT.MAX),
		]);

		let contractHints = contractFromGraphql.items.map(({ contract, symbol }) => ({
			id: contract.id,
			section: 'ERC20 Token',
			value: symbol,
			postfix: ` (${contract.id})`,
			to: URLHelper.createContractUrl(contract.id),
		}));

		const regExp = new RegExp(str);

		contractHints = contractFromServer
			.filter(({ id }) => !contractHints.find(({ id: contractId }) => contractId === id))
			.reduce((arr, { id, name }) => {
				const { index } = regExp.exec(name);

				const item = {
					prefix: name.slice(0, index),
					postfix: `${name.slice(index + str.length)} (${id})`,
					section: 'Contract',
					value: str,
					to: URLHelper.createContractUrl(id),
				};
				return [...arr, item];
			}, contractHints)
			.slice(0, SEARCH_LIMIT.MAX);

		if (!TypesHelper.isStartWithLetter(str)) {
			hints = hints.concat(contractHints);
			if (!hints.length) throw new Error(DEFAULT_ERROR_SEARCH);
			return hints;
		}

		const accounts = await echo.api.lookupAccounts(str, SEARCH_LIMIT.MAX);
		const accountHints = accounts.filter(([name]) => regExp.exec(name))
			.map(([name, id]) => {
				const { index } = regExp.exec(name);
				return {
					section: 'Account',
					prefix: name.slice(0, index),
					postfix: `${name.slice(index + str.length)} (${id})`,
					value: name.slice(index, index + str.length),
					to: URLHelper.createAccountUrl(name),
				};
			});

		const assets = await getAssetsBySymbols(SEARCH_LIMIT.MAX, str.toUpperCase());

		const assetHints = assets.items.map(({ id }) => ({
			section: 'Asset',
			value: str.toUpperCase(),
			postfix: ` (${id})`,
			to: URLHelper.createAssetUrl(id),
		}));

		hints = getLimitHints(accountHints, contractHints, assetHints);
		if (!hints.length) throw new Error(DEFAULT_ERROR_SEARCH);

		return hints;
	}

	/**
	 * get header search hints
     * @param {String} str
     * @returns {function}
     */
	headerSearchHint(str) {

		return async (dispatch) => {
			dispatch(this.initSearch('headerSearch'));

			let hints = [];

			try {
				if (!str) {
					return;
				}

				hints = await this.searchObjectById(str);

				if (hints.length) {
					return;
				}

				hints = await this.searchObjectByNumber(str);

				if (hints.length) {
					return;
				}

				hints = await this.searchObjectByName(str);
			} catch (error) {
				dispatch(this.setValue(['headerSearch', 'error'], FormatHelper.formatError(error), false));
			} finally {
				dispatch(this.setValue(['headerSearch', 'hints'], hints, false));
				dispatch(this.setValue(['headerSearch', 'loading'], false, false));
			}
		};
	}

	/**
	 * get block search hints
	 * @param {String} str
	 * @returns {Function}
	 */
	blockSearchHint(str) {
		return async (dispatch) => {
			dispatch(this.initSearch('blockSearch'));
			const hints = [];

			try {
				if (!str) {
					return;
				}

				if (TypesHelper.isStringNumber(str) || TypesHelper.isCommaNumberRepresentation(str)) {
					str = FormatHelper.removeCommas(str);
					str = FormatHelper.removeDots(str);
					const block = await echo.api.getBlock(str);

					if (block) {
						const blockHint = {
							section: 'Block',
							value: str,
							to: URLHelper.createBlockUrl(str),
						};
						hints.push(blockHint);
					}
				}
				if (!hints.length) throw new Error(DEFAULT_ERROR_SEARCH);
			} catch (error) {
				dispatch(this.setValue(['blockSearch', 'error'], FormatHelper.formatError(error), false));
			} finally {
				dispatch(this.setValue(['blockSearch', 'hints'], hints, false));
				dispatch(this.setValue(['blockSearch', 'loading'], false, false));
			}
		};
	}

}

export default new SearchActions();
