import echo from 'echojs-lib';

import ObjectsReducer from '../reducers/ObjectsReducer';

export const getObjectInfo = (objectId) => async (dispatch, getState) => {

	const result = await echo.api.getObject(objectId);

	dispatch(ObjectsReducer.actions.set({ field: 'data', value: result }));


};

export const setError = (text) => async (dispatch, getState) => {
	dispatch(ObjectsReducer.actions.set({ field: 'error', value: 'Object id id Invalid ' }));
};