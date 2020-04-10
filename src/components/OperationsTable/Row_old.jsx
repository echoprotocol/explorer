import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Tooltip from 'rc-tooltip';
import { validators } from 'echojs-lib';

import ddIcon from '../../public/images/icons/curret-sm.svg';

import Avatar from '../Avatar';
import OperationInfo from '../TransactionInfo/OperationInfo';
import ObjectInfo from '../TransactionInfo/ObjectInfo';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

const OperationsRow = React.memo(({
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
	air,
	isTransaction,
	toggleOperationDetails,
	tableRefs,
}) => {

	const getSenderLink = () => (!mainInfo.from.name && validators.isContractId(mainInfo.from.id) ?
		URLHelper.createContractUrl(mainInfo.from.id) : URLHelper.createAccountUrl(mainInfo.from.name));

	const renderSubject = (subject) => {
		if (!subject) return <div className="td-in">—</div>;
		if (validators.isHex(subject) && subject.length === 40) return <span className="td-in"><span>{subject}</span></span>;
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
	};
	const renderAmount = () => {
		if (!mainInfo.value.amount) return <div className="td-in">—</div>;
		const assetAmount = FormatHelper.formatAmount(mainInfo.value.amount, mainInfo.value.precision);
		return (
			<div className="td-in">
				<Tooltip
					placement="top"
					overlayClassName="verify-contract-tooltip"
					trigger={['hover']}
					overlay={assetAmount}
				>
					<span className="value">
						{assetAmount}
					</span>
				</Tooltip>
				<span className="currency">{mainInfo.value.symbol}</span>
			</div>
		);
	};

	const objectId = objectInfo ? objectInfo.get('id') : null;
	tableRefs[index] = React.createRef();
	const subjectValue = mainInfo.subject && (mainInfo.subject.name || mainInfo.subject.id);
	return (
		<React.Fragment>
			<tr
				className={classnames('view', { active })}
				onClick={() => toggleOperationDetails(index)}
				ref={tableRefs[index]}
			>
				<td />
				<td className="number">
					<div className="td-in">{number !== '' ? `${number || index + 1}.` : null}</div>
				</td>
				<td className="operation">
					<div className="td-in">{detailInfo.type}</div>
				</td>
				<td className="time">
					<div className="td-in">
						<span>{FormatHelper.timestampToOperationRowTime(blockTimestamp)}</span>
					</div>
				</td>
				<td className="sender">
					{ mainInfo.from.id ?
						<Link
							className="td-in avatar-wrap"
							to={getSenderLink()}
							onClick={(e) => e.stopPropagation()}
						>
							{mainInfo.from.name ? <Avatar accountName={mainInfo.from.name} /> : null}
							<span>{mainInfo.from.name ? mainInfo.from.name : mainInfo.from.id}</span>
						</Link> : <div className="td-in">—</div>
					}
				</td>
				<td className="reciever">{renderSubject(subjectValue, mainInfo)}</td>
				<td className="amount">{renderAmount()}</td>
				<td className="fee">
					<div className="td-in">
						{detailInfo.fee ?
							<React.Fragment>
								<Tooltip
									placement="top"
									overlayClassName="verify-contract-tooltip"
									trigger={['hover']}
									overlay={FormatHelper.formatAmount(detailInfo.fee.amount, detailInfo.fee.precision)}
								>
									<span className="value">
										{FormatHelper.formatAmount(detailInfo.fee.amount, detailInfo.fee.precision)}
									</span>
								</Tooltip>
								<span className="currency">{detailInfo.fee.symbol}</span>

							</React.Fragment> : '-'}
					</div>
				</td>
				{ isTransaction &&
					<td className="dd">
						<div className="td-in"><img src={ddIcon} alt="" /></div>
					</td>
				}
				<td />
			</tr>

			{ active &&
				<tr className="fold">
					<td />
					<td colSpan="8">
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
					<td />
				</tr>
			}
			{ air && <tr className="air"><td /></tr> }
		</React.Fragment>
	);

});

OperationsRow.propTypes = {
	operation: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired,
	air: PropTypes.bool.isRequired,
	tableRefs: PropTypes.array.isRequired,
	toggleOperationDetails: PropTypes.func.isRequired,
	isTransaction: PropTypes.bool,
};

OperationsRow.defaultProps = {
	isTransaction: false,
};

export default OperationsRow;
