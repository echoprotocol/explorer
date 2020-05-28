import { constants } from 'echojs-lib';

export const KEY_CODES = {
	ENTER_CODE: 13,
	TAB_CODE: 9,
	ESC_CODE: 27,
	MINUS_CODE: 189,
	FIVE_NUMBER_CODE: 53,
	ARROW_UP: 38,
	ARROW_DOWN: 40,
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
	BLOCKS_TABLE: `Blocks table | ${DEFAULT_TITLE}`,
};

export const DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES = constants.DYNAMIC_GLOBAL_OBJECT_ID;

export const START_AVERAGE_TRS_BLOCKS = 10;
export const MAX_AVERAGE_TRS_BLOCKS = 100;

export const PAGE_BLOCKS_COUNT = 11;
export const PAGE_ADD_BLOCKS_COUNT = 10;

export const MAX_BLOCK_REQUESTS = PAGE_BLOCKS_COUNT;

export const KEY_CODE_ENTER = 13;
export const KEY_CODE_ESC = 27;

export const ERC20_EVENT_HASHES = {
	'Transfer(address,address,uint256)': 'ddf252ad',
	'Approval(address,address,uint256)': '8c5be1e5',
	'Withdrawal(address, uint256)': '7fcf532c',
	'Deposit(address, uint256)': 'e1fffcc4',
};

export const ERC20_REQIURED_HASHES = {
	'allowance(address,address)': 'dd62ed3e',
	'approve(address,uint256)': '095ea7b3',
	'balanceOf(address)': '70a08231',
	'totalSupply()': '18160ddd',
	'transfer(address,uint256)': 'a9059cbb',
	'transferFrom(address,address,uint256)': '23b872dd',
	'Transfer(address,address,uint256)': 'ddf252ad',
	'Approval(address,address,uint256)': '8c5be1e5',
};
export const ERC20_HASHES = {
	'increaseAllowance(address,uint256)': '39509351',
	'allowance(address,address)': 'dd62ed3e',
	'approve(address,uint256)': '095ea7b3',
	'balanceOf(address)': '70a08231',
	'decimals()': '313ce567',
	'decreaseAllowance(address,uint256)': 'a457c2d7',
	'symbol()': '95d89b41',
	'totalSupply()': '18160ddd',
	'transfer(address,uint256)': 'a9059cbb',
	'transferFrom(address,address,uint256)': '23b872dd',
	'Transfer(address,address,uint256)': 'ddf252ad',
	'Approval(address,address,uint256)': '8c5be1e5',
	'Withdrawal(address, uint256)': '7fcf532c',
	'Deposit(address, uint256)': 'e1fffcc4',
};

export const BYTECODE_SYMBOLS_LENGTH = 616;
export const ECHO_ASSET = {
	ID: constants.CORE_ASSET_ID,
	SYMBOL: 'ECHO',
	PRECISION: 8,
};
export const EETH_ASSET_ID = `1.${constants.PROTOCOL_OBJECT_TYPE_ID.ASSET}.1`;
export const EBTC_ASSET_ID = `1.${constants.PROTOCOL_OBJECT_TYPE_ID.ASSET}.2`;

export const NATHAN = {
	ID: `1.${constants.PROTOCOL_OBJECT_TYPE_ID.ACCOUNT}.15`,
};

export const NULL_ACCOUNT = {
	ID: `1.${constants.PROTOCOL_OBJECT_TYPE_ID.ACCOUNT}.0`,
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
export const MAIN_HEADER_HEIGHT = 250;

export const MAX_RETRIES = 999999999;

export const MAX_WIDTH_SCREEN = 768;
export const MIN_ACCESS_VERSION_BUILD = '0.4.0';

export const NO_TRANSACTIONS = 'No transactions in recent blocks';
export const NETWORK_CONNECTED_ERROR = 'Couldn\'t reach server or bad internet access';
export const NONE_SYMBOL = '-';
export const NOT_AVAILABLE_SYMBOL = 'N/A';

export const TOKEN_TYPE = 'TOKEN';

export const MAINNET_MODE = 'MAINNET';
export const TESTNET_MODE = 'TESTNET';
