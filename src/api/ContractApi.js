/* eslint-disable import/prefer-default-export */
import { post } from '../utils/Api';

export const setAbi = (id, abi) => new Promise((resolve, reject) => {
	post('/contract/abi', { id, abi }).then((data) => {
		resolve(data);
	}).catch((error) => {
		reject(error);
	});
});
