
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

		const accountRegExp = /^1.2\.\d+$/;
		const contractRegExp = /^1.16\.\d+$/;

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
