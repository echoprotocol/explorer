import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { validators } from 'echojs-lib';
import Router from 'next/router';

import Avatar from '../../../components/Avatar';
import URLHelper from '../../../helpers/URLHelper';
import FormatHelper from '../../../helpers/FormatHelper';
import SsrHrefHelper from '../../../helpers/SsrHrefHelper';

const OperationsRow = React.memo(({
	operation, from, to, amount, onClick,
}) => {

	const goToSubject = (e, url, id) => {
		e.preventDefault();
		e.stopPropagation();
		Router.push(SsrHrefHelper.getHrefByObjectId(id), url);
	};

	const renderSubject = (subject) => {
		if (typeof subject === 'object' && !subject.name && !subject.id) {
			return <div className="td-in">—</div>;
		}
		if (validators.isHex(subject) && subject.length === 40) return <span className="td-in"><span>{subject}</span></span>;
		return (
			<Link href={SsrHrefHelper.getHrefByObjectId(subject.id)} as={URLHelper.createUrlById(subject.id)}>
				<a href="" className="td-in avatar-wrap" onClick={(e) => goToSubject(e, URLHelper.createUrlById(subject.id), subject.id)}>
					{validators.isAccountId(subject.id) && <Avatar accountName={subject.name} />}
					<span>{subject.name ? subject.name : subject.id}</span>
				</a>
			</Link>
		);
	};

	return (
		<React.Fragment>
			<tr onClick={onClick} className={cn('view')}>
				<td className="operation"><div className="td-in">{operation}</div></td>
				<td className="from">
					{renderSubject(from)}
				</td>
				<td className="to">
					{renderSubject(to)}
				</td>
				<td className="amount">
					<div className="td-in">
						<span className="value">{FormatHelper.formatAmount(amount.value, amount.precision)}</span>
						<span className="currency">{amount.coin}</span>
					</div>
				</td>
			</tr>
		</React.Fragment>
	);
});

OperationsRow.propTypes = {
	operation: PropTypes.string.isRequired,
	from: PropTypes.object.isRequired,
	to: PropTypes.object.isRequired,
	amount: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default OperationsRow;
