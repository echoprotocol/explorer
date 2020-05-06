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
export const CONTRACT_ERC20 = 'erc20';
export const CONTRACT_SOURCE_CODE = 'source-code';
export const UPLOAD_ABI_PATH = '/contracts/:id/upload-abi';
export const OBJECTS_PATH = '/objects';
export const ASSET_PATH = '/assets/:id/info';
export const NOT_FOUND_PATH = '/not-found';
export const VERIFY_CONTRACT_PATH = '/contracts/:id/verify';
export const MANAGE_CONTRACT_PATH = '/contracts/:id/manage';
export const NODE_MAP = '/node-map';

export const SSR_BLOCK_INFORMATION_PATH = '/blocks/[round]';
export const SSR_ACCOUNTS_PATH = '/accounts/[id]/info';
export const SSR_ASSET_PATH = '/assets/[id]/info';
export const SSR_TRANSACTION_INFORMATION_PATH = '/blocks/[round]/[index]';
export const SSR_CONTRACT_PATH = '/contracts/[id]/info/';
export const SSR_UPLOAD_ABI_PATH = '/contracts/[id]/upload-abi';
export const SSR_VERIFY_CONTRACT_PATH = '/contracts/[id]/verify';
export const SSR_MANAGE_CONTRACT_PATH = '/contracts/[id]/manage';
export const SSR_CONTRACT_DETAILS_PATH = '/contracts/[id]/info/[detail]';

export const CONTRACT_DETAILS_NUMBERS_TAB = {
	[CONTRACT_TRANSACTIONS]: 0,
	[CONTRACT_ABI]: 1,
	[CONTRACT_ERC20]: 2,
};

export const ROUTES_WITH_COLUMN_DIRECTION = [INDEX_PATH];
