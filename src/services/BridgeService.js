
export class BridgeService {

	static isExist() {
		console.log('--isExist--');
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
		console.log('--getAccount--');
		const { activeAccount } = window.echojslib.extension;
		if (activeAccount) {
			this.getAccess();
		}
		return {
			id: activeAccount,
		};
	}


	static getAccess() {
		console.log('--getAccess--');
		return window.echojslib.extension.getAccess();
	}


	static proofOfAuthority(message, activeAccountId) {
		console.log('--proofOfAuthority--');
		return window.echojslib.extension.proofOfAuthority(message, activeAccountId);
	}

}
