/* eslint-disable import/prefer-default-export */
import randomstring from 'randomstring';

export const generateUniqueKey = (key) => `${Date.now()}_${randomstring.generate(10)}${key || ''}`;
