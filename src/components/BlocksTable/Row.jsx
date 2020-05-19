import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import cn from 'classnames';
import moment from 'moment';
import Tooltip from 'rc-tooltip';

import Avatar from '../Avatar';
import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';
import { SSR_ACCOUNTS_PATH } from '../../constants/RouterConstants';

const OperationsRow = React.memo(({
	number, producer, reward, rewardCurrency, size, txs, onClick, time, isLastByDay, isAllBlocks,
}) => {
	const producerLink = URLHelper.createAccountUrlByName(producer);
	const goToAccount = (e) => {
		e.preventDefault();
		e.stopPropagation();
		Router.push(SSR_ACCOUNTS_PATH, producerLink);
	};
	const date = FormatHelper.getBlockDateByTimestamp(time);
	const age = FormatHelper.getBlockTimeByTimestamp(time);

	const diffInSeconds = moment().diff(moment.utc(time), 'seconds');
	const diffInHours = moment().diff(moment.utc(time), 'hours');
	const diffInMinutes = moment.utc(moment.duration(diffInSeconds, 'seconds').asMilliseconds()).format('m');

	const renderTime = (diff) => {
		if (diff < 60) {
			return (
				<Tooltip
					placement="rightBottom"
					mouseLeaveDelay={0}
					trigger={['hover']}
					overlay={`${date} ${age}`}
					overlayStyle={{ pointerEvents: 'none' }}
				>
					<span className="age-value">just now</span>
				</Tooltip>

			);
		}
		if (!diff < 60 && diff < 86400) {
			return (
				<Tooltip
					placement="rightBottom"
					mouseLeaveDelay={0}
					trigger={['hover']}
					overlay={`${date} ${age}`}
					overlayStyle={{ pointerEvents: 'none' }}
				>
					<span className="age-value">
						{diffInHours !== 0 && `${diffInHours}hr `}
						{diffInHours !== 0 ?
							<span className="age-value">
								{`${diffInMinutes}min ago`}
							</span> :
							<span className="age-value">
								{`${diffInMinutes} min ago`}
							</span>
						}
					</span>
				</Tooltip>
			);
		}
		return (
			<Tooltip
				placement="rightBottom"
				mouseLeaveDelay={0}
				trigger={['hover']}
				overlay={`${date} ${age}`}
				overlayStyle={{ pointerEvents: 'none' }}
			>
				<span>
					{isLastByDay && <span className="age-hint">{date},&nbsp;</span>}
					<span className="age-value">{age}</span>
				</span>
			</Tooltip>
		);
	};

	return (
		<React.Fragment>
			<tr onClick={onClick} className={cn('view')}>
				<td className="number"><div className="td-in">{number}</div></td>
				<td className="age">
					<div className="td-in">
						{renderTime(diffInSeconds)}
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
				{isAllBlocks &&
				<td className="reward">
					<div className="td-in">
						<span className="value">{reward}</span>
						<span className="currency">{rewardCurrency}</span>
					</div>
				</td> }
				<td className="size"><div className="td-in">{size.weight} {size.weightSize}</div></td>
				<td className="txs"><div className="td-in">{txs}</div></td>
			</tr>
		</React.Fragment>
	);
});

OperationsRow.propTypes = {
	number: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	producer: PropTypes.string.isRequired,
	reward: PropTypes.string.isRequired,
	rewardCurrency: PropTypes.string.isRequired,
	size: PropTypes.object.isRequired,
	txs: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	isLastByDay: PropTypes.bool.isRequired,
	isAllBlocks: PropTypes.bool,
};

OperationsRow.defaultProps = {
	isAllBlocks: false,
};
export default OperationsRow;
