import RoundReducer from '../reducers/RoundReducer';

export const setLatestBlock = () => (dispatch, getState) => {
	const prepBlock = getState().round.get('preparingBlock');

	if (!prepBlock) {
		return false;
	}

	dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: prepBlock }));

	return true;
};


export const initBlocks = (socket) => async (dispatch) => {
	const obj = await socket.api.wsApi.database.getObjects(['2.1.0']);
	// const lBlock = await socket.api.wsApi.database.getBlock(obj[0].head_block_number);

	if (obj && obj[0]) {
		dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: obj[0].head_block_number }));
	}
};
