import _ from 'lodash';
import BN from 'bignumber.js';
import moment from 'moment';
import utf8 from 'utf8';

class FormatHelper {

	static toFixed(value, precision) {

		return value.toFixed(precision).toString(10);
	}

	/**
	 *
     * @param {String|Number|BN} amount
     * @param {Number} precision
     * @param {String} symbol
     * @returns {string}
     */
	static formatAmount(amount, precision = 0, symbol) {
		const number = new BN(amount).div(10 ** precision);

		const base = `${parseInt(this.toFixed(Math.abs(number || 0), precision), 10)}`;
		const mod = base.length > 3 ? base.length % 3 : 0;

		let postfix = `.${this.toFixed(number, precision).split('.')[1]}`;

		for (let i = postfix.length - 1; i >= 0; i -= 1) {
			if (postfix[i] === '0') {
				postfix = postfix.substr(0, postfix.length - 1);
			} else if (postfix[i] === '.') {
				postfix = '';
			} else {
				break;
			}
		}

		const resultNumber = (mod ? `${base.substr(0, mod)},` : '')
            + base.substr(mod).replace(/(\d{3})(?=\d)/g, `$1${','}`)
            + (precision ? postfix : '');

		return symbol ? `${resultNumber} ${symbol}` : resultNumber;
	}

	static formatError(err) {
		return err instanceof Error || (_.isObject(err) && err.message) ? err.message : err;
	}

	static roundNumber(value, decimals) {
		return Number(`${Math.ceil(`${value}e${decimals}`)}e-${decimals}`);
	}

	static formatBlockSize(value) {
		value = new BN(value);
		if (value.lt(1024)) return this.roundNumber(value.toNumber(), 2);
		else if (value.lt(1048576)) return this.roundNumber(value.div(1024).toNumber(), 2);
		else if (value.lt(1073741824)) return this.roundNumber(value.div(1048576).toNumber(), 2);
		return this.roundNumber(value.div(1073741824).toNumber(), 2);
	}

	static formatByteSize(bytes) {
		if (bytes < 1024) return 'bytes';
		else if (bytes < 1048576) return 'kB';
		else if (bytes < 1073741824) return 'MB';
		return 'GB';
	}

	/**
	 *
	 * @param {String} timestamp
	 */
	static timestampToBlockInformationTime(timestamp) {
		return moment.utc(timestamp).local().format('D MMM, YYYY, hh:mm:ss a');
	}

	/**
	 *
     * @param {String} hex
     */
	static toUtf8(hex) {
		let str = '';

		for (let i = 0; i < hex.length; i += 2) {
			const code = parseInt(hex.substr(i, 2), 16);
			if (code !== 0) {
				str += String.fromCharCode(code);
			}
		}
		let result = str;
		try {
			result = utf8.decode(str);
		} catch (error) {
			result = str;
		}
		return result;
	}


}

export default FormatHelper;
