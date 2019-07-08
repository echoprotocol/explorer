import { validators } from 'echojs-lib';

import {
	ACCOUNTS_PATH,
	ASSET_PATH,
	BLOCK_INFORMATION_PATH,
	CONTRACT_PATH,
	UPLOAD_ABI_PATH,
} from '../constants/RouterConstants';
import config from '../config/chain';

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
	 * @param {String} accountName
	 * @return {String}
	 */
	static createAccountUrlByName(accountName) {
		return ACCOUNTS_PATH.replace(/:id/, accountName);
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
	 * @param contractId
	 * @param detail
	 * @returns {string}
	 */
	static createContractUrl(contractId, detail = '') {
		return `${CONTRACT_PATH.replace(/:id/, contractId)}${`${detail}` || ''}`;
	}

	/**
	 * @param contractId
	 * @returns {string}
	 */
	static createUploadAbiUrl(contractId) {
		return `${UPLOAD_ABI_PATH.replace(/:id/, contractId)}`;
	}

	/**
	 *
	 * @param {String} id
	 */
	static createUrlById(id) {

		let url;

		if (validators.isAccountName(id)) {
			url = URLHelper.createAccountUrlByName(id);
		} else if (validators.isAccountId(id)) {
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

	/**
	 *
	 * @param icon
	 * @returns {string}
	 */
	static getUrlContractIcon(icon) {
		return `${config.SERVER_URL}${icon}`;
	}

}

export default URLHelper;
