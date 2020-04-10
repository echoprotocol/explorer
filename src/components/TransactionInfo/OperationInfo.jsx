import React from 'react';
import PropTypes from 'prop-types';

import FormatHelper from '../../helpers/FormatHelper';

import OperationInfoRow from './OperationInfoRow';

import URLHelper from '../../helpers/URLHelper';

class OperationInfo extends React.Component {

	// renderContractLogs(logs) {
	// 	const { showLogs } = this.state;
	// 	const formattedLogs = logs.map((log, index) => (
	// 		<div className="mono" key={log.data}>
	// 			<div className="mono-bold">Log [{index}]:</div>
	// 			<div className="mono-bold">Contract: <Link to={URLHelper.createUrlById(log.contract)}>{log.contract}</Link></div>
	// 			<div className="mono-bold">Topics:</div>
	// 			{log.topics.map((topic, i) => (<div key={topic}>[{i}]:{topic}</div>))}
	// 			<div className="mono-bold">Data:</div>
	// 			<div>{log.data}</div>
	// 		</div>
	// 	));

	// 	return (
	// 		<React.Fragment>
	// 			{
	// 				formattedLogs.length > 1 && !showLogs ? formattedLogs[0] : formattedLogs
	// 			}
	// 			{
	// 				(formattedLogs.length > 1 && !showLogs) &&
	// 				<button className="text-button" onClick={() => this.setState({ showLogs: true })}>View full log</button>
	// 			}
	// 		</React.Fragment>
	// 	);
	// }

	// renderInfo() {
	// 	const {
	// 		details, index, block, transaction, opIndex,
	// 	} = this.props;
	// 	const { type } = details;
	// 	const opKey = `${type}_${index}`;
	// 	const transactionUrl = URLHelper.createTransactionUrl(block, transaction + 1);
	// 	const operationUrl = URLHelper.createTransactionOperationUrl(transactionUrl, opIndex + 1);
	// 	return (
	// 		<React.Fragment>
	// 			{
	// 				Object.entries(details).map(([key, value]) => {

	// 					if (key === 'Fee') {
	// 						return (
	// 							<React.Fragment key={`${opKey}_${key}_media`}>
	// 								<div className="od-row" key={`${opKey}_${key}`}>
	// 									<div className="od-col">{key}:</div>
	// 									<div className="od-col">
	// 										{this.renderOperationRowValue(key, value, index)}
	// 									</div>
	// 								</div>
	// 							</React.Fragment>
	// 						);
	// 					} else if (key === 'token transfers') {
	// 						return (
	// 							value.map((op, internalOpIndex) => (
	// 								<div className="od-row" key={`${opKey}_${key}_${internalOpIndex.toString()}`} >
	// 									<div className="od-col">
	// 										<div
	// 											className="tt-row"
	// 											key={index.toString()}
	// 										>
	// 											{op.label && `${op.label}:`}
	// 										</div>
	// 									</div>
	// 									<div className="od-col">
	// 										{this.renderSingleInternal(op, index)}
	// 									</div>
	// 								</div>
	// 							))
	// 						);
	// 					}
	// 					return (
	// 						<div className="od-row" key={`${opKey}_${key}`} >
	// 							<div className="od-col">
	// 								{this.renderOperationRowKey(key, value, index, type)}
	// 							</div>
	// 							<div className="od-col">
	// 								{this.renderOperationRowValue(key, value, index)}
	// 							</div>
	// 						</div>
	// 					);
	// 				})
	// 			}
	// 			<div className="od-row">
	// 				<div className="od-col">OPERATION:</div>
	// 				<div className="od-col">
	// 					<Link to={operationUrl}>{`${window.location.origin}${operationUrl}`}</Link>
	// 				</div>
	// 			</div>
	// 		</React.Fragment>
	// 	);
	// }

