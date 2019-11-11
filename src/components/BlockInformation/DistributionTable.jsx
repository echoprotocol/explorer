import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
// import classnames from 'classnames';

import InfoTooltip from '../InfoTooltip';
import Avatar from '../Avatar';

class DistributionTable extends React.Component {

	renderRow() {
		return (
			<React.Fragment>
				<tr className="view">
					<td />
					<td className="role">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">role</div>}
						</Media>
						<div className="td-in">Producer</div>
					</td>

					<td className="origin">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">origin</div>}
						</Media>
						<Link
							className="td-in avatar-wrap"
							to="#"
							onClick={(e) => e.stopPropagation()}
						>
							<Avatar accountName="init 5" />
							<span>init 5</span>
						</Link>
					</td>
					<td className="delegate">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">delegate</div>}
						</Media>
						<Link
							className="td-in avatar-wrap"
							to="#"
							onClick={(e) => e.stopPropagation()}
						>
							<Avatar accountName="init 7" />
							<span>init 7</span>
						</Link>
					</td>
					<td className="reward">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">reward</div>}
						</Media>
						<div className="td-in">
							<span className="value"> 0.003245</span>
							<span className="currency">ECHO</span>
							<Media query="(min-width: 500px)">
								{(matches) => (!matches && <br />)}
							</Media>
							&nbsp;/&nbsp;
							<span className="value">0.003245</span>
							<span className="currency">ECHO</span>
						</div>
					</td>
					<td />
				</tr>
				{/* <tr className="air">
					<td colSpan="9" />
				</tr> */}
			</React.Fragment>
		);
	}

	render() {


		return (
			<React.Fragment>
				<h2>Reward distribution</h2>
				<div className="distribution-table accordion-table-wrap table-contract" >
					<table>
						<Media query="(max-width: 767px)">
							{ (matches) => !matches &&
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
										<td className="reward">
											<div className="td-in">ORIGIN/DELEGATE REWARD</div>
										</td>
										<td />
									</tr>
								</thead>
							}
						</Media>


						<tbody>
							<Media query="(max-width: 767px)">
								{
									(matches) =>
										(!matches &&
										<tr className="air">
											<td colSpan="9" />
										</tr>)
								}
							</Media>
							{this.renderRow()}
							{this.renderRow()}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	}

}


export default DistributionTable;
