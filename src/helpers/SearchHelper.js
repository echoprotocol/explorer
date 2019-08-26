import { SEARCH_LIMIT } from '../constants/SearchConstants';

/**
 * get limit header hints
 * @param accountHints
 * @param contractHints
 * @param assetHints
 * @returns {[]}
 */
export const getLimitHints = (accountHints, contractHints, assetHints) => {
	let accountCount = accountHints.length < SEARCH_LIMIT.MIN ? accountHints.length : SEARCH_LIMIT.MIN;
	let contractCount = contractHints.length < SEARCH_LIMIT.MIN ? contractHints.length : SEARCH_LIMIT.MIN;
	let assetCount = assetHints.length < SEARCH_LIMIT.MIN ? assetHints.length : SEARCH_LIMIT.MIN;

	let limit = SEARCH_LIMIT.MAX - accountCount - contractCount - assetCount;

	if (limit && accountHints.length > limit + accountCount) {
		const oldAccountCount = accountCount;
		accountCount = limit + accountCount;
		limit = (limit + oldAccountCount) - accountCount;
	}

	if (limit && contractHints.length > limit + contractCount) {
		const oldContractCount = contractCount;
		contractCount = limit + contractCount;
		limit = (limit + oldContractCount) - contractCount;
	}

	if (limit && assetHints.length > limit + assetCount) {
		assetCount = limit + assetCount;
	}

	accountHints = accountHints.slice(0, accountCount);
	contractHints = contractHints.slice(0, contractCount);
	assetHints = assetHints.slice(0, assetCount);

	return [].concat(accountHints).concat(contractHints).concat(assetHints);
};
