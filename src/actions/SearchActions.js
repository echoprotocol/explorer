import echo, { validators } from 'echojs-lib';
import SearchReducer from '../reducers/SearchReducer';

import { HEADER_SEARCH_ACCOUNT_LIMIT } from '../constants/SearchConstants';
import {
	ACCOUNT_OBJECT_PREFIX,
	ASSET_OBJECT_PREFIX,
	CONTRACT_OBJECT_PREFIX,
} from '../constants/ObjectPrefixesConstants';

import URLHelper from '../helpers/URLHelper';
import FormatHelper from '../helpers/FormatHelper';
import TypesHelper from '../helpers/TypesHelper';

// eslint-disable-next-line import/prefer-default-export
export const headerSearchHint = (str) => async (dispatch) => {
	let hints = [];
	/*
	 Стрелочками вверх/вниз должен работать выбор вариантов. Всегда по умолчанию в фокусе первый вариант. По клику на Enter переходим на вариант, который в фокусе.
	 */
	try {
		if (validators.isObjectId(str)) {
			hints = [{
				section: 'Id', value: str, to: URLHelper.createUrlById(str),
			}];
			return;
		}

		if (TypesHelper.isStringNumber(str)) {
			const accountHint = {
				section: 'Account', prefix: `${ACCOUNT_OBJECT_PREFIX}.`, value: str, to: URLHelper.createAccountUrl(`${ACCOUNT_OBJECT_PREFIX}.${str}`),
			};

			const assetHint = {
				section: 'Asset', prefix: `${ASSET_OBJECT_PREFIX}.`, value: str, to: URLHelper.createObjectsUrl(`${ASSET_OBJECT_PREFIX}.${str}`),
			};

			const contractHint = {
				section: 'Contract', prefix: `${CONTRACT_OBJECT_PREFIX}.`, value: str, to: URLHelper.createContractUrl(`${CONTRACT_OBJECT_PREFIX}.${str}`),
			};

			const blockHint = {
				section: 'Block', value: str, to: URLHelper.createBlockUrl(str),
			};

			const numberHints = [
				accountHint,
				assetHint,
				contractHint,
				blockHint,
			];

			hints = [...hints, ...numberHints];
		}

		if (TypesHelper.isStartWithLetter(str) && str.length > 2) {
			const regExp = new RegExp(str);
			const accounts = (await echo.api.lookupAccounts(str, HEADER_SEARCH_ACCOUNT_LIMIT))
				.filter(([name]) => regExp.exec(name))
				.map(([name, id]) => {
					const { index } = regExp.exec(name);
					return {
						section: 'Account',
						prefix: name.slice(0, index),
						postfix: name.slice(index + str.length),
						value: name.slice(index, index + str.length),
						to: URLHelper.createAccountUrl(id),
					};
				});

			hints = [...hints, ...accounts];
		}
	} catch (error) {
		dispatch(SearchReducer.actions.set({ field: ['headerSearch', 'error'], value: FormatHelper.formatError(error) }));
	} finally {
		dispatch(SearchReducer.actions.set({ field: ['headerSearch', 'hints'], value: hints }));
	}
};
