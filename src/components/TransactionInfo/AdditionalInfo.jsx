import React from 'react';
import PropTypes from 'prop-types';

import PrimaryRow from './Rows/PrimaryRow';
import LinkRow from './Rows/LinkRow';
import LinksArray from './Rows/LinksArray';
import ProducersRow from './Rows/ProducersRow';
import MultyRow from './Rows/MultyRow';
import TransfersRow from './Rows/TransfersRow';
import SettingsRow from './Rows/SettingsRow';

const AdditionalInfo = ({ data }) => (
	<div className="additional-info">
		<div className="additional-info__title">Additional info</div>
		<div className="operation-details-rows">
			{data.whitelisting_accounts && data.whitelisting_accounts.map((account) => <LinkRow title="Account white list" account={account} />)}
			{data.blacklisting_accounts && data.blacklisting_accounts.map((account) => <LinkRow title="Account black list" account={account} />)}
			{data.current_asset_feed_producers && <ProducersRow title="Current asset feed producers" accounts={data.current_asset_feed_producers} /> }
			{data.current_asset_total_supply && <PrimaryRow title="Current asset total supply" description={data.current_asset_total_supply} /> }
			{data.current_asset_fee_pool && <PrimaryRow title="Current asset total supply" description={data.current_asset_fee_pool} />}
			{data.current_asset_price && <PrimaryRow title="Current asset price" description={data.current_asset_price} />}
			{data.feeded_asset_fee_pool && <PrimaryRow title="Feeded asset fee pool" description={data.feeded_asset_fee_pool} />}
			{data.current_asset_unclaimed_fee && <LinkRow title="Current asset unclaimed fee" amount={data.current_asset_unclaimed_fee} />}
			{data.count_approvals && <PrimaryRow title="Count approvals" description={`${data.count_approvals.value} out of ${data.count_approvals.total}`} />}
			{data.count_signatures && <PrimaryRow title="Count signatures" description={data.count_signatures} />}
			{data.proposal_status && <PrimaryRow title="Proposal status" description={data.proposal_status} status={data.proposal_status} />}
			{data.result_transaction && <LinkRow title="Result transaction" link={data.result_transaction} />}
			{data.current_global_parametres && <LinkRow title="Current global parameters" link={data.current_global_parametres} />}
			{data.committee_status && <PrimaryRow title="Current account committee status" description={data.committee_status} />}
			{data.current_account_committee_status && <PrimaryRow title="Current account committee status" description={data.current_account_committee_status} />}
			{data.current_account_frozen_balance && <LinkRow title="Current account frozen balance" amount={data.current_account_frozen_balance} /> }
			{data.current_vesting_balance_state && <MultyRow title="Current vesting balance state" fields={data.current_vesting_balance_state} />}
			{data.original_operation && data.original_operation.link && <LinkRow title="Original operation" linkTitle={data.original_operation.title} link={data.original_operation.link} />}
			{data.list_approvals && <LinksArray title="List of approvals" links={data.list_approvals} />}
			{data.called_contract_type && <PrimaryRow title="Called contract type" description={data.called_contract_type} />}
			{data.erc20_token_info && <MultyRow title="ERC20 Token Info" fields={data.erc20_token_info} />}
			{data.erc20_token_transfers && <TransfersRow title="ERC20 Token Transfers" transfers={data.erc20_token_transfers} />}
			{data.asset_transfers && <TransfersRow title="Asset transfers" transfers={data.asset_transfers} />}
			{data.current_contract_owner && <LinkRow title="Current contract owner" account={data.current_contract_owner} />}
			{data.current_contract_whitelist && <ProducersRow title="Current contract whitelist" accounts={data.current_contract_whitelist} />}
			{data.current_contract_blacklist && <ProducersRow title="Current contract blacklist" accounts={data.current_contract_blacklist} />}
			{data.current_contract_fee_pool_balance && <LinkRow title="Current contract fee pool balance" amount={data.current_contract_fee_pool_balance} />}
			{data.number_of_confirmations && <PrimaryRow title="Number of confirmations" description={`${data.number_of_confirmations.value} out of ${data.number_of_confirmations.total}`} />}
			{data.received_deposit_address && <LinkRow title="Received deposit address" link={data.received_deposit_address} />}
			{data.settings && <SettingsRow title="Settings" settings={data.settings} />}
			{data.transaction_hash && <PrimaryRow title="Transaction hash" description={data.transaction_hash} />}
			{data.operationLink && <LinkRow title="Orirginal operation link" linkTitle="Operation link" link={data.operationLink} />}
			{data.associated_contract && <LinkRow title="Associated contract" contract={data.associated_contract} />}
			{data.current_parameters && <MultyRow title="Current parameters" fields={data.current_parameters} />}
		</div>
	</div>
);

AdditionalInfo.propTypes = {
	data: PropTypes.object,
};

AdditionalInfo.defaultProps = {
	data: {},
};

export default AdditionalInfo;
