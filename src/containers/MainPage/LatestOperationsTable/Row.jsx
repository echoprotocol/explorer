import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Avatar from '../../../components/Avatar';
import URLHelper from '../../../helpers/URLHelper';

const OperationsRow = React.memo(({
	operation, from, to, amount,
}) => (
	<React.Fragment>
		<tr className={cn('view')}>
			<td />
			<td className="operation"><div className="td-in">{operation}</div></td>
			<td className="from">
				<Link
					className="td-in avatar-wrap"
					to={URLHelper.createAccountUrlByName(from)}
					onClick={(e) => e.stopPropagation()}
				>
					<Avatar accountName={from} />
					<span>{from}</span>
				</Link>
			</td>
			<td className="to">
				<Link
					className="td-in avatar-wrap"
					to={URLHelper.createAccountUrlByName(to)}
					onClick={(e) => e.stopPropagation()}
				>
					<Avatar accountName={to} />
					<span>{to}</span>
				</Link>
			</td>
			<td className="amount">
				<div className="td-in">
					<span className="value">{amount.value}</span>
					<span className="type">{amount.coin}</span>
				</div>
			</td>
			<td />
		</tr>
	</React.Fragment>
));

OperationsRow.propTypes = {
	operation: PropTypes.string.isRequired,
	from: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	amount: PropTypes.object.isRequired,
};

export default OperationsRow;
