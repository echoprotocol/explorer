import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import URLHelper from '../../../helpers/URLHelper';
import SsrHrefHelper from '../../../helpers/SsrHrefHelper';

const MultyLinksRow = React.memo(({ title, fields }) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className="multy-field">
				{fields.map((item) => (
					<span className="multy-field-item" key={item.value}>
						<span className="multy-field-item__name">
							{item.key}:&nbsp;
						</span>
						<Link href={SsrHrefHelper.getHrefByObjectId(item.value)} className="link" as={URLHelper.createUrlById(item.value)}>
							<a href="">{item.name ? item.name : item.value}</a>
						</Link>
						{
							item.description &&
							<span className="multy-field-item__value">
								:&nbsp;{item.description}
							</span>
						}
					</span>
				))}
			</div>
		</div>
	</div>
));

MultyLinksRow.propTypes = {
	title: PropTypes.string.isRequired,
	fields: PropTypes.array,
};

MultyLinksRow.defaultProps = {
	fields: [],
};

export default MultyLinksRow;
