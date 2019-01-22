import { CONTRACT_OBJECT_PREFIX, ACCOUNT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

import { BLOCK_INFORMATION_PATH } from '../constants/RouterConstants';

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
		return `/accounts?id=${accountId}`;
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

		const accountRegExp = new RegExp(`^${ACCOUNT_OBJECT_PREFIX}.\\d+$`);
		const contractRegExp = new RegExp(`^${CONTRACT_OBJECT_PREFIX}.\\d+$`);

		let url;

		if (id.search(accountRegExp) !== -1) {
			url = URLHelper.createAccountUrl(id);
		} else if (id.search(contractRegExp) !== -1) {
			url = URLHelper.createContractUrl(id);
		} else {
			url = URLHelper.createObjectsUrl(id);
		}

		return url;

	}

}

export default URLHelper;
