import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { SSR_ACCOUNTS_PATH } from '../../../constants/RouterConstants';
import URLHelper from '../../../helpers/URLHelper';

import Avatar from '../../Avatar';


const LinkRow = ({
	title, account, link, isLinkOut,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{account &&
				<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createUrlById(account.link)}>
					<a className="avatar-wrap">
						<Avatar accountName={account.value} />
						<span>{account.value}</span>
					</a>
				</Link>
			}
			{link && !isLinkOut &&
				<Link href={link}>
					{link}
				</Link>
			}
			{link && isLinkOut &&
				<a href={link} className="link" target="_blank" rel="noopener noreferrer">{link}</a>
			}
		</div>
	</div>
);

LinkRow.propTypes = {
	title: PropTypes.string.isRequired,
	account: PropTypes.object,
	link: PropTypes.string,
	isLinkOut: PropTypes.bool,
};

LinkRow.defaultProps = {
	account: null,
	link: '',
	isLinkOut: false,
};

export default LinkRow;
