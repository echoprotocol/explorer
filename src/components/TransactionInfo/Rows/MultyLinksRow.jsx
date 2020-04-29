import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import URLHelper from '../../../helpers/URLHelper';
import SsrHrefHelper from '../../../helpers/SsrHrefHelper';

const MultyLinksRow = React.memo(({ title, fields, readyLinks }) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className="multy-field">
				{readyLinks && readyLinks.map((link) => (
					<a href={link.link}>{link.title}</a>
				))}
				{fields.length && fields.map((item) => (
					<span className="multy-field-item" key={item.value}>
						<span className="multy-field-item__name">
							{item.key}:&nbsp;
						</span>
						<Link href={SsrHrefHelper.getHrefByObjectId(item.value)} className="link" as={URLHelper.createUrlById(item.value)}>
							<a href="">{item.value}</a>
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
	readyLinks: PropTypes.array,
};

MultyLinksRow.defaultProps = {
	fields: [],
	readyLinks: [],
};

export default MultyLinksRow;
