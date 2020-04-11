import React from 'react';
import PropTypes from 'prop-types';

const MultyRow = ({
	title, fields,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
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
		</div>
	</div>
);

MultyRow.propTypes = {
	title: PropTypes.string.isRequired,
	fields: PropTypes.array,
};

MultyRow.defaultProps = {
	fields: [],
};

export default MultyRow;
