import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import URLHelper from '../../../helpers/URLHelper';

const LinksArray = ({
	links, title,
}) => (
	links.length > 0 ?
		<div className="od-row">
			<div className="od-col">{title}:</div>
			<div className="od-col">
				<div>
					{links.map((link) => (
						<Link href={link} as={URLHelper.createUrlById}>
							<a href="">
								<span>{link}</span>&nbsp;
							</a>
						</Link>
					))}
				</div>
			</div>
		</div> : null
);

LinksArray.propTypes = {
	title: PropTypes.string.isRequired,
	links: PropTypes.array,
};

LinksArray.defaultProps = {
	links: [],
};

export default LinksArray;
