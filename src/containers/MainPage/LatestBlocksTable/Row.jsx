import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Avatar from '../../../components/Avatar';
import URLHelper from '../../../helpers/URLHelper';

const OperationsRow = React.memo(({
	number, age, producer, size, txs, onClick,
}) => (
	<React.Fragment>
		<tr onClick={onClick} className={cn('view')}>
			<td />
			<td className="number"><div className="td-in">{number}</div></td>
			<td className="age">
				<div className="td-in">
					<span className="age-hint">25 Mar,</span>
					<span className="age-value">{age}</span>
				</div>
			</td>
			<td className="producer">
				<Link
					className="td-in avatar-wrap"
					to={URLHelper.createAccountUrlByName(producer)}
					onClick={(e) => e.stopPropagation()}
				>
					<Avatar accountName={producer} />
					<span>{producer}</span>
				</Link>
			</td>
			<td className="size"><div className="td-in">{size.weight} {size.weightSize}</div></td>
			<td className="txs"><div className="td-in">{txs}</div></td>
			<td />
		</tr>
	</React.Fragment>
));

OperationsRow.propTypes = {
	number: PropTypes.string.isRequired,
	age: PropTypes.string.isRequired,
	producer: PropTypes.string.isRequired,
	size: PropTypes.object.isRequired,
	txs: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default OperationsRow;
