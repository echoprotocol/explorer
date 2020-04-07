import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { validators } from 'echojs-lib';
import BN from 'bignumber.js';
import Tooltip from 'rc-tooltip';
import Media from 'react-media';

import Loader from '../Loader';

import {
	ECHO_ASSET,
	TITLE_TEMPLATES,
} from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';

class Asset extends React.Component {

	componentDidMount() {
		this.props.getAssetInfo();
	}

	componentDidUpdate(prevProps) {
		if (this.props.asset) {
			this.props.setTitle(TITLE_TEMPLATES.ASSET.replace(/name/, this.props.asset.get('symbol')));
		}

		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.props.getAssetInfo();
		}
	}

	renderLoader() {
		return <Loader />;
	}

	renderAsset(asset, issuer) {

		const issuerName = issuer.get('name');

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
			<div className="asset-container">
				<div className="title">Asset: {assetSymbol}</div>
				<div className="help-container">
					<div className="asset-elem">
						<div className="title">Asset info</div>
						<div className="list">
							<div className="block">
								<div className="title">Issuer</div>
								<Link to={URLHelper.createAccountUrl(issuerName)} className="val blue">{issuerName}</Link>
							</div>
							<div className="block">
								<div className="title">Precision</div>
								<div className="val">{assetPrecision}</div>
							</div>
							<div className="block">
								<div className="title">Current supply</div>
								<div className="val">
									<Media query="(max-width: 300px)">
										{(matches) =>
											(matches ? (
												<Tooltip
													placement="top"
													overlayClassName="verify-contract-tooltip"
													trigger={['hover']}
													overlay={currentSupply}
												>
													<span className="txt">{currentSupply}</span>
												</Tooltip>
											) : (
												<span>{currentSupply}</span>
											))
										}
									</Media>
								</div>
							</div>
							<div className="block">
								<div className="title">Max supply</div>
								<div className="val">
									<Media query="(max-width: 300px)">
										{(matches) =>
											(matches ? (
												<Tooltip
													placement="top"
													overlayClassName="verify-contract-tooltip"
													trigger={['hover']}
													overlay={maxSupply}
												>
													<span className="txt">{maxSupply}</span>
												</Tooltip>
											) : (
												<span>{maxSupply}</span>
											))
										}
									</Media>
								</div>
							</div>
						</div>
					</div>
					{
						assetSymbol !== ECHO_ASSET.SYMBOL && (
							<div className="asset-elem">
								<div className="title">FeePool info</div>
								<div className="list">
									<div className="block">
										<div className="title">Echo exchange rate</div>
										<div className="val">
											<span className="txt">{exchangeRate}</span>
											<Link to={URLHelper.createAssetUrl(ECHO_ASSET.ID)}>
												<span className="blue">{ECHO_ASSET.SYMBOL}</span>
											</Link>
											<span className="gray">&nbsp;/&nbsp;</span>
											<span className="gray">{assetSymbol}</span>
										</div>
									</div>
									<div className="block">
										<div className="title">Pool balance</div>
										<div className="val">
											<span className="txt">{poolBalance}</span>
											<Link to={URLHelper.createAssetUrl(ECHO_ASSET.ID)} className="blue">{ECHO_ASSET.SYMBOL}</Link>
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
						)
					}
				</div>
			</div>
		);
	}

	render() {
		const { asset, issuer } = this.props;
		return (
			<div className="inner-container account-asset-page">
				{(asset === null && issuer === null) ? this.renderLoader() : this.renderAsset(asset, issuer)}
			</div>
		);
	}

}

Asset.propTypes = {
	asset: PropTypes.object,
	issuer: PropTypes.object,
	getAssetInfo: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
};

Asset.defaultProps = {
	asset: null,
	issuer: null,
};

export default Asset;
