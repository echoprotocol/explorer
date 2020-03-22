
export class BridgeService {

	static loadActiveAccount() {
		return {
			id: IS_CLIENT && window.echojslib.extension.activeAccount,
		};
	}

	static isExist() {
		return IS_CLIENT && !!window.echojslib && !!window.echojslib.extension;
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
		const { activeAccount } = IS_CLIENT && window.echojslib.extension;

		if (!activeAccount) {
			const allAccount = await this.getAllAcounts();
			return !allAccount || allAccount.length === 0 ? null : allAccount[0];
		}

		return {
			id: activeAccount,
		};
	}

	static getAllAcounts() {
		return IS_CLIENT && window.echojslib.extension.getAccounts();
	}


	static getAccess() {
		return IS_CLIENT && window.echojslib.extension.getAccess();
	}


	static proofOfAuthority(message, activeAccountId) {
		return IS_CLIENT && window.echojslib.extension.proofOfAuthority(message, activeAccountId);
	}

}
