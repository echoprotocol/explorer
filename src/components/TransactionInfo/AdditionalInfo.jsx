import React from 'react';
import PropTypes from 'prop-types';

import FormatHelper from '../../helpers/FormatHelper';

import PrimaryRow from './Rows/PrimaryRow';
import LinkRow from './Rows/LinkRow';
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
			{data.current_asset_unclaimed_fee && <PrimaryRow title="Current asset unclaimed fee" description={data.current_asset_unclaimed_fee} />}
			{data.count_approvals && <PrimaryRow title="Count approvals" description={`${data.count_approvals.value} out of ${data.count_approvals.total}`} />}
			{data.count_signatures && <PrimaryRow title="Count signatures" description={data.count_signatures} />}
			{data.proposal_status && <PrimaryRow title="Proposal status" description={data.proposal_status} status={data.proposal_status} />}
			{data.result_transaction && <LinkRow title="Result transaction" link={data.result_transaction} />}
			{data.current_global_parametres && <LinkRow title="Current global parameters" link={data.current_global_parametres} />}
			{data.current_account_committee_status && <PrimaryRow title="Current account committee status" description={data.current_account_committee_status} />}
			{data.current_account_frozen_balance && <PrimaryRow
				title="Current account frozen balance"
				description={FormatHelper.formatAmount(data.current_account_frozen_balance.amount, data.current_account_frozen_balance.precision, data.current_account_frozen_balance.symbol)}
			/> }
			{data.current_vesting_balance_state && <MultyRow title="Current vesting balance state" fields={data.current_vesting_balance_state} />}
			{data.original_operation && <LinkRow title="Original operation" link={data.original_operation} />}
			{data.called_contract_type && <PrimaryRow title="Called contract type" description={data.called_contract_type} />}
			{data.erc20_token_info && <MultyRow title="ERC20 Token Info" fields={data.erc20_token_info} />}
			{data.erc20_token_transfers && <TransfersRow title="ERC20 Token Transfers" transfers={data.erc20_token_transfers} />}
			{data.asset_transfers && <TransfersRow title="Asset transfers" transfers={data.asset_transfers} />}
			{data.current_contract_owner && <LinkRow title="Current contract owner" account={{ value: data.current_contract_owner.value, link: data.current_contract_owner.link }} />}
			{data.current_contract_whitelist && <PrimaryRow title="Current contract whitelist" description={data.current_contract_whitelist.join(', ')} />}
			{data.current_contract_blacklist && <PrimaryRow title="Current contract blacklist" description={data.current_contract_blacklist.join(', ')} />}
			{data.current_contract_fee_pool_balance &&
			<PrimaryRow
				title="Current contract fee pool balance"
				description={FormatHelper.formatAmount(data.current_contract_fee_pool_balance.amount, data.current_contract_fee_pool_balance.precision, data.current_contract_fee_pool_balance.symbol)}
			/>}
			{data.number_of_confirmations && <PrimaryRow title="Number of confirmations" description={`${data.number_of_confirmations.value} out of ${data.number_of_confirmations.total}`} />}
			{data.received_deposit_address && <LinkRow title="Received deposit address" link={data.received_deposit_address} />}
			{data.settings && <SettingsRow title="Settings" settings={data.settings} />}
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
