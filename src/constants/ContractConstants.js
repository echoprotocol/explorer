import {
	CONTRACT_BALANCES,
	CONTRACT_BYTECODE,
	CONTRACT_TRANSACTIONS,
	CONTRACT_ABI,
} from './RouterConstants';

export const CONTRACT_TABS = {
	0: {
		title: 'Contract info',
		path: '',
	},
	1: {
		title: 'Transactions',
		path: CONTRACT_TRANSACTIONS,
	},
	2: {
		title: 'Bytecode',
		path: CONTRACT_BYTECODE,
	},
	3: {
		title: 'Balances',
		path: CONTRACT_BALANCES,
	},
	4: {
		title: 'ABI',
		path: CONTRACT_ABI,
	},
};

export const CHANGE_TEXT_TIME = 2000;
export const COMPILER_CONSTS = {
	SOLC_NOT_ENOUGH_STACK_ERROR: 'Maximum call stack size exceeded',
	MAX_TRIES_TO_COMPILE: 2,
};
export const ERC20_TOKEN_SYMBOL = 'erc20';
