import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import classnames from 'classnames';
import _ from 'lodash';
import { validators } from 'echojs-lib';

import ddIcon from '../../assets/images/icons/curret-sm.svg';

import Avatar from '../Avatar';
import OperationInfo from './OperationInfo';
import ObjectInfo from './ObjectInfo';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

class OperationRow extends React.Component {

	getColSpan(matches) {
		const { isBlock } = this.props;

		if (isBlock) {
			return !matches ? 7 : 6;
		}
		return !matches ? 8 : 7;
	}

	render() {
		const {
			operation: {
				id,
				mainInfo,
				objectInfo,
				blockNumber: block,
				trIndex: transactionNum,
				number,
				...detailInfo
			},
			index,
			active,
			timestamp,
			fee,
			air,
		} = this.props;

		this.props.tableRefs[index] = React.createRef();

		return (
			<React.Fragment>
				<tr
					className={classnames('view', { active })}
					onClick={() => this.props.toggleOperationDetails(index)}
					ref={this.props.tableRefs[index]}
				>
					<td />
					<Media query="(max-width: 767px)">
						{(matches) => !matches && (
							<td className="number">
								<div className="td-in">{number !== '' ? `${number || index + 1}.` : null}</div>
							</td>
						)}
					</Media>
					<td className="type">
						<Media query="(max-width: 767px)">
							{ (matches) => matches &&
								<React.Fragment>

									<div className="col-title">
										<span className="index">#</span>
										<span>Type</span>
									</div>
									<span className="index">{index + 1}</span>
								</React.Fragment>
							}
						</Media>
						<div className="td-in">
							{detailInfo.type}
						</div>
					</td>
					{/* FOR ACCOUNT AND CONTRACT */}
					{
						timestamp ? (
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
						) : null
					}
					<td className="sender">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Sender</div>}
						</Media>
						<Link className="td-in avatar-wrap" to={URLHelper.createAccountUrl(mainInfo.from.name)} onClick={(e) => e.stopPropagation()}>
							<Avatar accountName={mainInfo.from.name} />
							<span>{mainInfo.from.name}</span>
						</Link>
					</td>
					<td className="reciever">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Reciever</div>}
						</Media>
						{
							(mainInfo.subject && mainInfo.subject.name) ?
								<Link
									className="td-in avatar-wrap"
									to={
										validators.isAccountId(mainInfo.subject.id) ?
											URLHelper.createAccountUrl(mainInfo.subject.name) :
											URLHelper.createUrlById(mainInfo.subject.id)
									}
									onClick={(e) => e.stopPropagation()}
								>
									{
										mainInfo.subject && validators.isAccountId(mainInfo.subject.id) &&
										<Avatar accountName={mainInfo.subject.name} />
									}
									<span>{mainInfo.subject && mainInfo.subject.name}</span>
								</Link> : '—'
						}
					</td>
					<td className="amount">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Amount</div>}
						</Media>
						{
							mainInfo.value.amount ?
								<div className="td-in">
									<span
										className="value"
									>{FormatHelper.formatAmount(mainInfo.value.amount, mainInfo.value.precision)}
									</span>
									<span className="currency">{mainInfo.value.symbol}</span>
								</div> : '—'
						}
					</td>
					{
						fee ? (
							<Media query="(max-width: 1000px)">
								{
									(matches) => (!matches && (
										<td className="fee">
											<div className="td-in">
												<span className="value">{FormatHelper.formatAmount(detailInfo.fee.amount, detailInfo.fee.precision)}</span>
												<span className="currency">{detailInfo.fee.symbol}</span>
											</div>
										</td>
									))
								}
							</Media>
						) : null
					}
					<td className="rezult">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Result</div>}
						</Media>
						{
							(mainInfo.result && !_.isEmpty(mainInfo.result)) ?
								<Link to={URLHelper.createUrlById(mainInfo.result)} className="td-in" onClick={(e) => e.stopPropagation()}>{mainInfo.result}</Link>
								: '—'
						}
					</td>
					<td className="json">
						<Media query="(max-width: 767px)">
							{ (matches) => matches && <div className="col-title">Json</div>}
						</Media><Link
							to={URLHelper.createOperationObjectsUrl(block, transactionNum + 1, index + 1)}
							onClick={(e) => e.stopPropagation()}
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
				{
					active &&
					<tr className="fold">
						<td colSpan="2" />
						<Media query="(max-width: 1000px)">
							{
								(matches) => (
									<React.Fragment>
										<td colSpan={this.getColSpan(matches)}>
											<OperationInfo details={detailInfo} index={index} block={block} transaction={transactionNum} />
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
				{
					air &&
					<tr className="air">
						<td colSpan="9" />
					</tr>
				}
			</React.Fragment>
		);
	}

}


OperationRow.propTypes = {
	isBlock: PropTypes.bool,
	timestamp: PropTypes.bool.isRequired,
	fee: PropTypes.bool.isRequired,
	operation: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired,
	air: PropTypes.bool.isRequired,
	tableRefs: PropTypes.array.isRequired,
	toggleOperationDetails: PropTypes.func.isRequired,
};

OperationRow.defaultProps = {
	isBlock: false,
};


export default OperationRow;
