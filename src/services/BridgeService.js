
export class BridgeService {

	static isExist() {
		return !!window.echojslib && !!window.echojslib.extension;
	}

	static subscribeSwitchAccount(cb) {
		if (!BridgeService.isExist()) return;

		window.echojslib.extension.subscribeSwitchAccount((account) => {
			if (!account) return;
			cb(account);
		});
	}


	static unsubscribeSwitchAccount() {
		// if (!BridgeService.isExist()) return;

		// window.echojslib.extension.unscribeSwitchAccount(cb);
	}

	static getAccount() {
		return window.echojslib.extension.activeAccount;
	}


	static getAccess() {
		return window.echojslib.extension.getAccess();
	}


	static proofOfAuthority(message, activeAccountId) {
		return window.echojslib.extension.proofOfAuthority(message, activeAccountId);
	}

}
