import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import Router from 'next/router';

import Avatar from '../../Avatar';
import URLHelper from '../../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH } from '../../../constants/RouterConstants';
import FormatHelper from '../../../helpers/FormatHelper';

const AssetTransfersRow = ({
	from, to, amount, fee, operation, id, onClick, asset,
}) => {
	const goToLink = (e, link, srrPath) => {
		e.preventDefault();
		e.stopPropagation();
		Router.push(srrPath, link);
	};
	const fromLink = URLHelper.createAccountUrl(from && from.id);
	const toLink = URLHelper.createAccountUrl(to && to.id);

	return (
		<React.Fragment>
			<tr onClick={onClick} className={cn('view')}>
				<td className="number"><div className="td-in">{id}.</div></td>
				<td className="operation"><div className="td-in">{operation}</div></td>
				<td className="from">
					<Link
						href={SSR_ACCOUNTS_PATH}
						as={fromLink}
					>
						<a
							className="td-in avatar-wrap"
							href={fromLink}
							onClick={(e) => goToLink(e, fromLink, SSR_ACCOUNTS_PATH)}
						>
							<Avatar accountName={from && from.name} />
							<span>{from && from.name}</span>
						</a>
					</Link>
				</td>
				<td className="to">
					<Link
						href={SSR_ACCOUNTS_PATH}
						as={toLink}
					>
						<a
							className="td-in avatar-wrap"
							href={toLink}
							onClick={(e) => goToLink(e, toLink, SSR_ACCOUNTS_PATH)}
						>
							<Avatar accountName={to && to.name} />
							<span>{to && to.name}</span>
						</a>
					</Link>
				</td>
				<td className="amount">
					{(amount && asset) &&
					<div className="td-in">
						<span className="value">{FormatHelper.formatAmount(amount, asset.precision)}</span>
						<span className="currency">{asset.symbol}</span>
					</div>
					}
				</td>
				<td className="fee">
					{fee &&
						<div className="td-in">
							<span className="value">{FormatHelper.formatAmount(fee.value, fee.precision)}</span>
							<span className="currency">{fee.symbol}</span>
						</div>
					}
				</td>
			</tr>
		</React.Fragment>
	);
};

AssetTransfersRow.propTypes = {
	id: PropTypes.number.isRequired,
	from: PropTypes.object.isRequired,
	to: PropTypes.object.isRequired,
	fee: PropTypes.object.isRequired,
	amount: PropTypes.string.isRequired,
	asset: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	operation: PropTypes.string.isRequired,
};

export default memo(AssetTransfersRow);
