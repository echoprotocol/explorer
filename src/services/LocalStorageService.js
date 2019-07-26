class LocalStorageService {

	/**
	 *
	 * @param {String} key
	 * @returns {any}
	 */
	static getData(key) {
		return JSON.parse(localStorage.getItem(key) || 'null');
	}

	/**
	 *
	 * @param {String} key
	 * @param {String} data
	 */
	static setData(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

}

export default LocalStorageService;

