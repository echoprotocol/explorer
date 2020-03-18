
export class BridgeService {

	static loadActiveAccount() {
		return {
			id: window.echojslib.extension.activeAccount,
		};
	}

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

	static async getAccount() {
		const { activeAccount } = window.echojslib.extension;

		if (!activeAccount) {
			const allAccount = await this.getAllAcounts();
			return !allAccount || allAccount.length === 0 ? null : allAccount[0];
		}

		return {
			id: activeAccount,
		};
	}

	static getAllAcounts() {
		return window.echojslib.extension.getAccounts();
	}


	static getAccess() {
		return window.echojslib.extension.getAccess();
	}


	static proofOfAuthority(message, activeAccountId) {
		return window.echojslib.extension.proofOfAuthority(message, activeAccountId);
	}

}
