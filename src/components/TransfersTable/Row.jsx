import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

import Avatar from '../Avatar';
import URLHelper from '../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH, SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';

const OperationsRow = React.memo(({
	date, sender, receiver, amount, block, id, onClick,
}) => (
	<React.Fragment>
		<tr onClick={onClick} className={cn('view')}>
			<td className="number"><div className="td-in">{id}.</div></td>
			<td className="date">
				<Link
					href={SSR_BLOCK_INFORMATION_PATH}
					as={URLHelper.createBlockUrl(block)}
				>
					<a className="td-in link">
						<span>{date}</span>
					</a>
				</Link>
			</td>
			<td className="sender">
				<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrlByName(sender)}>
					<a className="td-in avatar-wrap">
						<Avatar accountName={sender} />
						<span>{sender}</span>
					</a>
				</Link>
			</td>
			<td className="receiver">
				<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrlByName(receiver)}>
					<a className="td-in avatar-wrap">
						<Avatar accountName={receiver} />
						<span>{receiver}</span>
					</a>
				</Link>
			</td>
			<td className="amount">
				<div className="td-in">
					<span className="value">{amount.value}</span>
					<span className="type">{amount.coin}</span>
				</div>
			</td>
			<td className="block">
				<Link
					href={SSR_BLOCK_INFORMATION_PATH}
					as={URLHelper.createBlockUrl(block)}
				>
					<a className="td-in link">
						<span>{block}</span>
					</a>
				</Link>
			</td>
		</tr>
	</React.Fragment>
));

OperationsRow.propTypes = {
	id: PropTypes.number.isRequired,
	block: PropTypes.string.isRequired,
	sender: PropTypes.string.isRequired,
	receiver: PropTypes.string.isRequired,
	amount: PropTypes.object.isRequired,
	date: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default OperationsRow;
