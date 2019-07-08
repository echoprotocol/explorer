import {
	KILO_BYTE,
	MAX_KB_CONTRACT_ICON,
	MAX_LENGTH_CONTRACT_DESCRIPTION,
	MAX_LENGTH_CONTRACT_NAME,
	MIN_LENGTH_CONTRACT_NAME,
} from '../constants/GlobalConstants';

export const validateContractName = (name) => {
	if (!name) {
		return 'Contract name should not be empty';
	}

	if (name.length < MIN_LENGTH_CONTRACT_NAME) {
		return 'Contract name must be 2 characters or more';
	}

	if (name.length > MAX_LENGTH_CONTRACT_NAME) {
		return 'Contract name must be 16 characters or less';
	}

	if (!name.match(/^[a-zA-Z0-9._ ]+$/)) {
		return 'Invalid symbols';
	}

	return null;
};


export const validateContractDescription = (description) => {
	if (description.length > MAX_LENGTH_CONTRACT_DESCRIPTION) {
		return 'Description must be less than 256 symbol.';
	}

	return null;
};

export const validateContractIcon = (file) => {
	if (!file) {
		return 'Choose file.';
	}

	const { size, type } = file;

	if (!type.match(/(jpg|jpeg|png)/)) {
		return 'File should be jpg or png.';
	}

	if (size > KILO_BYTE * MAX_KB_CONTRACT_ICON) {
		return `File should be less than ${MAX_KB_CONTRACT_ICON}kb`;
	}

	return null;
};

