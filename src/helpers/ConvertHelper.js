import { CONTRACT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';

class ConvertHelper {

	static toContractId(address) {
		return `${CONTRACT_OBJECT_PREFIX}.${parseInt(address.substr(-32), 16)}`;
	}

}

export default ConvertHelper;
