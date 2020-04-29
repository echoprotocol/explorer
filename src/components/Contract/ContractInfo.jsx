import React from 'react';
import PropTypes from 'prop-types';

import { SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { NONE_SYMBOL, NOT_AVAILABLE_SYMBOL } from '../../constants/GlobalConstants';
import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

import AssetBalances from '../Account/AssetBalances';
import TokenBalances from '../Account/TokenBalances';
import ContractDescription from './ContractDescription';
import AccountInfo from '../Account/AccountInfo';
import AccountInfoRow from '../Account/AccountInfoRow';

class ContractInfo extends React.Component {

	render() {
		const { dataDescription, dataAssets, dataGeneral } = this.props;
		let [blockNumber, creationFee, type, contractTxs, countUsedByAccount,
			assets, accuracy, compilerVersion] = NONE_SYMBOL.repeat(8);
		let erc20Token = null;
		let countTokenTransfer = 0;
		if (!dataGeneral.get('error')) {
			blockNumber = dataGeneral.get('blockNumber');
			creationFee = FormatHelper.formatAmount(dataGeneral.getIn(['creationFee', 'amount']), dataGeneral.getIn(['creationFee', 'precision']), dataGeneral.getIn(['creationFee', 'symbol']));
			type = dataGeneral.get('type').filter((typeKey) => typeKey !== 'common').join(', ').toUpperCase();
			contractTxs = dataGeneral.get('contractTxs');
			countUsedByAccount = dataGeneral.get('countUsedByAccount');
			assets = dataGeneral.get('supportedAsset') || 'All';
			accuracy = dataGeneral.get('ethAccuracy') ? 'Active' : 'Inactive';
			compilerVersion = dataGeneral.get('compilerVersion');
			countTokenTransfer = dataGeneral.get('countTokenTransfer');
			if (dataGeneral.get('token') && dataGeneral.get('token').type === 'erc20') {
				erc20Token = dataGeneral.get('token');
			}
		}
		const creationFeeData = creationFee.split(' ');
		return (
			<div className="page-t-block">
				<div className="help-container">
					<AccountInfo>
						<AccountInfoRow
							title="Block"
							value={blockNumber}
							link={{
								href: SSR_BLOCK_INFORMATION_PATH,
								as: URLHelper.createBlockUrl(blockNumber),
							}}
						/>
						<AccountInfoRow
							title="Creation fee"
							tooltip={creationFee}
							amount={{
								value: creationFeeData[0],
								symbol: creationFeeData[1],
							}}
						/>
						<AccountInfoRow title="Type" value={type} />
						<AccountInfoRow title="Contract txs" value={contractTxs} />
						<AccountInfoRow title="Used by accounts" value={countUsedByAccount} tooltip={`${countUsedByAccount}`} />
						<AccountInfoRow title="Supported assets" value={assets} />
						<AccountInfoRow title="Eth accuracy" value={accuracy} />
						{erc20Token && (
							<React.Fragment>
								<AccountInfoRow title="Token symbol(name)" value={`${erc20Token.symbol || NOT_AVAILABLE_SYMBOL} (${erc20Token.name || NOT_AVAILABLE_SYMBOL})`} />
								<AccountInfoRow title="Decimals" value={erc20Token.decimals || NOT_AVAILABLE_SYMBOL} />
								<AccountInfoRow title="Total supply" value={erc20Token.total_supply || NOT_AVAILABLE_SYMBOL} />
								<AccountInfoRow title="Transfers" value={countTokenTransfer} />
							</React.Fragment>
						)}
						{compilerVersion &&
						<AccountInfoRow title="Compiler version" value={compilerVersion} />
						}
					</AccountInfo>
					<div className="right-container">
						<ContractDescription data={dataDescription} />
						<AssetBalances title="Assets" balances={dataAssets.get('balances')} />
						<TokenBalances title="Tokens" tokens={[]} />
					</div>
				</div>
			</div>
		);
	}

}

ContractInfo.propTypes = {
	dataDescription: PropTypes.object.isRequired,
	dataAssets: PropTypes.object.isRequired,
	dataGeneral: PropTypes.object.isRequired,
};

ContractInfo.defaultProps = {};

export default ContractInfo;
