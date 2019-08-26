import echo, { validators } from 'echojs-lib';

import SearchReducer from '../reducers/SearchReducer';

import {
	ACCOUNT_OBJECT_PREFIX,
	ASSET_OBJECT_PREFIX,
	CONTRACT_OBJECT_PREFIX,
} from '../constants/ObjectPrefixesConstants';
import { SEARCH_LIMIT } from '../constants/SearchConstants';

import BaseActionsClass from './BaseActionsClass';

import URLHelper from '../helpers/URLHelper';
import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';
import { getLimitHints } from '../helpers/SearchHelper';

import { getContractBySymbol } from '../services/queries/contract';
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

				const [contractFromServer, contractFromGraphql] = await Promise.all([
					ApiService.searchContracts({ name: str, limit: SEARCH_LIMIT.MAX }),
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
					return;
				}

				const accounts = await echo.api.lookupAccounts(str, SEARCH_LIMIT.MAX);
				const accountHints = accounts.filter(([name]) => regExp.exec(name)).map(([name, id]) => {
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
			} catch (error) {
				dispatch(SearchReducer.actions.set({ field: ['headerSearch', 'error'], value: FormatHelper.formatError(error) }));
			} finally {
				dispatch(SearchReducer.actions.set({ field: ['headerSearch', 'hints'], value: hints }));
			}
		};
	}

}

export default new SearchActions();
