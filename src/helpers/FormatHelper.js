import _ from 'lodash';
import BN from 'bignumber.js';
import moment from 'moment';

class FormatHelper {

	static toFixed(value, precision) {

		return value.toFixed(precision).toString(10);
	}

	static formatAmount(amount, precision, symbol) {
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

		const resultNumber = (mod ? `${base.substr(0, mod)} ` : '')
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
		let divider = 1073741824;

		if (value < 1024) {
			return value;
		} else if (value < 1048576) {
			divider = 1024;
		} else if (value < 1073741824) {
			divider = 1048576;
		}

		return Number.parseFloat((value / divider).toFixed(3));
	}

	static formatByteSize(bytes) {
		if (bytes < 1024) return 'bytes';
		else if (bytes < 1048576) return 'kB';
		else if (bytes < 1073741824) return 'MB';
		return 'GB';
	}

	static timestampToBlockInformationTime(timestamp) {
		return moment.utc(timestamp).local().format('D MMM, YYYY, hh:mm:ss');
	}

}

export default FormatHelper;
