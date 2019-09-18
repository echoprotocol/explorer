import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { NONE_SYMBOL } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

class ContractInfoBlock extends React.Component {

	render() {
		const { data } = this.props;
		let [blockNumber, creationFee, type, contractTxs, countUsedByAccount,
			assets, accuracy, compilerVersion] = NONE_SYMBOL.repeat(8);
		if (!data.get('error')) {
			blockNumber = data.get('blockNumber');
			creationFee = FormatHelper.formatAmount(data.getIn(['creationFee', 'amount']), data.getIn(['creationFee', 'precision']), data.getIn(['creationFee', 'symbol']));
			type = data.get('type').join(',').toUpperCase();
			contractTxs = data.get('contractTxs');
			countUsedByAccount = data.get('countUsedByAccount');
			assets = data.get('supportedAsset') || 'All';
			accuracy = data.get('ethAccuracy') ? 'Active' : 'Inactive';
			compilerVersion = data.get('compilerVersion');
		}

		return (
			<div className="contract-info-block">
				<div className="line">
					<div className="key">Block:</div>
					<div className="underline" />
					<div className="value">
						{blockNumber === NONE_SYMBOL ? blockNumber : (
							<Link
								to={URLHelper.createBlockUrl(data.get('blockNumber'))}
								className="blue"
							>
								{blockNumber}
							</Link>
						)}
					</div>
				</div>
				<div className="line">
					<div className="key">Creation FEE:</div>
					<div className="underline" />
					<div className="value">
						{creationFee}
					</div>
				</div>
				<div className="line">
					<div className="key">Type:</div>
					<div className="underline" />
					<div className="value">{type}</div>
				</div>
				<div className="line">
					<div className="key">Contract txs:</div>
					<div className="underline" />
					<div className="value">{contractTxs}</div>
				</div>
				<div className="line">
					<div className="key">Used by accounts:</div>
					<div className="underline" />
					<div className="value">{countUsedByAccount}</div>
				</div>
				<div className="line">
					<div className="key">Supported assets:</div>
					<div className="underline" />
					<div className="value">{assets}</div>
				</div>
				<div className="line">
					<div className="key">Eth accuracy:</div>
					<div className="underline" />
					<div className="value">{accuracy}</div>
				</div>
				{data.get('compilerVersion') &&
					<div className="line">
						<div className="key">Compiler version:</div>
						<div className="underline" />
						<div className="value">{compilerVersion}</div>
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
