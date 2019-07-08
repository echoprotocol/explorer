import { CONTRACT_PREFIX, LIKE_PREFIX } from '../constants/ExplorerServerConstans';
import { get, post } from '../utils/Api';

import config from '../config/chain';

class ApiService {

	static getContractInfo(contractId) {
		return get(`${config.SERVER_URL}/${CONTRACT_PREFIX}/${contractId}`);
	}

	static setStarToContract(data) {
		return post(`${config.SERVER_URL}/${CONTRACT_PREFIX}/${LIKE_PREFIX}`, data);
	}

}

export default ApiService;
