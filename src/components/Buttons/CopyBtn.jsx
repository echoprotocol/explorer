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
		<div className="action-button-wrap">
			<button onClick={onCopy} className="action-button">
				<img src={copyIcon} className="action-button__icon" alt="copy" />
				<span className="action-button__name">{isCopied ? 'Copied' : name}</span>
			</button>
		</div>
	);
});

CopyButton.propTypes = {
	valueToCopy: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default CopyButton;
