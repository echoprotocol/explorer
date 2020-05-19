import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import PrimaryRow from './Rows/PrimaryRow';
import LinkRow from './Rows/LinkRow';
import AuthorityRow from './Rows/AuthorityRow';
import SettingsRow from './Rows/SettingsRow';
import MultyRow from './Rows/MultyRow';
import ProducersRow from './Rows/ProducersRow';
import AdditionalInfo from './AdditionalInfo';
import PolicyRow from './Rows/PolicyRow';
import CopyRow from './Rows/CopyRow';
import URLHelper from '../../helpers/URLHelper';
import MultyLinksRow from './Rows/MultyLinksRow';

class OperationInfo extends React.Component {

	render() {
		const { data, proposalIdx } = this.props;
		return (
			<div className="operation-info">
				{data.description &&
					<div className="describe-operation">
						<div className="describe-operation__description">{data.description}</div>
						<div className="describe-operation__details">
							For more info read <a href={data.link} 	target="_blank" rel="noopener noreferrer" className="link">Operation Documentation</a>
						</div>
					</div>
				}
				<div className="operation-details-rows">
					{data.type && proposalIdx && <div className="proposal-operation-header">{proposalIdx}.&nbsp;{data.type}</div>}
					{data.type && !proposalIdx && <PrimaryRow title="Type" description={data.type} /> }
					{data.issuer && <LinkRow title="Issuer" account={data.issuer} />}
					{data.sender && <LinkRow title="Sender" account={data.sender} />}
					{data.balance_object_id && <LinkRow title="Balance object ID" link={data.balance_object_id} />}
					{data.destructed_contract && <LinkRow title="Destructed contract" link={data.destructed_contract} />}
					{data.receiver && <LinkRow title="Receiver" account={data.receiver} />}
					{data.recipient && <LinkRow title="Recipient" account={{ value: data.recipient.value, link: data.recipient.link }} />}
					{data.owner && <LinkRow title="Owner" account={{ value: data.owner.value, link: data.owner.link }} />}
					{data.contract && <LinkRow title="Contract" contract={data.contract} />}
					{data.added_to_whitelist && <ProducersRow title="Added to whitelist" accounts={data.added_to_whitelist} />}
					{data.removed_from_whitelist && <ProducersRow title="Removed from whitelist" accounts={data.removed_from_whitelist} />}
					{data.added_to_blacklist && <ProducersRow title="Added to blacklist" accounts={data.added_to_blacklist} />}
					{data.remove_from_blacklist && <ProducersRow title="Removed from blacklist" accounts={data.remove_from_blacklist} />}
					{data.new_owner && <LinkRow title="New owner" account={{ value: data.new_owner.value, link: data.new_owner.link }} />}
					{data.from && <LinkRow title="From" account={data.from} />}
					{data.to && <LinkRow title="To" account={data.to} />}
					{data.listed_account && <LinkRow title="Listed account" account={data.listed_account} />}
					{data.to_address && <PrimaryRow title="To address" description={data.to_address} />}
					{data.to_account && <LinkRow title="To account" account={data.to_account} />}

					{data.url && <PrimaryRow title="URL" description={data.url} />}
					{data.new_url && <PrimaryRow title="New URL" description={data.new_url} />}
					{data.eth_address && <LinkRow title="ETH address" value={data.eth_address} link={URLHelper.createEthAddressOut(data.eth_address)} isLinkOut />}
					{data.from_address && <LinkRow title="From address" value={data.from_address} link={URLHelper.createEthAddressOut(data.from_address)} isLinkOut />}
					{data.to_eth_address && <LinkRow title="To ETH address" value={data.eth_address} link={URLHelper.createEthAddressOut(data.to_eth_address)} isLinkOut />}
					{data.new_status && <PrimaryRow title="New status" description={data.new_status} />}
					{data.new_eth_address && <LinkRow title="New ETH address" link={data.new_eth_address} isLinkOut />}
					{data.btc_address && <LinkRow title="BTC address" value={data.btc_address} link={URLHelper.createBtcAddressOut(data.btc_address)} isLinkOut />}
					{data.new_btc_address && <LinkRow title="New BTC address" link={data.new_btc_address} isLinkOut />}
					{data.caller_contract && <LinkRow title="Caller contract" account={data.caller_contract} />}
					{data.called_contract && <LinkRow title="Called contract" account={data.called_contract} />}
					{data.new_contract && <LinkRow title="New contract" link={data.new_contract} />}
					{data.to_account && <LinkRow title="To account" account={data.to_account} />}
					{data.registrar && <LinkRow title="Registrar" account={data.registrar} />	}
					{data.account_name && <LinkRow title="Account Name" account={data.account_name} />}
					{data.proposal_id && <LinkRow title="Proposal ID" objectId={data.proposal_id} />}
					{data.new_account_id && <LinkRow title="New Account ID" objectId={data.new_account_id} />}
					{data.contract_type && <PrimaryRow title="Contract type" description={data.contract_type} />}
					{data.deployed_contract_bytecode && <CopyRow title="Deployed contact bytecode" value={data.deployed_contract_bytecode} />}
					{data.call_bytecode && <CopyRow title="Call bytecode" value={data.call_bytecode} />}
					{data.deploy_arguments && <PrimaryRow title="Deploy arguments" description={`{${data.deploy_arguments.join('; ')}}`} />}
					{data.expiration_time && <PrimaryRow title="Expiration time" description={moment(data.expiration_time).format('DD MMM, Y, HH:mm:ss')} />}
					{data.preview_period && <PrimaryRow title="Preview period" description={data.preview_period} />}
					{data.asset_name && <PrimaryRow title="Asset Name" description={data.asset_name} />}
					{data.asset && <LinkRow title="Asset" asset={data.asset} />}
					{data.precision && <PrimaryRow title="Precision" description={data.precision} />}
					{data.max_supply && <PrimaryRow title="Max Suply" description={data.max_supply} />}
					{data.asset_description && <PrimaryRow title="Asset Description" description={data.asset_description} isText />}
					{data.rate && <LinkRow title="Rate" rate={data.rate} />}
					{data.is_bit_asset && <PrimaryRow title="Is bitAsset" description={data.is_bit_asset} />}
					{data.new_issuer && <LinkRow title="New issuer" account={data.new_issuer} />}
					{data.settings && <SettingsRow title="Settings" settings={data.settings} />}
					{data.authority && <AuthorityRow title="Authority" tooltip="Public keys and accounts" weightThreshold={data.weight_threshold} authority={data.authority} />}
					{data.approvals_to_add && <AuthorityRow title="Approvals to add" authority={data.approvals_to_add} />}
					{data.approvals_to_remove && <AuthorityRow title="Approvals to remove" authority={data.approvals_to_remove} />}
					{data.echorand_key && <PrimaryRow title="EchoRand Key" description={data.echorand_key} />}
					{data.account_updated && <LinkRow title="Account updated" account={{ value: data.account_updated.value, link: data.account_updated.link }} />}
					{data.delegating_account && <LinkRow title="Delegating Account" account={data.delegating_account} />}
					{data.delegate_share && <LinkRow title="Delegate share" amount={data.delegate_share} />}
					{data.duration && <PrimaryRow title="Duration" description={data.duration} />}
					{data.amount && <LinkRow title="Amount" amount={data.amount} />}
					{data.deposit_amount && <LinkRow title="Deposit amount" amount={data.deposit_amount} />}

					{data.deposit_id && <LinkRow title="Deposit ID" objectId={data.deposit_id} />}
					{data.withdraw_id && <LinkRow title="Withdraw ID" objectId={data.withdraw_id} />}
					{data.address_id && <LinkRow title="Address ID" link={data.address_id} />}
					{data.eth_accuracy_is_enabled && <PrimaryRow title="ETH Accuracy is enabled" description={data.eth_accuracy_is_enabled} />}
					{data.balance_owner_key && <PrimaryRow title="Balance owner key" description={data.balance_owner_key} />}
					{data.policy && <PolicyRow title="Policy" objects={data.policy} />}
					{data.new_status && <PrimaryRow title="New status" description={data.new_status} />}
					{data.supported_asset && <PrimaryRow title="Supported asset" description={data.supported_asset} />}
					{data.label && <PrimaryRow title="Label" description={data.label} />}
					{data.amount_info && <PrimaryRow title="Amount" description={data.amount_info} />}
					{data.eth_transaction_hash && <LinkRow
						title="Transaction hash"
						value={data.eth_transaction_hash}
						link={URLHelper.createEthTransactionOut(data.eth_transaction_hash)}
						isLinkOut
					/>}
					{data.btc_transaction_hash && <LinkRow
						title="Transaction hash"
						value={data.btc_transaction_hash}
						link={URLHelper.createBtcTransactionOut(data.btc_transaction_hash)}
						isLinkOut
					/>}
					{data.token && <LinkRow title="Token" linkTitle={data.token.value} objectId={data.token.link} />}
					{data.aggregation_out_value && <PrimaryRow title="Aggregation out value" description={data.aggregation_out_value} />}
					{data.btc_block_number && <LinkRow
						title="BTC block number"
						value={data.btc_block_number}
						link={URLHelper.createBtcBlockOut(data.btc_block_number)}
						isLinkOut
					/>}
					{data.sma_address && <LinkRow
						title="SMA Address"
						value={data.sma_address}
						link={URLHelper.createBtcAddressOut(data.sma_address)}
						isLinkOut
					/>}
					{data.signature && <PrimaryRow title="Signature" description={data.signature} />}
					{data.from_address && <LinkRow
						title="From address"
						value={data.from_address}
						link={URLHelper.createEthAddressOut(data.from_address)}
						isLinkOut
					/>}
					{data.committee_member && <LinkRow title="Committee member" account={data.committee_member} />}
					{data.committee_member_id && <PrimaryRow title="Committee member id" description={data.committee_member_id} />}
					{data.deposits && <MultyLinksRow title="Deposits" fields={data.deposits} />}
					{data.withdrawals && <MultyLinksRow title="Withdrawals" fields={data.withdrawals} />}
					{data.committee_member_ids_in_script && <MultyLinksRow title="Committee member ids in script" fields={data.committee_member_ids_in_script} />}
					{data.signatures && <MultyRow title="Signatures" fields={data.signatures} />}
					{data.assets && <MultyLinksRow title="Assets" fields={data.assets} />}
					{data.address && <PrimaryRow title="Address" description={data.address} />}
					{data.bit_asset_options && <MultyRow title="bitAsset options:" fields={data.bit_asset_options} />}
					{data.changed_parameters && <MultyRow title="New parameters" fields={data.changed_parameters} />}
					{data.new_feed_producers && <ProducersRow title="New feed producers" accounts={data.new_feed_producers} /> }
					{data.feeded_asset_price && <LinkRow title="Feeded asset price" asset={data.feeded_asset_price} />}
					{data.name && <PrimaryRow title="Name" description={data.name} />}
					{data.symbol && <PrimaryRow title="Symbol" description={data.symbol} />}
					{data.decimals && <PrimaryRow title="Decimals" description={data.decimals} />}
					{data.fee && <LinkRow title="Fee" amount={data.fee} />}
					{data.directLink && <LinkRow title="Operation direct link" link={data.directLink} />}
					{data.operationLink && <LinkRow title="Orirginal operation link" linkTitle="Operation link" link={data.operationLink} />}
				</div>
				{data.additionalInfo && <AdditionalInfo data={data.additionalInfo} />}
			</div>
		);
	}

}


OperationInfo.propTypes = {
	data: PropTypes.object,
	proposalIdx: PropTypes.number,
};

OperationInfo.defaultProps = {
	data: {},
	proposalIdx: null,
};
export default OperationInfo;
