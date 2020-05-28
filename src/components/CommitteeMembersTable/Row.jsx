import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import moment from 'moment';

import Avatar from '../Avatar';
import MemberInfo from './MemberInfo';

import URLHelper from '../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH, SSR_TRANSACTION_INFORMATION_PATH } from '../../constants/RouterConstants';
import {
	CANDIDATE_COMMITTEE_GRID,
	CURRENT_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';

import ddIcon from '../../public/images/icons/curret-sm.svg';

const MembersRow = ({
	index, data, type,
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
				<td className="number"><div className="td-in">{index + 1}</div></td>
				{type === DEACTIVATED_COMMITTEE_GRID &&
				<td className="abandon">
					<div className="td-in">
						<span>{data.abandon ? transformDate(data.abandon) : '-'}</span>
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
				{type === CURRENT_COMMITTEE_GRID &&
				<td className="participation">
					<div className="td-in">
						<span>
							{data.participation ? transformDate(data.participation) : '-'}
						</span>
					</div>
				</td>}
				{type === CANDIDATE_COMMITTEE_GRID &&
				<td className="confirmations">
					<div className="td-in">
						<span>{data.confirmations ? data.confirmations : 0}</span>
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
				{type === CURRENT_COMMITTEE_GRID &&
				<td className="last-operation">
					<img src={ddIcon} alt="" className="toggle-icon" />
					{data.lastOperation ?
						<Link href={SSR_TRANSACTION_INFORMATION_PATH} as={URLHelper.transformEchodbOperationLinkToExplorerLink(data.lastOperation.link)}>
							<a href={URLHelper.transformEchodbOperationLinkToExplorerLink(data.lastOperation.link)} className="td-in" rel="noopener noreferrer">
								<span>{data.lastOperation.type}</span>
							</a>
						</Link> :
						<div className="td-in">
							<span>-</span>
						</div>
					}
				</td>}
				{(type === CANDIDATE_COMMITTEE_GRID || type === DEACTIVATED_COMMITTEE_GRID) &&
				<td className="last-operation">
					<img src={ddIcon} alt="" className="toggle-icon" />
					{data.proposalTransaction ?
						<Link href={SSR_TRANSACTION_INFORMATION_PATH} as={URLHelper.transformEchodbOperationLinkToExplorerLink(data.proposalTransaction)}>
							<a href={URLHelper.transformEchodbOperationLinkToExplorerLink(data.proposalTransaction)} className="td-in" rel="noopener noreferrer">
								<span>
									{URLHelper.compileFullUrlFromOriginAndPath(URLHelper.transformEchodbOperationLinkToExplorerLink(data.proposalTransaction))}
								</span>
							</a>
						</Link> :
						<div className="td-in">
							<span>-</span>
						</div>}
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
	type: PropTypes
		.oneOf([CURRENT_COMMITTEE_GRID, CANDIDATE_COMMITTEE_GRID, DEACTIVATED_COMMITTEE_GRID])
		.isRequired,
};

export default memo(MembersRow);
