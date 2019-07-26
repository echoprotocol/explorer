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

			result = block.transactions[opId[1] - 1].operations[opId[2] - 1];
		}
		dispatch(ObjectsReducer.actions.set({ field: 'data', value: result }));
	} catch (e) {
		dispatch(ObjectsReducer.actions.set({ field: 'error', value: e.message }));
	}

};

export const setError = (text) => async (dispatch) => {
	dispatch(ObjectsReducer.actions.set({ field: 'error', value: text }));
};
