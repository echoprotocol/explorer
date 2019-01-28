import { validators } from 'echojs-lib';

import {
	ACCOUNTS_PATH,
	ASSET_PATH,
	BLOCK_INFORMATION_PATH,
	CONTRACT_PATH,
} from '../constants/RouterConstants';


class URLHelper {

	/**
     *
     * @param {String} round
     * @return {String}
     */
	static createBlockUrl(round) {
		return BLOCK_INFORMATION_PATH.replace(/:round/, round);
	}

	/**
	 *
	 * @param {String} objectId
	 * @return {String}
	 */
	static createObjectsUrl(objectId) {
		return `/objects?id=${objectId}`;
	}

	/**
	 *
	 * @param {String} accountId
	 * @return {String}
	 */
	static createAccountUrl(accountId) {
		return ACCOUNTS_PATH.replace(/:id/, accountId);
	}

	/**
     *
     * @param {String} assetId
     * @return {String}
     */
	static createAssetUrl(assetId) {
		return ASSET_PATH.replace(/:id/, assetId);
	}

	/**
	 *
	 * @param {String} contractId
	 * @return {String}
	 */
	static createContractUrl(contractId) {
		return CONTRACT_PATH.replace(/:id/, contractId);
	}

	/**
	 *
	 * @param {String} id
	 */
	static createUrlById(id) {

		let url;

		if (validators.isAccountId(id)) {
			url = URLHelper.createAccountUrl(id);
		} else if (validators.isContractId(id)) {
			url = URLHelper.createContractUrl(id);
		} else if (validators.isAssetId(id)) {
			url = URLHelper.createAssetUrl(id);
		} else {
			url = URLHelper.createObjectsUrl(id);
		}

		return url;

	}

}

export default URLHelper;
