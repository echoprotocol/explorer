import echo, { validators } from 'echojs-lib';

import SearchReducer from '../reducers/SearchReducer';

import { SEARCH_LIMIT } from '../constants/SearchConstants';
import {
	ACCOUNT_OBJECT_PREFIX,
	ASSET_OBJECT_PREFIX,
	CONTRACT_OBJECT_PREFIX,
} from '../constants/ObjectPrefixesConstants';

import BaseActionsClass from './BaseActionsClass';


import URLHelper from '../helpers/URLHelper';
import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';

import ApiService from '../services/ApiService';

class SearchActions extends BaseActionsClass {

	/** Set reducer
     * @constructor
     */
	constructor() {
		super(SearchReducer);
	}

	/**
	 * get header search hints
     * @param {String} str
     * @returns {function}
     */
	headerSearchHint(str) {

		return async (dispatch) => {
			let hints = [];

			try {
				if (!str) {
					return;
				}

				if (validators.isObjectId(str)) {
					let section = 'Id';

					if (validators.isAccountId(str)) {
						const account = (await echo.api.getAccounts([str]))[0];
						str = account ? account.name : str;
						section = 'Account';
					} else if (validators.isAssetId(str)) {
						section = 'Asset';
					} else if (validators.isContractId(str)) {
						section = 'Contract';
					}

					hints = [{
						section, value: str, to: URLHelper.createUrlById(str),
					}];
					return;
				}

				if (TypesHelper.isStringNumber(str) || TypesHelper.isCommaNumberRepresentation(str)) {
					str = FormatHelper.removeCommas(str);
					str = FormatHelper.removeDots(str);

					const blockHint = {
						section: 'Block', value: str, to: URLHelper.createBlockUrl(str),
					};

					const accountId = `${ACCOUNT_OBJECT_PREFIX}.${str}`;
					const nameAccountHint = (await echo.api.getAccounts([accountId]))[0];

					const accountHint = {
						section: 'Account',
						prefix: `${ACCOUNT_OBJECT_PREFIX}.`,
						value: str,
						to: URLHelper.createAccountUrl(nameAccountHint ? nameAccountHint.name : accountId),
					};

					const assetHint = {
						section: 'Asset',
						prefix: `${ASSET_OBJECT_PREFIX}.`,
						value: str,
						to: URLHelper.createAssetUrl(`${ASSET_OBJECT_PREFIX}.${str}`),
					};

					const contractHint = {
						section: 'Contract',
						prefix: `${CONTRACT_OBJECT_PREFIX}.`,
						value: str,
						to: URLHelper.createContractUrl(`${CONTRACT_OBJECT_PREFIX}.${str}`),
					};


					hints = [
						blockHint,
						accountHint,
						assetHint,
						contractHint,
					];

					return;
				}

				const contracts = await ApiService.searchContracts({ name: str, limit: SEARCH_LIMIT.MAX });
				let contractHints = contracts.map((c) => ({
					section: 'Contract',
					value: c.id,
					to: URLHelper.createContractUrl(c.id),
				}));

				if (!TypesHelper.isStartWithLetter(str)) {
					hints = hints.concat(contractHints);
					return;
				}

				const regExp = new RegExp(str);
				const accounts = await echo.api.lookupAccounts(str, SEARCH_LIMIT.MAX);
				let accountHints = accounts.filter(([name]) => regExp.exec(name)).map(([name]) => {
					const { index } = regExp.exec(name);
					return {
						section: 'Account',
						prefix: name.slice(0, index),
						postfix: name.slice(index + str.length),
						value: name.slice(index, index + str.length),
						to: URLHelper.createAccountUrl(name),
					};
				});

				if (accountHints.length <= SEARCH_LIMIT.MIN) {
					contractHints = contractHints.slice(0, SEARCH_LIMIT.MAX - accountHints.length);
				} else if (contractHints.length <= SEARCH_LIMIT.MIN) {
					accountHints = accountHints.slice(0, SEARCH_LIMIT.MAX - contractHints.length);
				} else {
					contractHints = contractHints.slice(0, SEARCH_LIMIT.MIN);
					accountHints = accountHints.slice(0, SEARCH_LIMIT.MIN);
				}

				hints = hints.concat(accountHints).concat(contractHints);

			} catch (error) {
				dispatch(SearchReducer.actions.set({ field: ['headerSearch', 'error'], value: FormatHelper.formatError(error) }));
			} finally {
				dispatch(SearchReducer.actions.set({ field: ['headerSearch', 'hints'], value: hints }));
			}
		};
	}

}

export default new SearchActions();
