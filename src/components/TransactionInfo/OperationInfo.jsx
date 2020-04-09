import React from 'react';
import PropTypes from 'prop-types';

import FormatHelper from '../../helpers/FormatHelper';

import OperationInfoRow from './OperationInfoRow';

class OperationInfo extends React.Component {


	render() {
		const { data } = this.props;

		return (
			<div className="fold-operation-info">
				<div className="fold-header">
					<span className="fold-title">Operation info</span>
					<button className="yellow-button">View Raw JSON Object</button>
				</div>
				<div className="operation-detail-table">
					{data.type && <OperationInfoRow title="Type" description={data.type} /> }
					{data.registrar && <OperationInfoRow title="Registrar" account={{ name: data.registrar.value, id: data.registrar.link }} />	}
					{data.account_name && <OperationInfoRow title="Account Name" account={{ name: data.account_name.name, id: data.account_name.id }} />}
					{data.new_account_id && <OperationInfoRow title="New Account ID" id={data.new_account_id} />}
					{data.authority &&
					<OperationInfoRow
						title="Authority"
						description="Public keys and accounts"
						tooltip="Treshold"
						authority={data.authority}
					/>}
					{data.echorand_key && <OperationInfoRow title="EchoRand Key" description={data.echorand_key} />}
					{data.delegating_account &&
					<OperationInfoRow
						title="Delegating Account"
						account={{ name: data.delegating_account.name, id: data.delegating_account.id }}
					/>}
					{data.delegate_share &&
					<OperationInfoRow
						title="Delegating Account"
						description={FormatHelper.formatAmount(data.delegate_share.amount, data.delegate_share.precision, data.delegate_share.symbol)}
					/>}
					{data.fee && <OperationInfoRow
						title="Fee"
						description={FormatHelper.formatAmount(data.fee.amount, data.fee.precision, data.fee.symbol)}
					/>}
				</div>
			</div>
		);
	}

}

OperationInfo.defaultProps = {
	data: {},
};
OperationInfo.propTypes = {
	data: PropTypes.object,
};

export default OperationInfo;