	render() {
		const { data } = this.props;

		return (
			<div className="operation-info">
				{data.description &&
				<div className="describe-operation">
					<div className="describe-operation__description">{data.description}</div>
					<div className="describe-operation__details">For more info read <a href="" className="link">Operation Documentation</a></div>
				</div>
				}
				{data.type && <OperationInfoRow title="Type" description={data.type} /> }
				{data.issuer && <OperationInfoRow title="Issuer" account={{ value: data.issuer.value, link: data.issuer.link }} />}
				{data.sender && <OperationInfoRow title="Sender" account={{ value: data.sender.value, link: data.sender.link }} />}
				{data.receiver && <OperationInfoRow title="Receiver" account={{ value: data.receiver.value, link: data.receiver.link }} />}
				{data.from && <OperationInfoRow title="From" account={{ value: data.from.value, link: data.from.link }} />}
				{data.to && <OperationInfoRow title="To" account={{ value: data.to.value, link: data.to.link }} />}
				{data.listed_account && <OperationInfoRow title="Listed account" account={{ value: data.listed_account.value, link: data.listed_account.link }} />}
				{data.to_address && <OperationInfoRow title="To address" link={data.to_address} />}
				{data.to_account && <OperationInfoRow title="To account" account={{ value: data.to_account.value, link: data.to_account.link }} />}
				{data.registrar && <OperationInfoRow title="Registrar" account={{ value: data.registrar.value, link: data.registrar.link }} />	}
				{data.account_name && <OperationInfoRow title="Account Name" account={{ value: data.account_name.value, link: data.account_name.link }} />}
				{data.new_account_id && <OperationInfoRow title="New Account ID" link={URLHelper.createUrlById(data.new_account_id)} />}
				{data.asset_name && <OperationInfoRow title="Asset Name" description={data.asset_name} />}
				{data.precision && <OperationInfoRow title="Precision" description={data.precision} />}
				{data.max_suply && <OperationInfoRow title="Max Suply" description={data.max_suply} />}
				{data.asset_description && <OperationInfoRow title="Asset Description" description={data.asset_description} isText />}
				{data.rate && <OperationInfoRow title="Rate" description={FormatHelper.formatAmount(data.rate.amount, data.rate.precision, data.rate.symbol)} />}
				{data.is_bit_asset && <OperationInfoRow title="Is bitAsset" description={data.is_bit_asset ? 'Yes' : 'No'} />}
				{data.settings && <OperationInfoRow title="Settings" settings={data.settings} />}
				{data.authority &&
					<OperationInfoRow
						title="Authority"
						description="Public keys and accounts"
						tooltip="Treshold"
						authority={data.authority}
					/>}
				{data.echorand_key && <OperationInfoRow title="EchoRand Key" description={data.echorand_key} />}
				{data.account_updated && <OperationInfoRow title="Account updated" account={{ value: data.account_updated.value, link: data.account_updated.link }} />}
				{data.delegating_account &&
					<OperationInfoRow
						title="Delegating Account"
						account={{ value: data.delegating_account.value, link: data.delegating_account.link }}
					/>}
				{data.delegate_share &&
					<OperationInfoRow
						title="Delegate share"
						description={FormatHelper.formatAmount(data.delegate_share.amount, data.delegate_share.precision, data.delegate_share.symbol)}
					/>}
				{data.amount && <OperationInfoRow title="Amount" description={FormatHelper.formatAmount(data.amount.amount, data.amount.precision, data.amount.symbol)} />}
				{data.new_status && <OperationInfoRow title="New status" description={data.new_status} />}
				{data.label && <OperationInfoRow title="Label" description={data.label} />}
				{data.bit_asset_options && <OperationInfoRow title="bitAsset options:" fields={data.bit_asset_options} />}
				{data.new_feed_producers && <OperationInfoRow title="New feed producers" accounts={data.new_feed_producers} /> }
				{data.fee && <OperationInfoRow title="Fee" description={FormatHelper.formatAmount(data.fee.amount, data.fee.precision, data.fee.symbol)} />}
				{data.directLink && <OperationInfoRow title="Operation direct link" link={data.directLink} />}
			</div>
		);
	}

}


OperationInfo.propTypes = {
	data: PropTypes.object,
};

OperationInfo.defaultProps = {
	data: {},
};
export default OperationInfo;
