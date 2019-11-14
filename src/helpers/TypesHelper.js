import { ERC20_HASHES, ERC20_REQIURED_HASHES } from '../constants/GlobalConstants';
import {
	commaNumberRepresentationRegEx,
	startWithLetterRegEx,
	stringNumberRegEx,
} from '../constants/TypeConstants';

class TypesHelper {

	/**
	 *
     * @param {String} scriptHex
     * @returns {boolean}
     */
	static isErc20Contract(scriptHex) {
		if (scriptHex) {
			const hashes = Object.values(ERC20_REQIURED_HASHES);
			return hashes.every((hash) => scriptHex.includes(hash.toString()));
		}

		return false;
	}

	/**
	 *
     * @param {String} hex
     * @returns {boolean}
     */
	static isTransferEvent(hex) {
		return hex.indexOf(ERC20_HASHES['Transfer(address,address,uint256)']) !== -1;
	}

	/**
     *
     * @param {String} str
     */
	static isStringNumber(str) {
		return stringNumberRegEx.test(str);
	}

	/**
	 *
	 * @param {String} str
	 */
	static isCommaNumberRepresentation(str) {
		return commaNumberRepresentationRegEx.test(str);
	}

	/**
     *
     * @param {String} str
     */
	static isStartWithLetter(str) {
		return startWithLetterRegEx.test(str);
	}

}

export default TypesHelper;
