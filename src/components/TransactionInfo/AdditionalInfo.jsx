import React from 'react';
import PropTypes from 'prop-types';

import FormatHelper from '../../helpers/FormatHelper';

import PrimaryRow from './Rows/PrimaryRow';
import LinkRow from './Rows/LinkRow';
import ProducersRow from './Rows/ProducersRow';

const AdditionalInfo = ({ data }) => (
	<div className="additional-info">
		<div className="additional-info__title">Additional info</div>
		<div className="operation-details-rows">
			{data.account_white_list && <PrimaryRow title="Account white list" description={data.account_white_list} />}
			{data.account_black_list && <PrimaryRow title="Account black list" description={data.account_black_list} />}
			{data.current_asset_feed_producers && <ProducersRow title="Current asset feed producers" accounts={data.current_asset_feed_producers} /> }
			{data.current_asset_total_supply && <PrimaryRow title="Current asset total supply" description={data.current_asset_total_supply} /> }
			{data.current_asset_fee_pool && <PrimaryRow title="Current asset total supply" description={data.current_asset_fee_pool} />}
			{data.current_asset_price &&
			<PrimaryRow
				title="Current asset price"
				description={FormatHelper.formatAmount(data.current_asset_price.amount, data.current_asset_price.precision, data.current_asset_price.symbol)}
			/>}
			{data.feeded_asset_fee_pool &&
			<PrimaryRow
				title="Feeded asset fee pool"
				description={FormatHelper.formatAmount(data.feeded_asset_fee_pool.amount, data.feeded_asset_fee_pool.precision, data.feeded_asset_fee_pool.symbol)}
			/>}
			{data.current_asset_unclaimed_fee &&
			<PrimaryRow
				title="Current asset unclaimed fee"
				description={FormatHelper.formatAmount(data.current_asset_unclaimed_fee.amount, data.current_asset_unclaimed_fee.precision, data.current_asset_unclaimed_fee.symbol)}
			/>}
			{data.count_approvals && <PrimaryRow title="Count approvals" description={`${data.count_approvals.value} out of ${data.count_approvals.total}`} />}
			{data.count_signatures && <PrimaryRow title="Count signatures" description={data.count_signatures} />}
			{data.proposal_status && <PrimaryRow title="Proposal status" description={data.proposal_status} status={data.proposal_status} />}
			{data.result_transaction && <LinkRow title="Result transaction" link={data.result_transaction} />}
			{data.current_global_parametres && <LinkRow title="Current global parameters" link={data.current_global_parametres} />}
			{data.current_account_committee_status && <PrimaryRow title="Current account committee status" description={data.current_account_committee_status} />}
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
