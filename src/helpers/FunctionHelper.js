/* eslint-disable no-useless-escape */

export const validateEmail = (email) => {
	const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,15})?$/;
	if (!emailReg.test(email)) {
		return false;
	}
	return true;
};

export const validateUrl = (str) => {
	const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	if (!regex.test(str)) {
		return false;
	}
	return true;
};

export const formatPrice = (n, _c = 2, _d = '.', _t = ' ') => {
	_c = Math.abs(_c);
	const c = Number.isNaN(_c) ? 2 : _c;
	const d = _d === undefined ? '.' : _d;
	const t = _t === undefined ? ',' : _t;
	const s = n < 0 ? '-' : '';
	const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c), 10));
	const jt = i.length;
	const j = jt > 3 ? jt % 3 : 0;
	return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

/**
 * Converts a number to a string with the desired case
 * @param {Number} number
 * @param {Array} title ['объявление', 'объявления', 'объявлений']
 * @returns {String}
 */
export const convertNumToStr = (number, title = []) => {
	const cases = [2, 0, 1, 1, 1, 2];
	return `${number} ${title[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]]}`;
};

export const cutDescription = (title, maxTitleWidth = 150) => (
	title.length > maxTitleWidth ? `${title.slice(0, maxTitleWidth - 3)}...` : title
);

/**
 * Concat all prop name in object with extended key(separate by '.')
 * @param {String} extendedKey
 * @param {Object} extendedObj
 * @returns {{}}
 */
export const extendObjectKey = (extendedKey, extendedObj) => Object.keys(extendedObj)
	.reduce((obj, key) => {
		obj[`${extendedKey}.${key}`] = extendedObj[key];
		return obj;
	}, {});
