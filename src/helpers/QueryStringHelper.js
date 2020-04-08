import queryString from 'query-string';

class QueryStringHelper {

	/**
	 * static method getObjectId
	 * @param {string} url
	 * @return {string} id
	 */
	static getObjectId(url) {
		const parsed = queryString.parse(url);
		const regExp = /^\d+\.\d+\.\d+$/;

		if (parsed.opId) {
			return parsed.opId.trim();
		}

		if (!parsed.id || parsed.id.trim().search(regExp) === -1) {
			return null;
		}

		return parsed.id.trim();
	}

}

export default QueryStringHelper;
