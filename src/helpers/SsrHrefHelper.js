import { validators } from 'echojs-lib';
import {
	OBJECTS_PATH,
	SSR_ACCOUNTS_PATH,
	SSR_ASSET_PATH,
	SSR_BLOCK_INFORMATION_PATH,
	SSR_CONTRACT_PATH,
} from '../constants/RouterConstants';
import { TYPE_SEARCH_SECTION } from '../constants/SearchConstants';


class SsrHrefHelper {

	/**
	 * @method getSsrPathByObjectId
	 * @param {string} id
	 * @return {string} href
	 */
	static getHrefByObjectId(id) {
		let href;

		if (validators.isAccountName(id) || validators.isAccountId(id)) {
			href = SSR_ACCOUNTS_PATH;
		} else if (validators.isContractId(id)) {
			href = SSR_CONTRACT_PATH;
		} else if (validators.isAssetId(id)) {
			href = SSR_ASSET_PATH;
		} else {
			href = OBJECTS_PATH;
		}

		return href;
	}

	/**
	 * @method getHrefByTypeSection
	 * @param {string} section
	 * @return {string} href
	 */
	static getHrefByTypeSection(section) {
		switch (section) {
			case TYPE_SEARCH_SECTION.ACCOUNT:
				return SSR_ACCOUNTS_PATH;
			case TYPE_SEARCH_SECTION.BLOCK:
				return SSR_BLOCK_INFORMATION_PATH;
			case TYPE_SEARCH_SECTION.ASSET:
				return SSR_ASSET_PATH;
			case TYPE_SEARCH_SECTION.CONTRACT:
				return SSR_CONTRACT_PATH;
			default:
				return OBJECTS_PATH;
		}
	}

}

export default SsrHrefHelper;

