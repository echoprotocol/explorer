import { validators } from 'echojs-lib';
import queryString from 'query-string';

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
	static createTransactionOperationUrl(currentUrl, op, virtual) {
		return `${currentUrl}?op=${op}&virtual=${!!virtual}`;
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
	static createUrlById(id, addInfo) {

		let url;

		if (validators.isAccountName(id)) {
			url = URLHelper.createAccountUrlByName(id);
		} else if (validators.isAccountId(id)) {
			url = URLHelper.createAccountUrl(id);
		} else if (validators.isContractId(id)) {
			url = URLHelper.createContractUrl(id);
		} else if (validators.isAssetId(id)) {
			url = URLHelper.createAssetUrl(id);
		} else if (validators.isAssetName(id)) {
			url = URLHelper.createAssetUrl(addInfo);
		} else {
			url = URLHelper.createObjectsUrl(id);
		}

		return url;

	}

	/**
	 * method getUrlAccountIcon
	 * @param {string} accountName
	 * @returns {string}
	 */
	static getUrlAccountIcon(accountName) {
		return `${config.SERVER_URL}/api/accounts/${accountName}/avatar.png`;
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
	static createTransactionUrl(round, index, virtual) {
		const url = TRANSACTION_INFORMATION_PATH.replace(/:round/, round).replace(/:index/, index);
		return virtual === undefined ? url : `${url}?virtual=${!!virtual}`;
	}

	/**
	 * @method createOperationUrlByFilter
	 * @param {string} pathname
	 * @param {object} passQuery
	 * @param {object} newProps
	 * @return {string}
	 */
	static createOperationUrlByFilter(pathname, passQuery, newProps) {
		const { id, round, ...query } = passQuery;
		let transformPathname = pathname.replace(/\[id\]/, id);
		if (round) {
			transformPathname = pathname.replace(/\[round\]/, round);
		}
		return `${transformPathname}?${queryString.stringify({ ...query, ...newProps })}`;
	}

	/**
	 * @method getUrlWithOrigin
	 * @param {string} url
	 * @return {string}
	 */
	static getUrlWithOrigin(url) {
		return typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
	}

	/**
	 * @method createEthAddressOut
	 * @param {string} url
	 * @return {string}
	 */
	static createEthAddressOut(url) {
		return `${config.SIDECHAIN_EXPLORER_URLS.ETHEREUM}/address/${url}`;
	}

	/**
	 * @method createEthTransactionOut
	 * @param {string} url
	 * @return {string}
	 */
	static createEthTransactionOut(url) {
		return `${config.SIDECHAIN_EXPLORER_URLS.ETHEREUM}/tx/${url}`;
	}

	/**
	 * @method createBtcAddressOut
	 * @param {string} url
	 * @return {string}
	 */
	static createBtcAddressOut(url) {
		return `${config.SIDECHAIN_EXPLORER_URLS.BITCOIN}/address/${url}`;
	}

	/**
	 * @method createBtcTransactionOut
	 * @param {string} url
	 * @return {string}
	 */
	static createBtcTransactionOut(url) {
		return `${config.SIDECHAIN_EXPLORER_URLS.BITCOIN}/tx/${url}`;
	}

	/**
	 * @method createBtcBlockOut
	 * @param {string} url
	 * @return {string}
	 */
	static createBtcBlockOut(url) {
		return `${config.SIDECHAIN_EXPLORER_URLS.BITCOIN}/blockId/${url}`;
	}

	/**
	 * @method transformEchodbOperationLinkToExplorerLink
	 * @param {string} url
	 * @return {string}
	 */
	static transformEchodbOperationLinkToExplorerLink(url, virtual) {
		if (!url || typeof url !== 'string') {
			return url;
		}
		const slpitedUrl = url.split('-');
		if (slpitedUrl[1]) {
			slpitedUrl[1] = parseInt(slpitedUrl[1], 10) + 1;
		}
		if (slpitedUrl[2]) {
			slpitedUrl[2] = parseInt(slpitedUrl[2], 10) + 1;
		}
		return `/blocks/${slpitedUrl[0]}/${slpitedUrl[1]}?op=${slpitedUrl[2]}&virtual=${!!virtual}`;
	}

}

export default URLHelper;
