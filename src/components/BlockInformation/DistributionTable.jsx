import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import URLHelper from '../../helpers/URLHelper';

import Avatar from '../Avatar';

import InfoTooltip from '../InfoTooltip';
import { SSR_ACCOUNTS_PATH } from '../../constants/RouterConstants';

class DistributionTable extends React.Component {

	onClick(e, producer) {
		e.preventDefault();
		e.stopPropagation();
		Router.push(SSR_ACCOUNTS_PATH, URLHelper.createAccountUrlByName(producer));
	}

	renderRow({
		type, delegate, producer, producedByCommittee,
	}, index) {

		return (
			<React.Fragment key={index}>
				<tr className="view">
					<td />
					<td className="role">
						<div className="td-in">
							<span className="type">{type}</span>
						</div>
					</td>

					<td className="origin">
						<Link href={SSR_ACCOUNTS_PATH}>
							<a className="td-in" onClick={(e) => this.onClick(e, producer)}>
								<Avatar accountName={producer} />
								<span>{producer}</span>
							</a>
						</Link>
					</td>
					<td className="delegate">
						<React.Fragment>
							{
								delegate ? (
									<Link href={SSR_ACCOUNTS_PATH}>
										<a className="td-in" onClick={(e) => this.onClick(e, delegate)}>
											<Avatar accountName={producer} />
											<span>{delegate}</span>
										</a>
									</Link>
								) : (
									<div className="td-in">—</div>
								)
							}
						</React.Fragment>
					</td>
					<td className="produced">
						<div className="td-in">
							<span className="currency">{producedByCommittee ? 'Yes' : 'No'}</span>
						</div>
					</td>
					<td />
				</tr>
			</React.Fragment>
		);
	}

	render() {

		const { rewards } = this.props;

		return (
			<div className="distribution-table accordion-table-wrap" >
				<PerfectScrollbar>
					<table>
						<thead>
							<tr>
								<td />
								<td className="role">
									<div className="td-in">Role</div>
								</td>
								<td className="origin">
									<div className="td-in">
										Origin
										<InfoTooltip
											tooltipText="Account selected by consensus as a participant for the current block preparation"
										/>
									</div>
								</td>
								<td className="delegate">
									<div className="td-in">
										Delegate
										<InfoTooltip
											tooltipText="An account that has been trusted to issue messages on behalf of the Origin. Only considered if there are no messages from the original participant"
										/>
									</div>
								</td>
								<td className="produced">
									<div className="td-in">
										Produced by the committee
										<InfoTooltip
											tooltipText="If Origin and Delegate did not send messages, the message will be sent by the committee"
										/>
									</div>
								</td>
								<td />
							</tr>
						</thead>
						<tbody>
							<tr colSpan="11" className="air" />
							{
								rewards.map((r, i) => this.renderRow(r, i))
							}
						</tbody>
					</table>
				</PerfectScrollbar>
			</div>
		);
	}

}

DistributionTable.propTypes = {
	rewards: PropTypes.array,
};

DistributionTable.defaultProps = {
	rewards: [],
};

export default DistributionTable;
