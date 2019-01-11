// import moment from 'moment';

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

	if (obj && obj[0]) {
		dispatch(RoundReducer.actions.set({ field: 'latestBlock', value: obj[0].head_block_number }));
	}

	// const lBlockNum = obj[0].head_block_number;
	// const lBlock = await socket.api.wsApi.database.getBlock(lBlockNum);
	// console.log(lBlock);
	//
	// const timeLimit = moment(lBlock.timestamp).subtract(1, 'days');

	// console.log(await socket.api.wsApi.database.getBlockHeader(lBlockNum));
	// const blockNums = [];
	// const startBlock = lBlockNum - 60;
	// console.log(startBlock);
	// for (let i = startBlock; i < startBlock + 50; i += 1) {
	// 	console.log(i);
	// 	blockNums.push(i);
	// }
	// console.log(blockNums);
	// console.log(await socket.api.wsApi.database.getBlockHeaderBatch(blockNums));

	// for (let i = 0; ; i += 1) {
	// 	const block = await socket.api.wsApi.database.getBlock(lBlockNum - i); // eslint-disable-line no-await-in-loop
	//
	// 	if (moment(block.timestamp) < timeLimit) {
	// 		console.log('complete');
	//
	// 		break;
	// 	}
	// 	if (Number.isInteger(i / 100)) {
	//
	// 		console.log(block.timestamp, Date.now());
	// 	}
	// }

	// const promiseArr = [];
	//
	// for (let i = 0; i < 600; i += 1) {
	// 	promiseArr.push(socket.api.wsApi.database.getBlock(lBlockNum - i)); // eslint-disable-line no-await-in-loop
	// }
	//
	// console.log('start123');
	// console.log(promiseArr);
	// console.log('start');
	// console.log(await Promise.all(promiseArr));
	// console.log('end');
};
