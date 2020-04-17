import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import copyIcon from '../../public/images/icons/copy-icon.svg';

const CopyButton = React.memo(({ valueToCopy, name }) => {
	const [isCopied, setCopied] = useState(false);

	const onCopy = () => {
		if (!isCopied) {
			setCopied(true);
			copy(valueToCopy);
			setTimeout(() => {
				setCopied(false);
			}, 3000);
		}
	};

	return (
		<button onClick={onCopy} className="copy-btn">
			<img src={copyIcon} className="copy-btn__icon" alt="copy" />
			<span className="copy-btn__name">{isCopied ? 'Copied' : name}</span>
		</button>
	);
});

CopyButton.propTypes = {
	valueToCopy: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default CopyButton;
