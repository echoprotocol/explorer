import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

import Avatar from '../../../components/Avatar';
import URLHelper from '../../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH } from '../../../constants/RouterConstants';
import FormatHelper from '../../../helpers/FormatHelper';

const OperationsRow = React.memo(({
	operation, from, to, amount, onClick,
}) => (
	<React.Fragment>
		<tr onClick={onClick} className={cn('view')}>
			<td />
			<td className="operation"><div className="td-in">{operation}</div></td>
			<td className="from">
				{
					from ?
						<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrlByName(from)}>
							<a className="td-in avatar-wrap">
								<Avatar accountName={from} />
								<span>{from}</span>
							</a>
						</Link>
						:
						<span>-</span>}
			</td>
			<td className="to">
				{
					to ?
						<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrlByName(to)}>
							<a className="td-in avatar-wrap">
								<Avatar accountName={to} />
								<span>{to}</span>
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
	from: PropTypes.string,
	to: PropTypes.string,
	amount: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};

OperationsRow.defaultProps = {
	from: '',
	to: '',
};


export default OperationsRow;
