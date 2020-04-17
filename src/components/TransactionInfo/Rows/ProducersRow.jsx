import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { SSR_ACCOUNTS_PATH } from '../../../constants/RouterConstants';
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
					<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createUrlById(account.link)} key={account.link}>
						<a className="avatar-wrap">
							<Avatar accountName={account.value} />
							<span>{account.value}</span>
						</a>
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
