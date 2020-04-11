import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import URLHelper from '../../../helpers/URLHelper';

import Avatar from '../../Avatar';

const OperationInfoRow = ({
	title, accounts,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className="producers-field">
				{accounts.map((account) => (
					<Link className="avatar-wrap" to={URLHelper.createUrlById(account.link)} key={account.link}>
						<Avatar accountName={account.value} />
						<span>{account.value}</span>
					</Link>
				))}
			</div>
		</div>
	</div>
);

OperationInfoRow.propTypes = {
	title: PropTypes.string.isRequired,
	accounts: PropTypes.array,
};

OperationInfoRow.defaultProps = {
	accounts: [],
};

export default OperationInfoRow;
