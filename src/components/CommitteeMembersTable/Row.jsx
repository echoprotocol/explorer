import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

import Avatar from '../Avatar';
import URLHelper from '../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH } from '../../constants/RouterConstants';

const OperationsRow = ({
	onClick, index, data,
}) => (
	<React.Fragment>
		<tr onClick={onClick} className={cn('view')}>
			<td className="number"><div className="td-in">{index}</div></td>
			<td className="account">
				<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrlByName(data.account.value)}>
					<a className="td-in avatar-wrap">
						<Avatar accountName={data.account.value} />
						<span>{data.account.value}</span>
					</a>
				</Link>
			</td>
			{data.participation &&
			<td className="participation">
				<div className="td-in">
					<span>{data.participation}</span>
				</div>
			</td>}
			<td className="bitcoin-address">
				<a href="#" className="td-in">
					<span>{data.bitcoinAddress}</span>
				</a>
			</td>
			<td className="etherium-address">
				<a href="#" className="td-in">
					<span>{data.etheriumAddress}</span>
				</a>
			</td>
			<td className="id">
				<div className="td-in">
					<span>{data.id}</span>
				</div>
			</td>
			{data.lastOperation &&
			<td className="last-operation">
				<a href="#" className="td-in">
					<span>{data.lastOperation.type}</span>
				</a>
			</td>}
		</tr>
	</React.Fragment>
);

OperationsRow.propTypes = {
	index: PropTypes.number.isRequired,
	data: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default memo(OperationsRow);
