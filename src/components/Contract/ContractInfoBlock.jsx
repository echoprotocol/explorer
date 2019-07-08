import React from 'react';
import PropTypes from 'prop-types';
import FormatHelper from '../../helpers/FormatHelper';

class ContractInfoBlock extends React.Component {

	render() {
		const { data } = this.props;

		return (
			<div className="contract-info-block">
				<div className="line">
					<div className="key">Block:</div>
					<div className="underline" />
					<div className="value blue">{data.get('blockNumber')}</div>
				</div>
				<div className="line">
					<div className="key">Creation FEE:</div>
					<div className="underline" />
					<div className="value">
						{FormatHelper.formatAmount(data.getIn(['creationFee', 'amount']), data.getIn(['creationFee', 'precision']), data.getIn(['creationFee', 'symbol']))}
					</div>
				</div>
				<div className="line">
					<div className="key">Type:</div>
					<div className="underline" />
					<div className="value">{data.get('type').join(',').toUpperCase()}</div>
				</div>
				<div className="line">
					<div className="key">Contract txs:</div>
					<div className="underline" />
					<div className="value">{data.get('contractTxs')}</div>
				</div>
				<div className="line">
					<div className="key">Used by accounts:</div>
					<div className="underline" />
					<div className="value">{data.get('countUsedByAccount')}</div>
				</div>
				<div className="line">
					<div className="key">Supported assets:</div>
					<div className="underline" />
					<div className="value">{data.get('supportedAsset') || 'All'}</div>
				</div>
				<div className="line">
					<div className="key">Eth accuracy:</div>
					<div className="underline" />
					<div className="value">{data.get('ethAccuracy') ? 'Active' : 'Inactive'}</div>
				</div>
				{data.get('compilerVersion') &&
					<div className="line">
						<div className="key">Compiler version:</div>
						<div className="underline" />
						<div className="value">{data.get('compilerVersion')}</div>
					</div>
				}
			</div>
		);
	}

}

ContractInfoBlock.propTypes = {
	data: PropTypes.object.isRequired,
};

ContractInfoBlock.defaultProps = {};

export default ContractInfoBlock;
