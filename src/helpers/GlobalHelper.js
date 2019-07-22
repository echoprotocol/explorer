/* eslint-disable import/prefer-default-export */
import randomstring from 'randomstring';

export const generateUniqueKey = (key) => `${Date.now()}_${randomstring.generate(10)}${key || ''}`;

/**
 *
 * @param tags
 * @param id?
 */
export const resetTags = (tags, id) => {
	Object.values(tags).forEach((node) => {
		if (id) {
			if (node.id === id) {
				node.content = '';
			}
		} else {
			node.content = '';
		}
	});
};
