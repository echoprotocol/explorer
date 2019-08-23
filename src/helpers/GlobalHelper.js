/* eslint-disable import/prefer-default-export */
import randomstring from 'randomstring';
import config from './../config/chain';

export const generateUniqueKey = (key) => `${Date.now()}_${randomstring.generate(10)}${key || ''}`;

export const getAppVersion = () => config.APP_VERSION;
