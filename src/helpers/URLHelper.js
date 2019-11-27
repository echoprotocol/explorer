import { validators } from 'echojs-lib';

import {
	ACCOUNTS_PATH,
	ASSET_PATH,
	BLOCK_INFORMATION_PATH,
	CONTRACT_PATH,
	VERIFY_CONTRACT_PATH,
	MANAGE_CONTRACT_PATH,
	UPLOAD_ABI_PATH,
	TRANSACTION_INFORMATION_PATH,
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
	 * @return {String}
	 * @param block
	 * @param trNum
	 * @param opNum
	 */
	static createOperationObjectsUrl(block, trNum, opNum) {
		return `/objects?opId=${block}-${trNum}-${opNum}`;
	}

	/**
	 *
	 * @param currentUrl
	 * @param op
	 * @returns {string}
	 */
	static createTransactionOperationUrl(currentUrl, op) {
		return `${currentUrl}?op=${op}`;
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
		console.log('createAccountUrlByName', accountName);
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
	static createVerifyContractUrl(contractId) {
		return `${VERIFY_CONTRACT_PATH.replace(/:id/, contractId)}`;
	}

	/**
	 *
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

	/**
	 *
	 * @param contractId
	 * @returns {string}
	 */
	static createManageContractUrl(contractId) {
		return MANAGE_CONTRACT_PATH.replace(/:id/, contractId);
	}

	/**
	 *
	 * @param round
	 * @param index
	 * @returns {string}
	 */
	static createTransactionUrl(round, index) {
		return TRANSACTION_INFORMATION_PATH.replace(/:round/, round).replace(/:index/, index);
	}

}

export default URLHelper;
