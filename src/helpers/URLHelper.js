
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

}

export default URLHelper;
