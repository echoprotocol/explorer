import React from 'react';
import PropTypes from 'prop-types';

const MultyRow = React.memo(({ title, fields }) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className="multy-field">
				{fields.map((item, i) => (
					<span className="multy-field-item" key={`${title}${item.key}${i.toString()}`}>
						<span className="multy-field-item__name">
							{item.key}:&nbsp;
						</span>
						<span className="multy-field-item__value">
							{JSON.stringify(item.value)}
						</span>
					</span>
				))}
			</div>
		</div>
	</div>
));

MultyRow.propTypes = {
	title: PropTypes.string.isRequired,
	fields: PropTypes.array,
};

MultyRow.defaultProps = {
	fields: [],
};

export default MultyRow;
