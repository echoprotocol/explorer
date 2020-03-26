import echo from 'echojs-lib';

class ServerInitializer {

	/**
	 * method init
	 * @param {obj} config
	 * @return {Promise<void>}
	 */
	async init(config) {
		await echo.connect(config.url, config);
	}

}

export default new ServerInitializer();
