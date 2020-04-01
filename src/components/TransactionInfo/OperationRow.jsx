import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';
import Tooltip from 'rc-tooltip';
import { validators } from 'echojs-lib';

import ddIcon from '../../public/images/icons/curret-sm.svg';

import Avatar from '../Avatar';
import OperationInfo from './OperationInfo';
import ObjectInfo from './ObjectInfo';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

class OperationRow extends React.Component {

	getColSpan(matches) {
		return !matches ? 8 : 7;
	}

	renderTransactionLink(block, transactionNum, index) {
		return (
			<Link
				to={URLHelper.createOperationObjectsUrl(block, transactionNum + 1, index + 1)}
				onClick={(e) => e.stopPropagation()}
				className="td-in"
			/>
		);
	}

	renderSubject(subject, mainInfo) {
		if (!subject) return <div className="td-in">—</div>;
		if (validators.isHex(subject) && subject.length === 40) return <span className="td-in">{subject}</span>;
		return (
			<Link
				className="td-in avatar-wrap"
				to={URLHelper.createUrlById(subject)}
				onClick={(e) => e.stopPropagation()}
			>
				{mainInfo.subject.name && <Avatar accountName={subject} />}
				<span>{subject}</span>
			</Link>
		);
	}

	renderAmount() {
		const { operation } = this.props;
		const { mainInfo } = operation;
		if (!mainInfo.value.amount) return <div className="td-in">—</div>;
		const assetAmount = FormatHelper.formatAmount(mainInfo.value.amount, mainInfo.value.precision);
		return (
			<div className="td-in">
				<span className="value">
					<Tooltip
						placement="top"
						overlayClassName="verify-contract-tooltip"
						trigger={['hover']}
						overlay={assetAmount}
					>
						<span className="txt">{assetAmount}</span>
					</Tooltip>
				</span>
				<span className="currency">{mainInfo.value.symbol}</span>
			</div>
		);
	}

	render() {
		const {
			operation: {
				id,
				mainInfo,
				objectInfo,
				blockNumber: block,
				trIndex: transactionNum,
				opIndex,
				number,
				blockTimestamp,
				...detailInfo
			},
			index,
			active,
			timestamp,
			fee,
			air,
		} = this.props;
		const objectId = objectInfo ? objectInfo.get('id') : null;
		this.props.tableRefs[index] = React.createRef();
		const subjectValue = mainInfo.subject && (mainInfo.subject.name || mainInfo.subject.id);

		const tip = (
			<React.Fragment>
				<p>
					View raw JSON object
				</p>
			</React.Fragment>
		);

		const tooltipStyle = {
			width: 175,
		};

		return (
			<React.Fragment>
				<tr
					className={classnames('view', { active })}
					onClick={() => this.props.toggleOperationDetails(index)}
					ref={this.props.tableRefs[index]}
				>
					<td />
					<td className="number">
						<div className="td-in">{number !== '' ? `${number || index + 1}.` : null}</div>
					</td>
					<td className="type">
						<div className="td-in">
							{detailInfo.type}
						</div>
					</td>
					{/* FOR ACCOUNT AND CONTRACT */}
					{
						timestamp ? (
							<td className="time">
								<div className="td-in">
									<span>
										{FormatHelper.timestampToOperationRowTime(blockTimestamp)}
									</span>
								</div>
							</td>
						) : null
					}
					<td className="sender">
						{mainInfo.from.id ?
							<Link className="td-in avatar-wrap" to={!mainInfo.from.name && validators.isContractId(mainInfo.from.id) ? URLHelper.createContractUrl(mainInfo.from.id) : URLHelper.createAccountUrl(mainInfo.from.name)} onClick={(e) => e.stopPropagation()}>
								{mainInfo.from.name ? <Avatar accountName={mainInfo.from.name} /> : null}
								<span>{mainInfo.from.name ? mainInfo.from.name : mainInfo.from.id}</span>
							</Link> : <div className="td-in">—</div>
						}
					</td>
					<td className="reciever">
						{this.renderSubject(subjectValue, mainInfo)}
					</td>
					<td className="amount">
						{this.renderAmount()}
					</td>
					{
						fee ? (

							<td className="fee">
								<div className="td-in">
									<span className="value">
										<Tooltip
											placement="top"
											overlayClassName="verify-contract-tooltip"
											trigger={['hover']}
											overlay={FormatHelper.formatAmount(detailInfo.fee.amount, detailInfo.fee.precision)}
										>
											<span className="txt">{FormatHelper.formatAmount(detailInfo.fee.amount, detailInfo.fee.precision)}</span>
										</Tooltip>
									</span>
									<span className="currency">{detailInfo.fee.symbol}</span>
								</div>
							</td>

						) : null
					}
					<td className="rezult">
						{
							(mainInfo.result && !_.isEmpty(mainInfo.result)) ?
								<Link to={URLHelper.createUrlById(mainInfo.result)} className="td-in" onClick={(e) => e.stopPropagation()}>{mainInfo.result}</Link>
								: <div className="td-in">—</div>
						}
					</td>
					<td className="json">
						{
							mainInfo.from.name ? (
								<Tooltip
									placement="top"
									trigger={['hover']}
									overlay={tip}
									overlayStyle={tooltipStyle}
									overlayClassName="verify-contract-tooltip"
								>
									{this.renderTransactionLink(block, transactionNum, opIndex)}
								</Tooltip>
							) : <div className="td-in">—</div>
						}
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
						<td colSpan="1" />
						<React.Fragment>
							<td colSpan="9">
								<OperationInfo
									details={detailInfo}
									index={index}
									block={block}
									transaction={transactionNum}
									opIndex={opIndex}
									objId={objectId}
								/>
								<ObjectInfo details={detailInfo} object={objectInfo} />
							</td>
						</React.Fragment>
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
	timestamp: PropTypes.bool.isRequired,
	fee: PropTypes.bool.isRequired,
	operation: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired,
	air: PropTypes.bool.isRequired,
	tableRefs: PropTypes.array.isRequired,
	toggleOperationDetails: PropTypes.func.isRequired,
};


export default OperationRow;
