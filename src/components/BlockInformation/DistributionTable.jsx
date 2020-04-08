import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import URLHelper from '../../helpers/URLHelper';

import Thead from './Thead';

import { SSR_ACCOUNTS_PATH } from '../../constants/RouterConstants';
import Avatar from '../Avatar';

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
							<a href="" className="td-in" onClick={(e) => this.onClick(e, producer)}>
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
										<a href="" className="td-in" onClick={(e) => this.onClick(e, delegate)}>
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
			<div className="distribution-table">
				<PerfectScrollbar>
					<table>
						<Thead />
						<tbody>
							<tr className="air" />
							{ rewards.map((r, i) => this.renderRow(r, i)) }
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
