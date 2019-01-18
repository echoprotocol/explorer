/* eslint-disable import/prefer-default-export */
import { ERC20_HASHES } from '../constants/GlobalConstants';

export const isErc20Contract = (scriptHex) => {
	const hashes = [
		ERC20_HASHES['allowance(address,address)'],
		ERC20_HASHES['approve(address,uint256)'],
		ERC20_HASHES['balanceOf(address)'],
		ERC20_HASHES['totalSupply()'],
		ERC20_HASHES['transfer(address,uint256)'],
		ERC20_HASHES['transferFrom(address,address,uint256)'],
		ERC20_HASHES['Transfer(address,address,uint256)'],
		ERC20_HASHES['Approval(address,address,uint256)'],
	];

	if (scriptHex) {
		for (let i = 0; i < hashes.length; i += 1) {
			if (scriptHex.indexOf(hashes[i]) === -1) {
				return false;
			}
		}
		return true;

	}

	return false;

};
