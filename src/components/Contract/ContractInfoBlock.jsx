import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

class ContractInfoBlock extends React.Component {

	render() {
		const { data } = this.props;

		return (
			<div className="contract-info-block">
				<div className="line">
					<div className="key">Block:</div>
					<div className="underline" />
					<div className="value">
						<Link
							to={URLHelper.createBlockUrl(data.get('blockNumber'))}
							className="blue"
						>
							{data.get('blockNumber')}
						</Link>
					</div>
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
