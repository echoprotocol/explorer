import React from 'react';
import PropTypes from 'prop-types';

const MultyField = ({ fields }) => (
	<div className="multy-field">
		{fields.map((item) => (
			<span className="multy-field-item">
				<span className="multy-field-item__name">
					{item.key}:&nbsp;
				</span>
				<span className="multy-field-item__value">
					{item.value}
				</span>
			</span>
		))}
	</div>
);

MultyField.propTypes = {
	fields: PropTypes.array.isRequired,
};
export default MultyField;
