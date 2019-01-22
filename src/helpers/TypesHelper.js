const stringNumberRegEx = /^(0|[1-9]\d*)$/;
const isIdRegEx = /^([1-3]{1}\.[1-9]{1}[0-9]{0,1}\.[0-9]+)$/;
const isStartWithLetterRegEx = /^([a-zA-Z]{1}.*)$/;

class TypesHelper {

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
