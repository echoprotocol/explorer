import { API_PREFIX, CONTRACT_PREFIX, LIKE_PREFIX, ABI_PREFIX } from '../constants/ExplorerServerConstans';
import { put, get, post } from '../utils/Api';

import config from '../config/chain';

class ApiService {

	static changeContract(id, data) {
		return put(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${id}`, data, 'multipart/form-data');
	}

	static getContractInfo(contractId) {
		return get(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${contractId}`);
	}

	static setStarToContract(data) {
		return post(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${LIKE_PREFIX}`, data);
	}

	static setAbi(data) {
		return post(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${ABI_PREFIX}`, data);
	}

}

export default ApiService;
