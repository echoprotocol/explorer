import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import cn from 'classnames';

import Avatar from '../../../components/Avatar';
import URLHelper from '../../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH } from '../../../constants/RouterConstants';

const OperationsRow = React.memo(({
	number, age, producer, size, txs, onClick, date,
}) => {
	const producerLink = URLHelper.createAccountUrlByName(producer);
	const goToAccount = (e) => {
		e.preventDefault();
		e.stopPropagation();
		Router.push(SSR_ACCOUNTS_PATH, producerLink);
	};

	return (
		<React.Fragment>
			<tr onClick={onClick} className={cn('view')}>
				<td className="number"><div className="td-in">{number}</div></td>
				<td className="age">
					<div className="td-in">
						<span className="age-hint">{date},</span>
						<span className="age-value">{age}</span>
					</div>
				</td>
				<td className="producer">
					<Link href={SSR_ACCOUNTS_PATH} as={producerLink}>
						<a href={producerLink} className="td-in avatar-wrap" onClick={(e) => goToAccount(e)}>
							<Avatar accountName={producer} />
							<span>{producer}</span>
						</a>
					</Link>
				</td>
				<td className="size"><div className="td-in">{size.weight} {size.weightSize}</div></td>
				<td className="txs"><div className="td-in">{txs}</div></td>
			</tr>
		</React.Fragment>
	);
});

OperationsRow.propTypes = {
	number: PropTypes.string.isRequired,
	age: PropTypes.string.isRequired,
	producer: PropTypes.string.isRequired,
	size: PropTypes.object.isRequired,
	txs: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default OperationsRow;
