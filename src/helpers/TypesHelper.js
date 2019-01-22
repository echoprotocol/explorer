import { ERC20_HASHES } from '../constants/GlobalConstants';

const stringNumberRegEx = /^(0|[1-9]\d*)$/;
const isIdRegEx = /^([1-3]{1}\.[1-9]{1}[0-9]{0,1}\.[0-9]+)$/;
const isStartWithLetterRegEx = /^([a-zA-Z]{1}.*)$/;


class TypesHelper {

	/**
	 *
     * @param {String} scriptHex
     * @returns {boolean}
     */
	static isErc20Contract(scriptHex) {
		const hashes = [
			ERC20_HASHES['allowance(address,address)'],
			ERC20_HASHES['approve(address,uint256)'],
			ERC20_HASHES['balanceOf(address)'],
			ERC20_HASHES['totalSupply()'],
			ERC20_HASHES['transfer(address,uint256)'],
			ERC20_HASHES['transferFrom(address,address,uint256)'],
			ERC20_HASHES['Transfer(address,address,uint256)'],
		];

		if (scriptHex) {
			for (let i = 0; i < hashes.length; i += 1) {
				if (scriptHex.indexOf(hashes[i]) === -1) {
					return false;
				}
			}
			return true;

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
	static isId(str) {
		return isIdRegEx.test(str);
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
	static isStartWithLetter(str) {
		return isStartWithLetterRegEx.test(str);
	}

}

export default TypesHelper;
