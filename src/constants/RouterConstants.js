export const INDEX_PATH = '/';
export const BLOCK_INFORMATION_PATH = '/blocks/:round';
export const TRANSACTION_INFORMATION_PATH = '/blocks/:round/:index';
export const ACCOUNTS_PATH = '/accounts/:id/info';
export const CONTRACT_PATH = '/contracts/:id/info/';
export const CONTRACT_PATH_DETAIL = '/contracts/:id/info/:detail?';
export const CONTRACT_BYTECODE = 'bytecode';
export const CONTRACT_TRANSACTIONS = 'transactions';
export const CONTRACT_BALANCES = 'balances';
export const CONTRACT_ABI = 'abi';
export const CONTRACT_SOURCE_CODE = 'source-code';
export const UPLOAD_ABI_PATH = '/contracts/:id/upload-abi';
export const OBJECTS_PATH = '/objects';
export const ASSET_PATH = '/assets/:id/info';
export const NOT_FOUND_PATH = '/not-found';
export const VERIFY_CONTRACT_PATH = '/contracts/:id/verify';
export const MANAGE_CONTRACT_PATH = '/contracts/:id/manage';
export const NODE_MAP = '/node-map';

export const CONTRACT_DETAILS_NUMBERS_TAB = {
	[CONTRACT_TRANSACTIONS]: 1,
	[CONTRACT_BYTECODE]: 2,
	[CONTRACT_BALANCES]: 3,
	[CONTRACT_ABI]: 4,
	[CONTRACT_SOURCE_CODE]: 5,
};
