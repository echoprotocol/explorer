import echo from 'echojs-lib';

import ObjectsReducer from '../reducers/ObjectsReducer';

export const getObjectInfo = (objectId) => async (dispatch) => {

	const result = await echo.api.getObject(objectId);

	dispatch(ObjectsReducer.actions.set({ field: 'data', value: result }));

};

export const setError = (text) => async (dispatch) => {
	dispatch(ObjectsReducer.actions.set({ field: 'error', value: text }));
};
