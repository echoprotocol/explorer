import React from 'react';
import PropTypes from 'prop-types';
import CopyBtn from '../../../components/Buttons/CopyBtn';

import { sliceText } from '../../../helpers/FunctionHelper';

const CopyRow = ({ title, value }) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className="copy-field">
				<div className="copy-field__text">{sliceText(value, 300)}</div>
				<CopyBtn valueToCopy={value} name="Copy code" />
			</div>
		</div>
	</div>
);

CopyRow.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default CopyRow;
