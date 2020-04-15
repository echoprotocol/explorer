class LocalStorageService {

	/**
	 *
	 * @param {string} key
	 * @returns {any}
	 */
	static getData(key) {
		return JSON.parse(localStorage.getItem(key) || 'null');
	}

	/**
	 *
	 * @param {string} key
	 * @param {string} data
	 */
	static setData(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

}

export default LocalStorageService;

