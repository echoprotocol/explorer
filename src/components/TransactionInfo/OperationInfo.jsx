import React from 'react';
import PropTypes from 'prop-types';

import FormatHelper from '../../helpers/FormatHelper';

import OperationInfoRow from './OperationInfoRow';

import URLHelper from '../../helpers/URLHelper';

class OperationInfo extends React.Component {


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
				{data.sender && <OperationInfoRow title="From" account={{ name: data.sender.value, id: data.sender.link }} />}
				{data.from && <OperationInfoRow title="From" account={{ name: data.from.value, id: data.from.link }} />}
				{data.to && <OperationInfoRow title="To" account={{ name: data.to.value, id: data.to.link }} />}
				{data.listed_account && <OperationInfoRow title="Listed account" account={{ name: data.listed_account.value, id: data.listed_account.link }} />}
				{data.to_address && <OperationInfoRow title="To address" link={data.to_address} />}
				{data.to_account && <OperationInfoRow title="To account" account={{ name: data.to_account.value, id: data.to_account.link }} />}
				{data.registrar && <OperationInfoRow title="Registrar" account={{ name: data.registrar.value, id: data.registrar.link }} />	}
				{data.account_name && <OperationInfoRow title="Account Name" account={{ name: data.account_name.value, id: data.account_name.link }} />}
				{data.new_account_id && <OperationInfoRow title="New Account ID" link={URLHelper.createUrlById(data.new_account_id)} />}
				{data.authority &&
					<OperationInfoRow
						title="Authority"
						description="Public keys and accounts"
						tooltip="Treshold"
						authority={data.authority}
					/>}
				{data.echorand_key && <OperationInfoRow title="EchoRand Key" description={data.echorand_key} />}
				{data.account_updated && <OperationInfoRow title="Account updated" account={{ name: data.account_updated.value, id: data.account_updated.link }} />}
				{data.delegating_account &&
					<OperationInfoRow
						title="Delegating Account"
						account={{ name: data.delegating_account.value, id: data.delegating_account.link }}
					/>}
				{data.delegate_share &&
					<OperationInfoRow
						title="Delegate share"
						description={FormatHelper.formatAmount(data.delegate_share.amount, data.delegate_share.precision, data.delegate_share.symbol)}
					/>}
				{data.amount && <OperationInfoRow title="Amount" description={FormatHelper.formatAmount(data.amount.amount, data.amount.precision, data.amount.symbol)} />}
				{data.new_status && <OperationInfoRow title="New status" description={data.new_status} />}
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
