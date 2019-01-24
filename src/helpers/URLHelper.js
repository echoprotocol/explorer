import { validators } from 'echojs-lib';

import { ASSET_PATH } from '../constants/RouterConstants';

class URLHelper {

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
		return `/accounts?id=${accountId}`;
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
		return `/contracts?id=${contractId}`;
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
