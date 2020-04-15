import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classnames from 'classnames';
import Tooltip from 'rc-tooltip';
import { validators } from 'echojs-lib';

import ddIcon from '../../public/images/icons/curret-sm.svg';

import Avatar from '../Avatar';
import OperationInfo from '../TransactionInfo/OperationInfo';
import ProposalOperations from '../TransactionInfo/ProposalOperations';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

const OperationsRow = React.memo(({
	operation: {
		operationsInfoData,
		id,
		mainInfo,
		objectInfo,
		blockNumber,
		trIndex,
		opIndex,
		number,
		type,
		...detailInfo
	},
	index,
	active,
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
				to={URLHelper.createUrlById(subject, mainInfo.subject.id)}
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

	tableRefs[index] = React.createRef();
	const subjectValue = mainInfo.subject && (mainInfo.subject.name || mainInfo.subject.id);

	console.log('operationsInfoData', operationsInfoData);

	return (
		<React.Fragment>
			<tr
				className={classnames('view', { active })}
				onClick={() => toggleOperationDetails(index)}
				ref={tableRefs[index]}
			>
				<td className="number">
					<div className="td-in">{number !== '' ? `${number || index + 1}.` : null}</div>
				</td>
				<td className="operation">
					<div className="td-in">{type}</div>
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
					<img src={ddIcon} alt="" className="toggle-icon" />
				</td>
			</tr>

			{ active &&
				<tr className="fold">
					<td colSpan="6">
						<Tabs>
							<TabList className="operation-detail-header">
								<div className="operation-detail-tabs">
									{operationsInfoData.operationInfo && <Tab className="operation-detail-tab">Operation Info</Tab>}
									{
										operationsInfoData.proposalOperations && operationsInfoData.proposalOperations.length !== 0 &&
										<Tab className="operation-detail-tab">Proposal operations ({operationsInfoData.proposalOperations.length})</Tab>
									}
								</div>
								<button className="yellow-button">View Raw JSON Object</button>
							</TabList>
							<div className="operation-detail-table">
								{
									operationsInfoData.operationInfo &&
									<TabPanel>
										<OperationInfo data={operationsInfoData.operationInfo} />
									</TabPanel>
								}
								{
									operationsInfoData.proposalOperations && operationsInfoData.proposalOperations.length !== 0 &&
									<TabPanel>
										<ProposalOperations operations={operationsInfoData.proposalOperations} />
									</TabPanel>
								}
							</div>
						</Tabs>
					</td>
				</tr>
			}
		</React.Fragment>
	);

});

OperationsRow.propTypes = {
	operation: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired,
	tableRefs: PropTypes.array.isRequired,
	toggleOperationDetails: PropTypes.func.isRequired,
};

export default OperationsRow;
