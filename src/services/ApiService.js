import {
	CONTRACT_PREFIX,
	LIKE_PREFIX,
	VERIFY_PREFIX,
	ABI_PREFIX,
	API_PREFIX,
	SEARCH_PREFIX,
	NETWORK_PREFIX,
	PEERS_PREFIX,
} from '../constants/ExplorerServerConstans';
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

	static getSolcList() {
		return get(config.SOLC_LIST_URL);
	}

	static verifyContract(data) {
		return post(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${VERIFY_PREFIX}`, data);
	}

	static setAbi(data) {
		return post(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${ABI_PREFIX}`, data);
	}

	static searchContracts(data) {
		return post(`${config.SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${SEARCH_PREFIX}`, data);
	}

	static getPeers(data) {
		return get(`${config.SERVER_URL}/${API_PREFIX}/${NETWORK_PREFIX}/${PEERS_PREFIX}`, data);
	}

}

export default ApiService;
