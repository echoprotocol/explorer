import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Tooltip from 'rc-tooltip';
import Media from 'react-media';

import { NONE_SYMBOL, NOT_AVAILABLE_SYMBOL } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import { SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';

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
			<div className="contract-info-block">
				<div className="line">
					<div className="key">Block:</div>
					<div className="underline" />
					<div className="value">
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
					<div className="key">Creation FEE:</div>
					<div className="underline" />
					<div className="value">
						<Media query="(max-width: 350px)" defaultMatches={data.get('isMobile')}>
							{(matches) =>
								(matches ? (
									<Tooltip
										placement="topLeft"
										overlayClassName="verify-contract-tooltip"
										trigger={['hover']}
										overlay={creationFee}
									>
										<div className="val">
											<div className="txt">{creationFeeData[0]}</div>
											<div className="txt2">{creationFeeData[1]}</div>
										</div>
									</Tooltip>
								) : (
									<span>{creationFee}</span>
								))
							}
						</Media>
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
				{erc20Token && (
					<React.Fragment>
						<div className="line">
							<div className="key">Token symbol(name):</div>
							<div className="underline" />
							<div className="value">{`${erc20Token.symbol || NOT_AVAILABLE_SYMBOL} (${erc20Token.name || NOT_AVAILABLE_SYMBOL})`}</div>
						</div>
						<div className="line">
							<div className="key">Decimals:</div>
							<div className="underline" />
							<div className="value">{erc20Token.decimals || NOT_AVAILABLE_SYMBOL}</div>
						</div>
						<div className="line">
							<div className="key">Total supply:</div>
							<div className="underline" />
							<div className="value">{erc20Token.total_supply || NOT_AVAILABLE_SYMBOL}</div>
						</div>
						{/* <div className="line"> */}
						{/*	<div className="key">Holders:</div> */}
						{/*	<div className="underline" /> */}
						{/*	<div className="value">{erc20Token.holders || 0}</div> */}
						{/* </div> */}
						<div className="line">
							<div className="key">Transfers:</div>
							<div className="underline" />
							<div className="value">{countTokenTransfer}</div>
						</div>
					</React.Fragment>
				)}
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
