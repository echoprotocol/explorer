import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import ddIcon from '../../assets/images/icons/curret-sm.svg';

import Avatar from '../Avatar';
import OperationInfo from './OperationInfo';
import ObjectContract from './ObjectContract';

class OperationsTable extends React.Component {

	showOperationDetails() {
		console.log('toggle class active');
	}

	render() {

		return (
			<div className="accordion-table-wrap">
				<table>
					<Media query="(max-width: 767px)">
						{ (matches) => !matches &&
							<thead>
								<tr>
									<td className="number"><div className="td-in">#</div></td>
									<td className="type"><div className="td-in">Type</div></td>
									<td className="sender"><div className="td-in">Sender</div></td>
									<td className="reciever"><div className="td-in">Reciever</div></td>
									<td className="amount"><div className="td-in">Amount</div></td>
									<Media query="(max-width: 1000px)">
										{
											(matchesIn) =>
												(!matchesIn && <td className="fee"><div className="td-in">Operation fee</div></td>)
										}
									</Media>

									<td className="rezult"><div className="td-in">Result</div></td>
									<td className="json"><div className="td-in">JSON</div></td>
									<td className="dd" />
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

						<tr
							className="view"
							onClick={(e) => this.showOperationDetails(e)}
						>
							<Media query="(max-width: 767px)">
								{ (matches) => !matches && <td className="number"><div className="td-in">1.</div></td> }
							</Media>

							<td className="type">
								<Media query="(max-width: 767px)">
									{ (matches) => matches &&
										<React.Fragment>

											<div className="col-title">
												<span className="index">#</span>
												<span>Type</span>
											</div>
											<span className="index">1</span>
										</React.Fragment>
									}
								</Media>
								<div className="td-in">
									Call contract
								</div>
							</td>
							<td className="sender">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Sender</div>}
								</Media>
								<Link className="td-in avatar-wrap" to="/">
									<Avatar accountName="guato" />
									<span>guato</span>
								</Link>
							</td>
							<td className="reciever">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Reciever</div>}
								</Media>
								<div className="td-in">—</div>
							</td>
							<td className="amount">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Amount</div>}
								</Media>
								<div className="td-in">
									<span className="value">0.003223245</span>
									<span className="currency">ECHO</span>
								</div>
							</td>
							<Media query="(max-width: 1000px)">
								{
									(matches) =>
										(!matches &&
										<td className="fee">
											<div className="td-in">
												<span className="value">0.003223245</span>
												<span className="currency">ECHO</span>
											</div>
										</td>)
								}
							</Media>
							<td className="rezult">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Rezult</div>}
								</Media>
								<Link to="/" className="td-in">1.15.3</Link>
							</td>
							<td className="json">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Json</div>}
								</Media>
								—
							</td>
							<td className="dd">
								<div className="td-in">
									<img src={ddIcon} alt="" />
								</div>
							</td>
						</tr>

						<tr
							className="view active"
							onClick={(e) => this.showOperationDetails(e)}
						>
							<Media query="(max-width: 767px)">
								{ (matches) => !matches && <td className="number"><div className="td-in">2.</div></td> }
							</Media>
							<td className="type">
								<Media query="(max-width: 767px)">
									{ (matches) => matches &&
										<React.Fragment>

											<div className="col-title">
												<span className="index">#</span>
												<span>Type</span>
											</div>
											<span className="index">2</span>
										</React.Fragment>
									}
								</Media>
								<div className="td-in">
									Call contract
								</div>
							</td>
							<td className="sender">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Sender</div>}
								</Media>
								<Link className="td-in avatar-wrap" to="/">
									<Avatar accountName="guato" />
									<span>guato</span>
								</Link>
							</td>
							<td className="reciever">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Reciever</div>}
								</Media>
								<Link className="td-in avatar-wrap" to="/">
									<Avatar accountName="g1sddsuato" />
									<span>g1sddsuato</span>
								</Link>
							</td>
							<td className="amount">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Amount</div>}
								</Media>
								<div className="td-in">
									<span className="value">0.003223245</span>
									<span className="currency">ECHO</span>
								</div>
							</td>
							<Media query="(max-width: 1000px)">
								{
									(matches) =>
										(!matches &&
										<td className="fee">
											<div className="td-in">
												<span className="value">0.003223245</span>
												<span className="currency">ECHO</span>
											</div>
										</td>)
								}
							</Media>
							<td className="rezult">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Rezult</div>}
								</Media>
								<Link to="/" className="td-in">1.15.3</Link>
							</td>
							<td className="json">
								<Media query="(max-width: 767px)">
									{ (matches) => matches && <div className="col-title">Json</div>}
								</Media><Link to="/" className="td-in" />
							</td>
							<td className="dd">
								<div className="td-in">
									<img src={ddIcon} alt="" />
								</div>
							</td>
						</tr>
						<tr className="fold">
							<Media query="(max-width: 767px)">
								{ (matches) => !matches && <td />}
							</Media>

							<Media query="(max-width: 1000px)">
								{
									(matches) => (
										<React.Fragment>
											<td colSpan={!matches ? 7 : 6}>
												<OperationInfo />
												<ObjectContract />
											</td>
											<Media query="(max-width: 767px)">
												{ (matchesIn) => !matchesIn && <td />}
											</Media>
										</React.Fragment>
									)
								}
							</Media>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

}


OperationsTable.propTypes = {};

export default OperationsTable;
