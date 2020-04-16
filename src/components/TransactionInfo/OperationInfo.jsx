import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

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
					<div className="describe-operation__details">For more info read <a href="" className="link">Operation Documentation</a></div>
				</div>
				}
				<div className="operation-details-rows">
					{data.type && proposalIdx && <div className="proposal-operation-header">{proposalIdx}.&nbsp;{data.type}</div>}
					{data.type && !proposalIdx && <PrimaryRow title="Type" description={data.type} /> }
					{data.issuer && <LinkRow title="Issuer" account={{ value: data.issuer.value, link: data.issuer.link }} />}
					{data.sender && <LinkRow title="Sender" account={{ value: data.sender.value, link: data.sender.link }} />}
					{data.receiver && <LinkRow title="Receiver" account={{ value: data.receiver.value, link: data.receiver.link }} />}
					{data.from && <LinkRow title="From" account={{ value: data.from.value, link: data.from.link }} />}
					{data.to && <LinkRow title="To" account={{ value: data.to.value, link: data.to.link }} />}
					{data.listed_account && <LinkRow title="Listed account" account={{ value: data.listed_account.value, link: data.listed_account.link }} />}
					{data.to_address && <LinkRow title="To address" link={data.to_address} />}
					{data.url && <LinkRow title="URL" link={data.url} />}
					{data.new_url && <LinkRow title="New URL" link={data.new_url} />}
					{data.eth_address && <LinkRow title="ETH address" link={data.eth_address} isLinkOut />}
					{data.new_eth_address && <LinkRow title="New ETH address" link={data.new_eth_address} isLinkOut />}
					{data.btc_address && <LinkRow title="BTC address" link={data.btc_address} isLinkOut />}
					{data.new_btc_address && <LinkRow title="New BTC address" link={data.new_btc_address} isLinkOut />}
					{data.to_account && <LinkRow title="To account" account={{ value: data.to_account.value, link: data.to_account.link }} />}
					{data.registrar && <LinkRow title="Registrar" account={{ value: data.registrar.value, link: data.registrar.link }} />	}
					{data.account_name && <LinkRow title="Account Name" account={{ value: data.account_name.value, link: data.account_name.link }} />}
					{data.proposal_id && <LinkRow title="Proposal ID" link={data.proposal_id} />}
					{data.new_account_id && <LinkRow title="New Account ID" link={URLHelper.createUrlById(data.new_account_id)} />}
					{data.expiration_time && <PrimaryRow title="Expiration time" description={moment(data.expiration_time).format('DD MMM, Y, HH:mm:ss')} />}
					{data.preview_period && <PrimaryRow title="Preview period" description={data.preview_period} />}
					{data.asset_name && <PrimaryRow title="Asset Name" description={data.asset_name} />}
					{data.precision && <PrimaryRow title="Precision" description={data.precision} />}
					{data.max_suply && <PrimaryRow title="Max Suply" description={data.max_suply} />}
					{data.asset_description && <PrimaryRow title="Asset Description" description={data.asset_description} isText />}
					{data.rate && <PrimaryRow title="Rate" description={FormatHelper.formatAmount(data.rate.amount, data.rate.precision, data.rate.symbol)} />}
					{data.is_bit_asset && <PrimaryRow title="Is bitAsset" description={data.is_bit_asset ? 'Yes' : 'No'} />}
					{data.settings && <SettingsRow title="Settings" settings={data.settings} />}
					{data.authority && <AuthorityRow title="Authority" tooltip="Public keys and accounts" authority={data.authority} />}
					{data.approvals_to_add && <AuthorityRow title="Approvals to add" authority={data.approvals_to_add} />}
					{data.approvals_to_remove && <AuthorityRow title="Approvals to add" authority={data.approvals_to_remove} />}
					{data.echorand_key && <PrimaryRow title="EchoRand Key" description={data.echorand_key} />}
					{data.account_updated && <LinkRow title="Account updated" account={{ value: data.account_updated.value, link: data.account_updated.link }} />}
					{data.delegating_account && <LinkRow title="Delegating Account" account={{ value: data.delegating_account.value, link: data.delegating_account.link }} />}
					{data.delegate_share &&
					<PrimaryRow
						title="Delegate share"
						description={FormatHelper.formatAmount(data.delegate_share.amount, data.delegate_share.precision, data.delegate_share.symbol)}
					/>}
					{data.amount && <PrimaryRow title="Amount" description={FormatHelper.formatAmount(data.amount.amount, data.amount.precision, data.amount.symbol)} />}
					{data.deposit_amount && <PrimaryRow title="Deposit amount" description={data.deposit_amount} />}
					{data.new_status && <PrimaryRow title="New status" description={data.new_status} />}
					{data.label && <PrimaryRow title="Label" description={data.label} />}
					{data.bit_asset_options && <MultyRow title="bitAsset options:" fields={data.bit_asset_options} />}
					{data.new_feed_producers && <ProducersRow title="New feed producers" accounts={data.new_feed_producers} /> }
					{data.feeded_asset_price &&
					<PrimaryRow
						title="Feeded asset price"
						description={FormatHelper.formatAmount(data.feeded_asset_price.amount, data.feeded_asset_price.precision, data.feeded_asset_price.symbol)}
					/>}
					{data.changed_parameters && <PrimaryRow title="Changed parameters" description={data.changed_parameters.join(', ')} />}
					{data.fee && <PrimaryRow title="Fee" description={FormatHelper.formatAmount(data.fee.amount, data.fee.precision, data.fee.symbol)} />}
					{data.directLink && <LinkRow title="Operation direct link" link={data.directLink} />}
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
