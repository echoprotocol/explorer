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

// import Avatar from '../Avatar';
// import SsrHrefHelper from '../../helpers/SsrHrefHelper';
// import OperationInfoRow from './OperationInfoRow';

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
					{data.receiver && <LinkRow title="Receiver" account={data.receiver} />}
					{data.from && <LinkRow title="From" account={data.from} />}
					{data.to && <LinkRow title="To" account={data.to} />}

					{data.listed_account && <LinkRow title="Listed account" account={data.listed_account} />}
					{data.new_status && <PrimaryRow title="New status" description={data.new_status} />}
					{data.to_address && <PrimaryRow title="To address" description={data.to_address} />}
					{data.to_account && <LinkRow title="To account" account={data.to_account} />}

					{data.url && <LinkRow title="URL" link={data.url} />}
					{data.new_url && <LinkRow title="New URL" link={data.new_url} />}
					{data.eth_address && <LinkRow title="ETH address" link={data.eth_address} isLinkOut />}
					{data.new_eth_address && <LinkRow title="New ETH address" link={data.new_eth_address} isLinkOut />}
					{data.btc_address && <LinkRow title="BTC address" link={data.btc_address} isLinkOut />}
					{data.new_btc_address && <LinkRow title="New BTC address" link={data.new_btc_address} isLinkOut />}
					{data.proposal_id && <LinkRow title="Proposal ID" link={data.proposal_id} />}

					{data.registrar && <LinkRow title="Registrar" account={data.registrar} />	}
					{data.account_name && <LinkRow title="Account Name" account={data.account_name} />}
					{data.new_account_id && <LinkRow title="New Account ID" objectId={data.new_account_id} />}

					{data.expiration_time && <PrimaryRow title="Expiration time" description={moment(data.expiration_time).format('DD MMM, Y, HH:mm:ss')} />}
					{data.preview_period && <PrimaryRow title="Preview period" description={data.preview_period} />}
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
					{data.approvals_to_remove && <AuthorityRow title="Approvals to add" authority={data.approvals_to_remove} />}
					{data.echorand_key && <PrimaryRow title="EchoRand Key" description={data.echorand_key} />}
					{data.delegating_account && <LinkRow title="Delegating Account" account={data.delegating_account} />}
					{data.delegate_share && <LinkRow title="Delegate share" amount={data.delegate_share} />}
					{data.amount && <LinkRow title="Amount" amount={data.amount} />}
					{data.deposit_amount && <PrimaryRow title="Deposit amount" description={data.deposit_amount} />}
					{data.label && <PrimaryRow title="Label" description={data.label} />}
					{data.address && <PrimaryRow title="Address" description={data.address} />}
					{data.bit_asset_options && <MultyRow title="bitAsset options:" fields={data.bit_asset_options} />}
					{data.new_feed_producers && <ProducersRow title="New feed producers" accounts={data.new_feed_producers} /> }
					{data.feeded_asset_price && <LinkRow title="Feeded asset price" asset={data.feeded_asset_price} />}
					{data.changed_parameters && <PrimaryRow title="Changed parameters" description={data.changed_parameters.join(', ')} />}
					{data.fee && <LinkRow title="Fee" amount={data.fee} />}
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
