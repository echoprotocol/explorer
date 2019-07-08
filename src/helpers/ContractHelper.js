import { LIKE_CONTRACT_MESSAGE, UNLIKE_CONTRACT_MESSAGE } from '../constants/ModalConstants';

class ContractHelper {

	static getMessageToLikeContract(isLike, contractId) {
		if (isLike) {
			return `${LIKE_CONTRACT_MESSAGE} ${contractId}`;
		}
		return `${UNLIKE_CONTRACT_MESSAGE} ${contractId}`;
	}

}

export default ContractHelper;
