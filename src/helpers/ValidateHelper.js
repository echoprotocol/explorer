/* eslint-disable no-underscore-dangle */
import { validators, constants } from 'echojs-lib';
import { objectIdRegEx } from '../constants/TypeConstants';

import {
	KILO_BYTE,
	MAX_KB_CONTRACT_ICON,
	MAX_LENGTH_CONTRACT_DESCRIPTION,
	MAX_LENGTH_CONTRACT_NAME,
	MIN_LENGTH_CONTRACT_NAME,
} from '../constants/GlobalConstants';

class ValidateHelper {

	static _validateInt(value, isUint, size = 256) {
		value = Number(value);
		if (!Number.isInteger(value)) return 'value should be integer';

		if (isUint && value < 0) return 'value should be unsigned integer';

		if (size % 8 !== 0) return 'various sizes should be in in steps of 8';

		const maxLimit = isUint ? (2 ** size) - 1 : ((2 ** (size - 1)) - 1);
		const minLimit = isUint ? 0 : -(2 ** (size - 1));

		if (value > maxLimit && value < minLimit) return `value should be in ${isUint ? 'u' : ''}int${size} format`;

		return null;
	}

	static _validateString(value) {
		return (typeof value === 'string' ? null : 'value should be a string');
	}
	static _validateAddress(value) {
		return (validators.isObjectId(value) ? null : 'value should be in object id format');
	}
	static _validateBool(value) {
		return (typeof value === 'boolean' ? null : 'value should be a boolean');
	}
	static _validateArray(value) {
		return (Array.isArray(value) ? null : 'value should be an array');
	}
	static _validateBytes(value) {
		return ((typeof value === 'string' && objectIdRegEx.test(value)) ? null : 'value should be a hex string');
	}

	static validateByType(value, type) {
		if (!value) return 'Value should not be empty';

		let method = null;
		let isUint = null;
		let size = null;
		let isBytesArray = false;

		const intMark = type.search('int');
		if (type.search('string') !== -1 || type.search('bytes32') !== -1) {
			method = this._validateString;
		} else if (type.search('address') !== -1) {
			method = this._validateAddress;
		} else if (type.search('bool') !== -1) {
			method = this._validateBool;
		} else if (type.search('byte') !== -1) {
			isBytesArray = type !== 'bytes';
			method = this._validateBytes;
		} else if (intMark !== -1) {
			method = this._validateInt;
			isUint = (intMark === 1);
			const match = type.match(/\d+/);
			size = match && match[0];
		} else {
			return 'value could not be validated';
		}

		const arrayMark = type.search('\\[\\]');

		if (type.search('bool') !== -1) {
			try {
				value = JSON.parse(value);
			} catch (e) {
				return `value should be a ${type}`;
			}
		}

		if (arrayMark !== -1 || isBytesArray) {
			try {
				value = JSON.parse(value);
			} catch (e) {
				return `value should be an ${type} array`;
			}
			let error = this._validateArray(value);
			if (error) return error;
			value.some((v) => {
				error = method(v, isUint, size);
				return error;
			});

			return error ? `in array ${error}` : error;
		}

		return method(value, isUint, size);

	}


}

export default ValidateHelper;

/**
 * s
 * @param name
 * @returns {string|null}
 */
export const validateContractName = (name) => {
	if (!name) {
		return 'Contract name should not be empty';
	}

	if (name.length < MIN_LENGTH_CONTRACT_NAME) {
		return 'Contract name must be 2 characters or more';
	}

	if (name.length > MAX_LENGTH_CONTRACT_NAME) {
		return 'Contract name must be 16 characters or less';
	}

	if (!name.match(/^[a-zA-Z0-9._ ]+$/)) {
		return 'Invalid symbols';
	}

	return null;
};

/**
 *
 * @param description
 * @returns {string|null}
 */
export const validateContractDescription = (description) => {
	if (description.length > MAX_LENGTH_CONTRACT_DESCRIPTION) {
		return 'Description must be less than 256 symbol.';
	}

	return null;
};

/**
 *
 * @param file
 * @returns {string|null}
 */
export const validateContractIcon = (file) => {
	if (!file) {
		return 'Choose JPG, JPEG or PNG file.';
	}

	const { size, type } = file;

	if (!type.match(/(jpg|jpeg|png)/)) {
		return 'File should be JPG, JPEG or PNG.';
	}

	if (size > KILO_BYTE * MAX_KB_CONTRACT_ICON) {
		return `File should be less than ${MAX_KB_CONTRACT_ICON}KB`;
	}

	return null;
};

/**
 *
 * @param version
 * @param minAccessVersion
 * @returns {boolean}
 */
export const checkAccessVersion = (version, minAccessVersion) => {
	const [major, minor, patch] = [...version.split('.')].map((part) => parseInt(part, 10));
	const [minMajor, minMinor, minPatch] = [...minAccessVersion.split('.')].map((part) => parseInt(part, 10));
	return !(minMajor > major || minMinor > minor || minPatch > patch);
};


/**
 * @method isSidechainEthDeposit
 * @param {string} value
 * @return {boolean}
 */
export const isSidechainEthDeposit = (value) => {
	const regex = new RegExp(`^1\\.${constants.PROTOCOL_OBJECT_TYPE_ID.SIDECHAIN_ETH_DEPOSIT}\\.(0|[1-9]\\d*)$`);
	return regex.test(value);
};
