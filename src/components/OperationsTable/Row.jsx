import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classnames from 'classnames';
import Tooltip from 'rc-tooltip';
import { validators } from 'echojs-lib';

import ddIcon from '../../public/images/icons/curret-sm.svg';

import Avatar from '../Avatar';
import OperationInfo from '../TransactionInfo/OperationInfo';
import ProposalOperations from '../TransactionInfo/ProposalOperations';
import LogsInfo from '../TransactionInfo/LogsInfo';
import InternalOperations from '../TransactionInfo/InternalOperations';
import InfoTooltip from '../InfoTooltip';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';
import SsrHrefHelper from '../../helpers/SsrHrefHelper';

const OperationsRow = ({
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
		blockTimestamp,
		...detailInfo
	},
	isASCOps,
	index,
	active,
	toggleOperationDetails,
	tableRefs,
	currentPage,
	sizePerPage,
	totalDataSize,
}) => {
	const operationObjectsUrl = URLHelper.createOperationObjectsUrl(blockNumber, trIndex + 1, opIndex + 1);
	const senderLink = (!mainInfo.from.name && validators.isContractId(mainInfo.from.id) ?
		URLHelper.createContractUrl(mainInfo.from.id) : URLHelper.createAccountUrl(mainInfo.from.name));
	const goToLink = (e, href, objectId) => {
		e.preventDefault();
		e.stopPropagation();
		Router.push(SsrHrefHelper.getHrefByObjectId(objectId), href);
	};

	const renderSubject = (subject) => {
		if (!subject) return <div className="td-in">—</div>;
		if (validators.isString(subject) && validators.isAssetName(subject)) return <div className="td-in">—</div>;
		if (validators.isHex(subject) && subject.length === 40) return <span className="td-in"><span>{subject}</span></span>;

		return (
			<Link href={SsrHrefHelper.getHrefByObjectId(subject)}>
				<a href="" className="td-in avatar-wrap" onClick={(e) => goToLink(e, URLHelper.createUrlById(subject), subject)}>
					{mainInfo.subject.name && <Avatar accountName={subject} />}
					<span>{subject}</span>
					<InfoTooltip
						overlay="Tooltip"
						type="receiver"
					/>
				</a>
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

	const numberOperationInPage = ((currentPage - 1) * sizePerPage) + index;
	let numberOperation = null;
	if (number !== '') {
		numberOperation = isASCOps ? numberOperationInPage + 1 : totalDataSize - numberOperationInPage;
	}

	if (numberOperation < 1) {
		return null;
	}

	return (
		<React.Fragment>
			<tr
				className={classnames('view', { active })}
				onClick={() => toggleOperationDetails(index)}
				ref={tableRefs[index]}
			>
				<td className="number">
					<div className="td-in">{numberOperation}.</div>
				</td>
				<td className="type">
					<div className="td-in">{detailInfo.type}</div>
				</td>
				<td className="type">
					<div className="td-in">{type}</div>
				</td>
				<td className="sender">
					{ mainInfo.from.id ?
						<Link href={SsrHrefHelper.getHrefByObjectId(mainInfo.from.id)}>
							<a href={URLHelper.getUrlWithOrigin(senderLink)} className="td-in avatar-wrap" onClick={(e) => goToLink(e, senderLink, mainInfo.from.id)}>
								{mainInfo.from.name ? <Avatar accountName={mainInfo.from.name} /> : null}
								<span>{mainInfo.from.name ? mainInfo.from.name : mainInfo.from.id}</span>
								<InfoTooltip
									overlay="Tooltip"
									type="sender"
								/>
							</a>
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
									{	operationsInfoData.operationInfo &&
										<Tab className="operation-detail-tab">Operation Info</Tab>
									}
									{operationsInfoData.proposalOperations && operationsInfoData.proposalOperations.length !== 0 &&
									<Tab className="operation-detail-tab">Proposal operations ({operationsInfoData.proposalOperations.length})</Tab> }
									{operationsInfoData.logs && operationsInfoData.logs.length !== 0 &&
									<Tab className="operation-detail-tab">Event logs ({operationsInfoData.logs.length})</Tab>}
									{operationsInfoData.internalOperations && operationsInfoData.internalOperations !== 0 &&
									<Tab className="operation-detail-tab">Internal operations ({operationsInfoData.internalOperations.length})</Tab> }
								</div>
								<button className="yellow-button" onClick={(e) => goToLink(e, operationObjectsUrl)}>
									<a className="yellow" href={operationObjectsUrl} >View Raw JSON Object</a>
								</button>
							</TabList>
							<div className="operation-detail-table">
								{ operationsInfoData.operationInfo &&
								<TabPanel>
									<OperationInfo data={operationsInfoData.operationInfo} />
								</TabPanel>}
								{operationsInfoData.proposalOperations && operationsInfoData.proposalOperations.length !== 0 &&
								<TabPanel>
									<ProposalOperations operations={operationsInfoData.proposalOperations} />
								</TabPanel>}
								{operationsInfoData.logs && operationsInfoData.logs.length !== 0 &&
								<TabPanel>
									<LogsInfo logs={operationsInfoData.logs} />
								</TabPanel>}
								{operationsInfoData.internalOperations && operationsInfoData.internalOperations !== 0 &&
								<TabPanel>
									<InternalOperations operations={operationsInfoData.internalOperations} />
								</TabPanel>
								}
							</div>
						</Tabs>
					</td>
				</tr>
			}
		</React.Fragment>
	);

};

OperationsRow.propTypes = {
	isASCOps: PropTypes.bool.isRequired,
	currentPage: PropTypes.number.isRequired,
	sizePerPage: PropTypes.number.isRequired,
	totalDataSize: PropTypes.number.isRequired,
	operation: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired,
	tableRefs: PropTypes.array.isRequired,
	toggleOperationDetails: PropTypes.func.isRequired,
};


export default OperationsRow;
