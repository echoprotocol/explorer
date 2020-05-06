import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { NONE_SYMBOL, NOT_AVAILABLE_SYMBOL } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import { SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';

import InfoTooltip from '../InfoTooltip';

class ContractInfoBlock extends React.Component {

	render() {
		const { data } = this.props;
		let [blockNumber, creationFee, type, contractTxs, countUsedByAccount,
			assets, accuracy, compilerVersion] = NONE_SYMBOL.repeat(8);
		let erc20Token = null;
		let countTokenTransfer = 0;
		if (!data.get('error')) {
			blockNumber = data.get('blockNumber');
			creationFee = FormatHelper.formatAmount(data.getIn(['creationFee', 'amount']), data.getIn(['creationFee', 'precision']), data.getIn(['creationFee', 'symbol']));
			type = data.get('type').filter((typeKey) => typeKey !== 'common').join(', ').toUpperCase();
			contractTxs = data.get('contractTxs');
			countUsedByAccount = data.get('countUsedByAccount');
			assets = data.get('supportedAsset') || 'All';
			accuracy = data.get('ethAccuracy') ? 'Active' : 'Inactive';
			compilerVersion = data.get('compilerVersion');
			countTokenTransfer = data.get('countTokenTransfer');
			if (data.get('token') && data.get('token').type === 'erc20') {
				erc20Token = data.get('token');
			}
		}
		const creationFeeData = creationFee.split(' ');
		return (
			<div className="left-card">
				<div className="line">
					<div className="title">Block:</div>
					<div className="divider" />
					<div className="val name">
						{blockNumber === NONE_SYMBOL ? blockNumber : (
							<Link
								href={SSR_BLOCK_INFORMATION_PATH}
								as={URLHelper.createBlockUrl(data.get('blockNumber'))}
							>
								<a className="blue">{blockNumber}</a>
							</Link>
						)}
					</div>
				</div>
				<div className="line">
					<div className="title">
						<span>Creation FEE:</span>
						<InfoTooltip overlay={creationFee} iconFilled={false} />
					</div>
					<div className="divider" />
					<div className="val">
						<span className="amount">
							{creationFeeData[0]}
						</span>
						<span className="currency">&nbsp;{creationFeeData[1]}</span>
					</div>
				</div>
				<div className="line">
					<div className="title">Type:</div>
					<div className="divider" />
					<div className="val name">{type}</div>
				</div>
				<div className="line">
					<div className="title">Contract txs:</div>
					<div className="divider" />
					<div className="val name">{contractTxs}</div>
				</div>
				<div className="line">
					<div className="title">
						<span>Used by accounts:</span>
						<InfoTooltip overlay={countUsedByAccount} iconFilled={false} />
					</div>
					<div className="divider" />
					<div className="val name">{countUsedByAccount}</div>
				</div>
				<div className="line">
					<div className="title">Supported assets:</div>
					<div className="divider" />
					<div className="val name">{assets}</div>
				</div>
				<div className="line">
					<div className="title">Eth accuracy:</div>
					<div className="divider" />
					<div className="val name">{accuracy}</div>
				</div>
				{erc20Token && (
					<React.Fragment>
						<div className="line">
							<div className="title">Token symbol(name):</div>
							<div className="divider" />
							<div className="val name">{`${erc20Token.symbol || NOT_AVAILABLE_SYMBOL} (${erc20Token.name || NOT_AVAILABLE_SYMBOL})`}</div>
						</div>
						<div className="line">
							<div className="title">Decimals:</div>
							<div className="divider" />
							<div className="val name">{erc20Token.decimals || NOT_AVAILABLE_SYMBOL}</div>
						</div>
						<div className="line">
							<div className="title">Total supply:</div>
							<div className="divider" />
							<div className="val name">{erc20Token.total_supply || NOT_AVAILABLE_SYMBOL}</div>
						</div>
						<div className="line">
							<div className="title">Transfers:</div>
							<div className="divider" />
							<div className="val name">{countTokenTransfer}</div>
						</div>
					</React.Fragment>
				)}
				{data.get('compilerVersion') &&
					<div className="line">
						<div className="title">Compiler version:</div>
						<div className="divider" />
						<div className="val name">{compilerVersion}</div>
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
