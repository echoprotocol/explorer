import echo, { validators } from 'echojs-lib';

import ObjectsReducer from '../reducers/ObjectsReducer';

export const getObjectInfo = (objectId) => async (dispatch) => {

	try {
		let result = null;

		if (validators.isObjectId(objectId)) {
			result = await echo.api.getObject(objectId);
		} else {
			const opId = objectId.split('-');

			if (!opId[0] || !opId[1] || !opId[2]) {
				dispatch(ObjectsReducer.actions.set({ field: 'error', value: 'Invalid block, transaction or operation numbers' }));
				return;
			}

			const block = await echo.api.getBlock(opId[0]);

			if (!block) {
				dispatch(ObjectsReducer.actions.set({ field: 'error', value: 'Invalid block number' }));
				return;
			}

			const virtual = opId[3] === 'virtual';


			if (!block.transactions[opId[1] - 1] && !virtual) {
				dispatch(ObjectsReducer.actions.set({ field: 'error', value: 'Invalid transaction index' }));
				return;
			}

			let transaction = {};

			if (virtual) {
				const virtualOperations = await echo.api.getBlockVirtualOperations(opId[0]);
				const filtredVirtualOperations = virtualOperations.filter((v) => v.trx_in_block === opId[1] - 1);

				if (!filtredVirtualOperations.length) {
					dispatch(ObjectsReducer.actions.set({ field: 'error', value: 'Invalid transaction index' }));
					return;
				}
				const transformedOperations = filtredVirtualOperations.map((v) => v.op);
				transaction = {
					operations: transformedOperations,
				};
			} else {
				transaction = block.transactions[opId[1] - 1];
			}

			result = transaction.operations[opId[2] - 1];
		}
		dispatch(ObjectsReducer.actions.set({ field: 'data', value: result }));
	} catch (e) {
		dispatch(ObjectsReducer.actions.set({ field: 'error', value: e.message }));
	}

};

export const setError = (text) => async (dispatch) => {
	dispatch(ObjectsReducer.actions.set({ field: 'error', value: text }));
};

export const clearData = () => async (dispatch) => {
	dispatch(ObjectsReducer.actions.set({ field: 'data', value: null }));
};
