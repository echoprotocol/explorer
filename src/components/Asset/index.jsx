import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { validators } from 'echojs-lib';
import BN from 'bignumber.js';

import Loader from '../Loader';

import { ECHO_ASSET } from '../../constants/GlobalConstants';

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
		return <Loader />;
	}

	renderAsset(asset, issuer) {

		const issuerName = issuer.get('name');
		const issuerId = issuer.get('id');

		const assetId = asset.get('id');
		const assetSymbol = asset.get('symbol');
		const assetPrecision = asset.get('precision');
		const currentSupply = asset.getIn(['dynamic', 'current_supply']);
		const maxSupply = asset.getIn(['options', 'max_supply']);

		const feePool = asset.getIn(['dynamic', 'fee_pool']);
		const accumulatedFees = asset.getIn(['dynamic', 'accumulated_fees']);

		const baseAmount = asset.getIn(['options', 'core_exchange_rate', 'base', 'amount']);
		const quoteAmount = asset.getIn(['options', 'core_exchange_rate', 'quote', 'amount']);

		let poolBalance;
		let exchangeRate;
		let unclamedIssuerBalances;
		if (
			validators.isVoid(baseAmount) ||
                validators.isVoid(quoteAmount) ||
                validators.isVoid(feePool) ||
                validators.isVoid(accumulatedFees) ||
                validators.isVoid(assetPrecision) ||
                assetSymbol
		) {
			exchangeRate = (new BN(baseAmount).div(`1e${ECHO_ASSET.PRECISION}`))
				.div(new BN(quoteAmount).div(`1e${assetPrecision}`)).toString();
			poolBalance = feePool === 0 ? 0 : FormatHelper
				.formatAmount(new BN(feePool).div(baseAmount).toString(), ECHO_ASSET.PRECISION);
			unclamedIssuerBalances = accumulatedFees === 0 ? 0 : FormatHelper
				.formatAmount(new BN(accumulatedFees).div(quoteAmount).toString(), assetPrecision);
		}

		return (
			<React.Fragment>
				<div className="table-container inner-information-container block-information account-asset-page">
					<div className="asset-container">
						<div className="title">Asset {assetSymbol}</div>
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
										<div className="val">{FormatHelper.formatAmount(currentSupply, assetPrecision)}</div>
									</div>
									<div className="block">
										<div className="title">Max supply</div>
										<div className="val">{FormatHelper.formatAmount(maxSupply, assetPrecision)}</div>
									</div>
								</div>
							</div>
							<div className="asset-elem">
								<div className="title">FeePool info</div>
								<div className="list">
									<div className="block">
										<div className="title">Echo exchange rate</div>
										<div className="val">
											<span className="txt">{exchangeRate}</span>
											{
												assetSymbol !== ECHO_ASSET.SYMBOL ?
													(
														<React.Fragment>
															<Link to={URLHelper.createAssetUrl(ECHO_ASSET.ID)} className="blue">
																{ECHO_ASSET.SYMBOL}
															</Link>
															/
															<span className="txt">{assetSymbol}</span>
														</React.Fragment>
													) : (
														<span className="txt">{`${ECHO_ASSET.SYMBOL}/${ECHO_ASSET.SYMBOL}`}</span>
													)
											}
										</div>
									</div>
									<div className="block">
										<div className="title">Pool balance</div>
										<div className="val"><span className="txt">{poolBalance}</span>
											{
												assetSymbol !== ECHO_ASSET.SYMBOL ?
													(
														<Link to={URLHelper.createAssetUrl(ECHO_ASSET.ID)} className="blue">{ECHO_ASSET.SYMBOL}</Link>
													) : (
														<span className="txt">{ECHO_ASSET.SYMBOL}</span>
													)
											}
										</div>
									</div>
									<div className="block">
										<div className="title">Unclaimed issuer Balance</div>
										<div className="val">
											<span className="txt">{unclamedIssuerBalances}</span><span className="gray">{assetSymbol}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { asset, issuer } = this.props;

		return (asset === null && issuer === null) ? this.renderLoader() : this.renderAsset(asset, issuer);
	}

}

Asset.propTypes = {
	asset: PropTypes.object,
	issuer: PropTypes.object,
	getAssetInfo: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

Asset.defaultProps = {
	asset: null,
	issuer: null,
};

export default Asset;
