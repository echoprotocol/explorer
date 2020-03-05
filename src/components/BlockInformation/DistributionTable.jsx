import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import URLHelper from '../../helpers/URLHelper';

// import classnames from 'classnames';

import InfoTooltip from '../InfoTooltip';

class DistributionTable extends React.Component {

	renderRow({
		type, delegate, producer, producedByCommittee,
	}, index) {

		return (
			<React.Fragment key={index}>
				<tr className="view">
					<td />
					<td className="reward">
						<Media query="(max-width: 499px)">
							{(matches) => matches && <div className="col-title">role</div>}
						</Media>
						<div className="td-in">
							<span className="type">{type}</span>
						</div>
					</td>

					<td className="origin">
						<Media query="(max-width: 499px)">
							{(matches) => matches && <div className="col-title">origin</div>}
						</Media>
						<Link
							className="td-in"
							to={URLHelper.createAccountUrlByName(producer)}
							onClick={(e) => e.stopPropagation()}
						>
							<span>{producer}</span>
						</Link>
					</td>
					<td className="delegate">
						<React.Fragment>
							<Media query="(max-width: 499px)">
								{(matches) => matches && <div className="col-title">delegate</div>}
							</Media>
							{
								delegate ? (
									<Link
										className="td-in"
										to={URLHelper.createAccountUrlByName(delegate)}
										onClick={(e) => e.stopPropagation()}
									>
										<span>{delegate}</span>
									</Link>
								) : (
									<div className="td-in">—</div>
								)
							}
						</React.Fragment>
					</td>
					<td className="reward">
						<Media query="(max-width: 499px)">
							{(matches) => matches && <div className="col-title">Produced by the committee</div>}
						</Media>
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
			<React.Fragment>
				<div className="distribution-table accordion-table-wrap" >
					<table>
						<Media query="(max-width: 499px)">
							{(matches) => !matches &&
								<thead>
									<tr>
										<td />
										<td className="role">
											<div className="td-in">role</div>
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
										<td className="delegate">
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
							}
						</Media>
						<tbody>
							<Media query="(max-width: 499px)">
								{
									(matches) =>
										(!matches &&
											<tr className="air">
												<td colSpan="9" />
											</tr>)
								}
							</Media>
							{
								rewards.map((r, i) => this.renderRow(r, i))
							}
						</tbody>
					</table>
				</div>
			</React.Fragment>
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
