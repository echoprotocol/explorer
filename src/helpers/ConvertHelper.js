import { decode } from 'echojs-lib';
import keccak256 from 'keccak256';
import { CONTRACT_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';
import { ERC20_EVENT_HASHES } from '../constants/GlobalConstants';

class ConvertHelper {

	static toContractId(address) {
		return `${CONTRACT_OBJECT_PREFIX}.${parseInt(address.substr(-32), 16)}`;
	}

	static convertLogs(logs, abi, data) {
		let event;
		let abiEvents;
		let abiTypes;
		let decValues = new Array(logs.length);
		if (abi && abi.length) {
			abiEvents = abi.filter((el) => el.type === 'event');
			const abiEventsInputTypes = abiEvents.map((e) => e.inputs.map((i) => i.type));
			const abiEventsHashes = abiEvents.map((e, i) => keccak256(`${e.name}(${abiEventsInputTypes[i].join(',')})`).toString('hex'));
			const eventIndex = abiEventsHashes.findIndex((h) => h.substring(0, 8) === logs[0].substring(0, 8));
			abiTypes = abiEventsInputTypes[eventIndex];
			event = `${abiEvents.name}(${abiTypes.join(',')})`;
		} else {
			const eventData = Object.entries(ERC20_EVENT_HASHES).find((el) => el[1] === logs[0].substring(0, 8));
			if (!eventData) {
				return {
					decValues: decValues.fill(null),
					decData: null,
				};
			}
			[event] = eventData;
			abiTypes = eventData && event.substring(event.indexOf('(') + 1, event.indexOf(')')).split(',');
		}

		const paramsLogs = logs.slice(1);
		decValues = [event, ...decode(paramsLogs.join(''), abiTypes.slice(0, paramsLogs.length))];
		if (decValues instanceof Array) {
			decValues = decValues.map((el) => el.toString());
		} else {
			decValues = [decValues.toString()];
		}
		let decData = decode(data, abiTypes.slice(paramsLogs.length));
		if (decData instanceof Array) {
			decData = decData.map((el) => el.toString());
		} else {
			decData = [decData.toString()];
		}

		return { decValues, decData };
	}

}

export default ConvertHelper;
