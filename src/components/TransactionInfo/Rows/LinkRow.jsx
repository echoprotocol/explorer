import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import URLHelper from '../../../helpers/URLHelper';

import Avatar from '../../Avatar';


const LinkRow = ({
	title, account, link, isLinkOut, value,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{account &&
				<Link className="avatar-wrap" to={URLHelper.createUrlById(account.link)}>
					<Avatar accountName={account.value} />
					<span>{account.value}</span>
				</Link>
			}
			{link && !isLinkOut &&
				<Link to={link}>
					{value || link}
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
	value: PropTypes.string,
	isLinkOut: PropTypes.bool,
};

LinkRow.defaultProps = {
	account: null,
	link: '',
	value: '',
	isLinkOut: false,
};

export default LinkRow;
