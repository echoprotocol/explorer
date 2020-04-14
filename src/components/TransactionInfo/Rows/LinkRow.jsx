import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import URLHelper from '../../../helpers/URLHelper';

import Avatar from '../../Avatar';


const LinkRow = ({
	title, account, link, isLinkOut, className,
}) => (
	<div className={`od-row ${className}`}>
		<div className="od-col">{title}:</div>
		<div className="od-col flex">
			{account &&
				<Link className="avatar-wrap" to={URLHelper.createUrlById(account.link)}>
					<Avatar accountName={account.value} />
					<span>{account.value}</span>
				</Link>
			}
			{/* Change to Link route when addrress will known */}
			{link && !isLinkOut &&
				<a href={link} className="link">
					{link}
				</a>
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
	className: PropTypes.string,
};

LinkRow.defaultProps = {
	account: null,
	link: '',
	isLinkOut: false,
	className: '',
};

export default LinkRow;
