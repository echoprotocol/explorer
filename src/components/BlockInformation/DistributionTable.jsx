import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import URLHelper from '../../helpers/URLHelper';

import Avatar from '../Avatar';
import Thead from './Thead';


class DistributionTable extends React.Component {

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
						<Link
							className="td-in"
							to={URLHelper.createAccountUrlByName(producer)}
							onClick={(e) => e.stopPropagation()}
						>
							<Avatar accountName={producer} />
							<span>{producer}</span>
						</Link>
					</td>
					<td className="delegate">
						<React.Fragment>
							{
								delegate ? (
									<Link
										className="td-in"
										to={URLHelper.createAccountUrlByName(delegate)}
										onClick={(e) => e.stopPropagation()}
									>
										<Avatar accountName={producer} />
										<span>{delegate}</span>
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
