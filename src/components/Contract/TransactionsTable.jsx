import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import classnames from 'classnames';
// import _ from 'lodash';

import ddIcon from '../../assets/images/icons/curret-sm.svg';

import Avatar from '../Avatar';
// import OperationInfo from './OperationInfo';
// import ObjectInfo from './ObjectInfo';
// import URLHelper from '../../helpers/URLHelper';
// import FormatHelper from '../../helpers/FormatHelper';

class TransactionsTable extends React.Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		showedOperations: [],
	// 		airRows: [],
	// 	};
	// }

	// componentDidMount() {
	// 	const { showedOperations } = this.state;
	// 	const { queryProps } = this.props;
	// 	if (!queryProps.op) {
	// 		return;
	// 	}
	// 	const op = parseInt(queryProps.op, 10);
	// 	if (!this.props.tableRefs[op - 1]) {
	// 		return;
	// 	}
	// 	showedOperations.push(op - 1);
	// 	this.setState({ showedOperations }); // eslint-disable-line react/no-did-mount-set-state
	// }

	// componentDidUpdate(prevProps) {
	// 	const { queryProps } = this.props;
	// 	const { queryProps: prevQuery } = prevProps;

	// 	if (!queryProps.op && prevQuery.op) {
	// 		this.setState({ showedOperations: [] }); // eslint-disable-line react/no-did-update-set-state
	// 	}
	// }

	// toggleOperationDetails(index) {
	// 	const { url, queryProps } = this.props;
	// 	const { showedOperations, airRows } = this.state;
	// 	const v = showedOperations.indexOf(index);

	// 	if (v !== -1) {
	// 		showedOperations.splice(v, 1);

	// 		if (queryProps.op && parseInt(queryProps.op, 10) - 1 === index) {
	// 			this.props.history.push(url);
	// 		}

	// 		[index - 1, index].forEach((i) => {
	// 			const airIndex = airRows.indexOf(i);

	// 			if (airIndex !== -1) {
	// 				airRows.splice(airIndex, 1);
	// 			}
	// 		});
	// 	} else {
	// 		showedOperations.push(index);
	// 		this.props.history.push(URLHelper.createTransactionOperationUrl(url, index + 1));
	// 	}

	// 	if (showedOperations.includes(index) && airRows.indexOf(index - 1) === -1) {
	// 		airRows.push(index - 1);
	// 	}

	// 	if (showedOperations.includes(index) && airRows.indexOf(index) === -1) {
	// 		airRows.push(index);
	// 	}

	// 	this.setState({ showedOperations, airRows });
	// }

	renderRowOperation() {
		// const { mainInfo, objectInfo, ...detailInfo } = operation;
		// const { showedOperations, airRows } = this.state;
		// const { block, transactionNum } = this.props;

		// const subjectValue = mainInfo.subject && (mainInfo.subject.name || mainInfo.subject.id);
		// this.props.tableRefs[index] = React.createRef();

		return (
			<React.Fragment>
				{/* key={index.toString()} */}
				<tr
					className={classnames('view active')}
					// { active: showedOperations.includes(index)}
					// onClick={() => this.toggleOperationDetails(index)}
					// ref={this.props.tableRefs[index]}
				>
					<td />
					<Media query="(max-width: 767px)">
						{ (matches) => !matches &&
							<td className="number">
								<div className="td-in">
									{/* {index + 1}. */}1.
								</div>
							</td>
						}
					</Media>
					<td className="type">
						<Media query="(max-width: 767px)">
							{ (matches) => matches &&
								<React.Fragment>
									<div className="col-title">
										<span className="index">#</span>
										<span>Type</span>
									</div>
									<span className="index">
										{/* {index + 1} */}1.
									</span>
								</React.Fragment>
							}
						</Media>
						<div className="td-in">
						Call contract
							{/* {operation.type} */}
						</div>
					</td>

					<td className="time">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">DATA, TIME</div>}
						</Media>
						<div className="td-in">
							<span>
								12.03.19 15:43
							</span>
						</div>
					</td>
					<td className="sender">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Sender</div>}
						</Media>
						<Link
							className="td-in avatar-wrap"
							to="#"
							// to={URLHelper.createAccountUrl(mainInfo.from.name)}
							// onClick={(e) => e.stopPropagation()}
						>
							<Avatar />
							{/* accountName={mainInfo.from.name}  */}
							<span>
								{/* {mainInfo.from.name} */}
								gauto01
							</span>
						</Link>
					</td>
					<td className="reciever">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Reciever</div>}
						</Media>
						{
						// (subjectValue) ?
							<Link
								className="td-in avatar-wrap"
								to="#"
								// to={URLHelper.createUrlById(subjectValue)}
								// onClick={(e) => e.stopPropagation()}
							>
								{/* {mainInfo.subject.name && <Avatar accountName={subjectValue} />} */}
								<span>
									{/* {subjectValue} */}
									—
								</span>
							</Link>
							// : '—'
						}
					</td>
					<td className="amount">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Amount</div>}
						</Media>
						{
						// mainInfo.value.amount ?
							<div className="td-in">
								<span className="value">
									532.000082..
									{/* {FormatHelper.formatAmount(mainInfo.value.amount, mainInfo.value.precision)} */}
								</span>
								<span className="currency">
									ECHO
									{/* {mainInfo.value.symbol} */}
								</span>
							</div>
							// : '—'
						}
					</td>
					<td className="rezult">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Result</div>}
						</Media>
						{
						// (mainInfo.result && !_.isEmpty(mainInfo.result)) ?
							<Link
								to="#"
								// to={URLHelper.createUrlById(mainInfo.result)}
								className="td-in"
								// onClick={(e) => e.stopPropagation()}
							>
								{/* {mainInfo.result} */}
								1.15.3
							</Link>
							// : '—'
						}
					</td>
					<td className="json">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Json</div>}
						</Media><Link
							to="#"
							// to={URLHelper.createOperationObjectsUrl(block, transactionNum, index + 1)}
							// onClick={(e) => e.stopPropagation()}
							className="td-in"
						/>
					</td>
					<td className="dd">
						<div className="td-in">
							<img src={ddIcon} alt="" />
						</div>
					</td>
					<td />
					
				</tr>
				
				<tr class="fold">
					<td />
					<Media query="(max-width: 1000px)">
							{
								(matches) => (
								<React.Fragment>										
										<td colSpan={!matches ? 9 : 8}>
											<div class="fold-operation-info">
												<div class="fold-title">Operation info</div>
												<div class="operation-detail-table">
													<div class="od-row">
														<div class="od-col">type</div>
														<div class="od-col">Contract call</div>
													</div>
													<div class="od-row">
														<div class="od-col">fee</div>
														<div class="od-col">0.00000223 ECHO</div>
													</div>
														<div class="od-row">
															<div class="od-col">registrar</div>
															<div class="od-col"><a class="avatar-wrap" href="/accounts/1.2.80/info"><span>sdasd-asd</span></a></div>
														</div>
													<div class="od-row">
														<div class="od-col">value</div>
														<div class="od-col">0 ECHO</div>
													</div>
													<div class="od-row">
														<div class="od-col">bytecode</div>
														<div class="od-col">
															<div class="mono">5c19a95c0000000000000000000000000000000000000000000000000000000000000001</div>
															<button class="copy-bytecode">Copy</button>
														</div>
													</div>
													<div class="od-row">
														<div class="od-col">contract id</div>
														<div class="od-col"><a class="" href="/contracts/1.9.1/info/"><span>1.9.1</span></a></div>
													</div>
													<div class="od-row">
														<div class="od-col">token transfers</div>
														<div class="od-col">
															<div class="token-transfer-table"></div>
														</div>
													</div>
													<div class="od-row">
														<div class="od-col">excepted</div>
														<div class="od-col">None</div>
													</div>
													<div class="od-row">
														<div class="od-col">code deposit</div>
														<div class="od-col">None</div>
													</div>
												</div>
											</div>
											<div class="fold-operation-info">
												<div class="fold-title">Object: contract</div>
												<div class="operation-detail-table">
													<div class="od-row"><div class="od-col">ID:</div>
													<div class="od-col"><a href="/contracts/1.9.1/info/">1.9.1</a></div>
												</div>
													<div class="od-row">
														<div class="od-col">Contract type:</div>
														<div class="od-col">—</div>
													</div>
													<div class="od-row">
														<div class="od-col">Supported asset:</div>
														<div class="od-col">None</div>
													</div>
													<div class="od-row">
														<div class="od-col">Eth Accuracy:</div>
														<div class="od-col">No</div>
													</div>
													<div class="od-row">
														<div class="od-col">ERC20:</div>
														<div class="od-col">No</div>
													</div>
													<div class="od-row bytecode">
														<div class="od-col">Bytecode:<button class="copy-bytecode">Copy code</button></div>
														<div class="od-col">
															<div class="mono">608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635c19a95c14610067578063609ff1bd146100aa5780639e7b8d61146100db578063b3f98adc1461011e575b600080fd5b34801561007357600080fd5b506100a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061014e565b005b3480156100b657600080fd5b506100bf6104a0565b604051808260ff1660ff16815260200191505060405180910390f35b3480156100e757600080fd5b5061011c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061051c565b005b34801561012a57600080fd5b5061014c60048036..</div>
															<button class="text-button">Expand</button>
														</div>
													</div>
												</div>
											</div>
										</td>										
									</React.Fragment>
								)
							}
						</Media>
						<td />
								</tr>
				{/* airRows.includes(index) && */}
					<tr className="air">
						<td colSpan="9" />
					</tr>
				{/* {
					// showedOperations.includes(index) &&
					<tr className="fold">
						<Media query="(max-width: 767px)">
							{(matches) => !matches && <td />}
						</Media>

						<Media query="(max-width: 1000px)">
							{
								(matches) => (
									<React.Fragment>
										<td colSpan={!matches ? 7 : 6}>
										!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! изменить на 8:9
											<OperationInfo details={detailInfo} index={index} />
											<ObjectInfo details={detailInfo} object={objectInfo} />
										</td>
										<Media query="(max-width: 767px)">
											{(matchesIn) => !matchesIn && <td />}
										</Media>
									</React.Fragment>
								)
							}
						</Media>
					</tr>
				}
				 */}
			</React.Fragment>
		);
	}

	render() {
		// const { operations } = this.props;

		return (
			<div className="accordion-table-wrap table-contract">
				<table>
					<Media query="(max-width: 767px)">
						{ (matches) => !matches &&
							<thead>
								<tr>
									<td />
									<td className="number"><div className="td-in">#</div></td>
									<td className="type"><div className="td-in">Type</div></td>
									<td className="time"><div className="td-in">data, time</div></td>
									<td className="sender"><div className="td-in">Sender</div></td>
									<td className="reciever"><div className="td-in">Reciever</div></td>
									<td className="amount"><div className="td-in">Amount</div></td>
									<td className="rezult"><div className="td-in">Result</div></td>
									<td className="json"><div className="td-in">JSON</div></td>
									<td className="dd" />
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
						{this.renderRowOperation()}
						{/* {operations ? operations.map((op, i) => this.renderRowOperation(op, i)) : null} */}
					</tbody>
				</table>
			</div>
		);
	}

}


// TransactionsTable.propTypes = {
// 	block: PropTypes.string.isRequired,
// 	transactionNum: PropTypes.string.isRequired,
// 	url: PropTypes.string.isRequired,
// 	tableRefs: PropTypes.array.isRequired,
// 	operations: PropTypes.object.isRequired,
// 	history: PropTypes.object.isRequired,
// 	queryProps: PropTypes.object.isRequired,
// };

export default TransactionsTable;
