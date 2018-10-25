/* eslint-disable import/prefer-default-export */
import { get } from '../utils/Api';

/**
 * Get user from server
 * @returns {Promise<any>}
 */
export const me = () => new Promise((resolve, reject) => {
	get('/api/v1/user').then((data) => {
		resolve(data);
	}).catch((error) => {
		reject(error);
	});
});
