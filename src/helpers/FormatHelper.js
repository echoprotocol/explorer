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
		// console.log('number', number);

		const base = `${parseInt(this.toFixed(Math.abs(number || 0), precision), 10)}`;
		const mod = base.length > 3 ? base.length % 3 : 0;
		// console.log('base', base);

		let postfix = `.${this.toFixed(number, precision).split('.')[1]}`;
		// console.log('postfix', postfix);

		// for (let i = postfix.length - 1; i >= 0; i -= 1) {
		// 	if (postfix[i] === '0') {
		// 		postfix = postfix.substr(0, postfix.length - 1);
		// 	} else if (postfix[i] === '.') {
		// 		postfix = '';
		// 	} else {
		// 		break;
		// 	}
		// }

		const resultNumber = (mod ? `${base.substr(0, mod)},` : '')
            + base.substr(mod).replace(/(\d{3})(?=\d)/g, `$1${','}`)
            + (precision ? postfix : '');
		// console.log('resultNumber', resultNumber);

		return symbol ? `${resultNumber} ${symbol}` : resultNumber;
	}

	static formatError(err) {
		return err instanceof Error || (_.isObject(err) && err.message) ? err.message : err;
	}

	static formatServerError(err) {
		if (_.isObject(err) && err.message) {
			if (Array.isArray(err.message)) {
				return err.message[0].message;
			}
			return err.message;
		}

		return err;
	}


	static roundNumber(value, decimals) {
		const number = Number(`${Math.ceil(`${value}e${decimals}`)}e-${decimals}`);

		return !Number.isNaN(number) ? number : 0;
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
		return moment.utc(timestamp).local().format('D MMM, YYYY hh:mm:ss A');
	}


	/** *
	 *
	 * @param timestamp
	 * @returns {{date: string, time: string}}
	 */
	static timestampToContractCreationTime(timestamp) {
		const [date, time] = moment.utc(timestamp).local().format('DD.MM.YYYY, hh:mm A').split(',');
		return { date, time };
	}

	/** *
	 *
	 * @param timestamp
	 * @returns {{date: string, time: string}}
	 */
	static timestampToBlockCreationTime(timestamp) {
		const [date, time] = moment(new Date(timestamp)).format('DD.MM.YYYY HH:mm').split(' ');
		return { date, time };
	}

	/**
	 *
	 * @returns {string} year
	 */
	static getYear(date) {
		return moment(date).format('YYYY');
	}
	/**
	 *
	 * @param time
	 * @returns {string}
	 */
	static formatLatestBlockTime(time) {
		let hours = Math.floor(time / 3600);
		let minutes = Math.floor((time - (hours * 3600)) / 60);
		let seconds = time - (hours * 3600) - (minutes * 60);

		if (hours > 0) {
			hours = `${hours} ${hours > 1 ? 'hours ' : 'hour '}`;
		}

		if (minutes > 0) {
			minutes = `${minutes} min `;
		}
		seconds = `${seconds} sec`;

		return `${hours || ''}${minutes || ''}${seconds}`;
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

	/**
	 *
	 * @param {String} str
	 */
	static removeCommas(str) {
		return str.replace(/,/g, '');
	}

	/**
	 *
	 * @param {String} str
	 */
	static removeDots(str) {
		return str.replace(/\./g, '');
	}

	/**
	 *
	 * @param count
	 * @returns {string}
	 */
	static getFormatTransactionsTitle(count) {
		return `${count} Transaction${count !== 1 ? 's' : ''}`;
	}
	/**
	 *
	 * @param {Array} abi
	 * @returns {string}
	 */
	static formatAbi(abi) {
		if (!abi) {
			return '';
		}
		return JSON.stringify(abi, null, 4);
	}

	/**
	 *
	 * @param count
	 * @returns {string}
	 */
	static getFormaOperationsTitle(count) {
		return `${count} Operation${count !== 1 ? 's' : ''}`;
	}

	/**
	 *
	 * @param timestamp
	 * @returns {string}
	 */
	static timestampToOperationRowTime(timestamp) {
		return moment.utc(timestamp).local().format('DD.MM.YYYY HH:mm');
	}

}

export default FormatHelper;
