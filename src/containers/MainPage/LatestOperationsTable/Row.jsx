import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { validators } from 'echojs-lib';

import Avatar from '../../../components/Avatar';
import URLHelper from '../../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH } from '../../../constants/RouterConstants';
import FormatHelper from '../../../helpers/FormatHelper';

const OperationsRow = React.memo(({
	operation, from, to, amount, onClick,
}) => (
	<React.Fragment>
		<tr onClick={onClick} className={cn('view')}>
			<td className="operation"><div className="td-in">{operation}</div></td>
			<td className="from">
				{
					(from.name || from.id) ?
						<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createUrlById(from.id)}>
							<a className="td-in avatar-wrap">
								{validators.isAccountId(from.id) && <Avatar accountName={from.name} />}
								<span>{from.name ? from.name : from.id}</span>
							</a>
						</Link>
						:
						<span>-</span>}
			</td>
			<td className="to">
				{
					(to.name || to.id) ?
						<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createUrlById(to.id)}>
							<a className="td-in avatar-wrap">
								{validators.isAccountId(to.id) && <Avatar accountName={to.name} />}
								<span>{to.name ? to.name : to.id}</span>
							</a>
						</Link> :
						<span>-</span>}
			</td>
			<td className="amount">
				<div className="td-in">
					<span className="value">{FormatHelper.formatAmount(amount.value, amount.precision)}</span>
					<span className="type">{amount.coin}</span>
				</div>
			</td>
		</tr>
	</React.Fragment>
));

OperationsRow.propTypes = {
	operation: PropTypes.string.isRequired,
	from: PropTypes.object.isRequired,
	to: PropTypes.object.isRequired,
	amount: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default OperationsRow;
