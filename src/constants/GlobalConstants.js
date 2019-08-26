/* eslint-disable import/prefer-default-export */

import { constants } from 'echojs-lib';

export const KEY_CODES = {
	ENTER_CODE: 13,
	TAB_CODE: 9,
	ESC_CODE: 27,
	MINUS_CODE: 189,
	FIVE_NUMBER_CODE: 53,
};

export const DEFAULT_TITLE = 'Echo Explorer';

export const TITLE_TEMPLATES = {
	MAIN: DEFAULT_TITLE,
	ACCOUNT: `Account name | ${DEFAULT_TITLE}`,
	BLOCK: `Block round | ${DEFAULT_TITLE}`,
	ASSET: `Asset name | ${DEFAULT_TITLE}`,
	OBJECT: `Object id | ${DEFAULT_TITLE}`,
	TRANSACTION: `Transaction index in block round | ${DEFAULT_TITLE}`,
	CONTRACT: `Contract id | ${DEFAULT_TITLE}`,
};

export const DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES = '2.1.0';

export const START_AVERAGE_TRS_BLOCKS = 10;
export const MAX_AVERAGE_TRS_BLOCKS = 100;

export const PAGE_BLOCKS_COUNT = 20;
export const PAGE_ADD_BLOCKS_COUNT = 10;

export const MAX_BLOCK_REQUESTS = 100;

export const KEY_CODE_ENTER = 13;
export const KEY_CODE_ESC = 27;

export const ERC20_HASHES = {
	'allowance(address,address)': 'dd62ed3e',
	'approve(address,uint256)': '095ea7b3',
	'balanceOf(address)': '70a08231',
	'decimals()': '313ce567',
	'name()': '06fdde03',
	'symbol()': '95d89b41',
	'totalSupply()': '18160ddd',
	'transfer(address,uint256)': 'a9059cbb',
	'transferFrom(address,address,uint256)': '23b872dd',
	'Transfer(address,address,uint256)': 'ddf252ad',
	'Approval(address,address,uint256)': '8c5be1e5',
	'version()': '54fd4d50',
};

export const BYTECODE_SYMBOLS_LENGTH = 616;
export const ECHO_ASSET = {
	ID: '1.3.0',
	SYMBOL: 'ECHO',
	PRECISION: 8,
};

export const NATHAN = {
	ID: '1.2.12',
};

export const DEFAULT_ROWS_COUNT = 50;
export const DEFAULT_OPERATION_HISTORY_ID = constants.API_CONFIG.STOP_OPERATION_HISTORY_ID;

export const CONTRACT_FIELDS = {
	NAME: 'name',
	DESCRIPTION: 'description',
	ICON: 'icon',
};

export const KILO_BYTE = 1024;
export const MAX_LENGTH_CONTRACT_DESCRIPTION = 256;
export const MIN_LENGTH_CONTRACT_NAME = 2;
export const MAX_LENGTH_CONTRACT_NAME = 16;
export const MAX_KB_CONTRACT_ICON = 200;


export const MAX_RETRIES = 999999999;

export const MAX_WIDTH_SCREEN = 768;
export const MIN_ACCESS_VERSION_BUILD = '0.4.0';

export const NO_TRANSACTIONS = 'No transactions in recent blocks';
