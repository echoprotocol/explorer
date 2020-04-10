import React from 'react';
import { Link } from 'react-router-dom';

import URLHelper from '../../helpers/URLHelper';

import Avatar from '../Avatar';

const ProducersField = ({ accounts }) => (
	<div className="producers-field">
		{accounts.map((account) => (
			<Link className="avatar-wrap" to={URLHelper.createUrlById(account.link)} key={account.link}>
				<Avatar accountName={account.value} />
				<span>{account.value}</span>
			</Link>
		))}
	</div>
);

export default ProducersField;
