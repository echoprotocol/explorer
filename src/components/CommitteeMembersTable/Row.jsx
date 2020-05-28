import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import moment from 'moment';

import Avatar from '../Avatar';
import MemberInfo from './MemberInfo';

import URLHelper from '../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH } from '../../constants/RouterConstants';

import ddIcon from '../../public/images/icons/curret-sm.svg';

const MembersRow = ({
	index, data,
}) => {
	const [isInfoActive, setInfoActive] = useState(false);

	const transformDate = (timeStamp) => {
		const participationHours = moment().diff(moment.utc(timeStamp), 'hours');
		const participationDays = moment().diff(moment.utc(timeStamp), 'days');
		const remainingHours = moment.utc(moment.duration(participationHours, 'hours').asMilliseconds()).format('h');
		if (participationHours < 1) {
			return '<1h';
		}
		if (participationHours < 24) {
			return `${participationHours}h`;
		}
		if (participationHours > 24 && remainingHours === 0) {
			return `${participationDays}d`;
		}
		return `${participationDays}d ${remainingHours}h`;
	};

	return (
		<React.Fragment>
			<tr onClick={() => setInfoActive(!isInfoActive)}className={cn('view', { active: isInfoActive })}>
				<td className="number"><div className="td-in">{index}</div></td>
				{data.abandon &&
				<td className="abandon">
					<div className="td-in">
						<span>{transformDate(data.abandon)}</span>
					</div>
				</td>}
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
						<span>
							{transformDate(data.participation)}
						</span>
					</div>
				</td>}
				{data.confirmations &&
				<td className="confirmations">
					<div className="td-in">
						<span>{data.confirmations}</span>
					</div>
				</td>
				}
				<td className="bitcoin-address">
					<a href={URLHelper.createBtcAddressOut(data.bitcoinHash)} className="td-in" target="_blank" rel="noopener noreferrer">
						{data.bitcoinHash}
					</a>
				</td>
				<td className="etherium-address">
					<a href={URLHelper.createEthAddressOut(data.etheriumHash)} className="td-in" target="_blank" rel="noopener noreferrer">
						{data.etheriumHash}
					</a>
				</td>
				<td className="id">
					<div className="td-in">
						<span>{data.id}</span>
					</div>
				</td>
				{data.lastOperation &&
				<td className="last-operation">
					<img src={ddIcon} alt="" className="toggle-icon" />
					<a href="#" className="td-in">
						<span>{data.lastOperation.type}</span>
					</a>
				</td>}
				{data.proposalTransaction &&
				<td className="last-operation">
					<img src={ddIcon} alt="" className="toggle-icon" />
					<a href="#" className="td-in">
						<span>{data.proposalTransaction}</span>
					</a>
				</td>}
			</tr>
			{
				isInfoActive &&
				<tr className="fold">
					<td colSpan="7">
						<div className="table-detail-header">
							<div className="table-detail-header__title">Committee member additional info</div>
						</div>
						<div className="table-detail-table">
							<MemberInfo data={data.additionalInfo} />
						</div>
					</td>
				</tr>
			}
		</React.Fragment>
	);

};

MembersRow.propTypes = {
	index: PropTypes.number.isRequired,
	data: PropTypes.object.isRequired,
};

export default memo(MembersRow);
