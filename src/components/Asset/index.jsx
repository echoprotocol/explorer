import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { validators } from 'echojs-lib';
import BN from 'bignumber.js';

import RecentBlockSidebar from '../../containers/RecentBlockSection/RecentBlockSidebar';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

class Asset extends React.Component {

	componentDidMount() {
		this.props.getAssetInfo();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.props.getAssetInfo();
		}
	}

	renderLoader() {
		// TODO loader
		return null;
	}

	renderAsset() {

		const {
			asset, issuer,
		} = this.props;

		const issuerName = issuer.get && issuer.get('name');
		const issuerId = issuer.get && issuer.get('id');

		const assetSymbol = asset.get && asset.get('symbol');
		const assetPrecision = asset.get && asset.get('precision');
		const currentSupply = asset.get && asset.get('dynamic').current_supply;
		const maxSupply = asset.getIn && asset.getIn(['options', 'max_supply']);

		const feePool = asset.get && asset.get('dynamic').fee_pool;
		const accumulatedFees = asset.get && asset.get('dynamic').accumulated_fees;

		const baseAmount = asset.getIn && asset.getIn(['options', 'core_exchange_rate', 'base', 'amount']);
		const quoteAmount = asset.getIn && asset.getIn(['options', 'core_exchange_rate', 'quote', 'amount']);

		let poolBalance;
		let exchangeRate;
		let unclamedIssuerBalances;

		if (
			validators.isVoid(baseAmount) ||
			validators.isVoid(quoteAmount) ||
			validators.isVoid(feePool) ||
			validators.isVoid(accumulatedFees) ||
			assetSymbol
		) {
			exchangeRate = `${new BN(baseAmount).div(quoteAmount).toString()} ECHO / ${assetSymbol}`;
			poolBalance = feePool === 0 ? 0 : new BN(feePool).div(baseAmount).toString();
			unclamedIssuerBalances = accumulatedFees === 0 ? 0 : new BN(accumulatedFees).div(quoteAmount).toString();
		}

		return (
			<React.Fragment>
				<div className="recent-block-section">
					<div className="wrap">
						<div className="table-container inner-information-container block-information account-asset-page">
							{
								assetSymbol && (
									<div className="asset-container">
										<div className="title">Asset <span className="accent">{assetSymbol}</span></div>
										<div className="help-container">
											<div className="asset-elem">
												<div className="title">Asset info</div>
												<div className="list">
													<div className="block">
														<div className="title">Issuer</div>
														<Link to={URLHelper.createAccountUrl(issuerId)} className="val blue">{issuerName}</Link>
													</div>
													<div className="block">
														<div className="title">Precision</div>
														<div className="val">{assetPrecision}</div>
													</div>
													<div className="block">
														<div className="title">Current supply</div>
														<div className="val">{FormatHelper.formatAmount(currentSupply)}</div>
													</div>
													<div className="block">
														<div className="title">Max supply</div>
														<div className="val">{FormatHelper.formatAmount(maxSupply)}</div>
													</div>
												</div>
											</div>
											<div className="asset-elem">
												<div className="title">FreePool info</div>
												<div className="list">
													<div className="block">
														<div className="title">Echo exchange rate</div>
														<a href="" className="val blue">{exchangeRate}</a>
													</div>
													<div className="block">
														<div className="title">Pool balance</div>
														<div className="val"><span className="txt">{poolBalance}</span>
															<Link to={URLHelper.createAssetUrl('1.3.0')} className="blue">ECHO</Link>
														</div>
													</div>
													<div className="block">
														<div className="title">Unclaimed issuer Balance</div>
														<div className="val"><span className="txt">{unclamedIssuerBalances}</span><span className="gray">{assetSymbol}</span></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							}
						</div>
						<RecentBlockSidebar />
					</div>
				</div>
			</React.Fragment>
		);
	}

	render() {

		// return blockInformation.get('blockNumber') ? this.renderAsset() : this.renderLoader();
		return this.renderAsset();
	}

}

Asset.propTypes = {
	asset: PropTypes.object.isRequired,
	issuer: PropTypes.object.isRequired,
	getAssetInfo: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default Asset;
