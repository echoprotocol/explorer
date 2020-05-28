import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { validators } from 'echojs-lib';
import BN from 'bignumber.js';
import { fromJS } from 'immutable';

import Loader from '../Loader';
import InnerHeader from '../InnerHeader';
import InfoBlock from '../InfoBlock';
import InfoBlockItem from '../InfoBlock/InfoBlockItem';

import {
	ECHO_ASSET,
	TITLE_TEMPLATES,
} from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';
import { getFullAssetInformation } from '../../actions/AssetActions';
import { SSR_ACCOUNTS_PATH, SSR_ASSET_PATH } from '../../constants/RouterConstants';
import GlobalActions from '../../actions/GlobalActions';

import settings from './settingsData';

class Asset extends React.Component {

	constructor() {
		super();
		this.state = {
			asset: null,
			issuer: null,
		};
	}

	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps.asset && nextProps.asset !== state.asset) {
			return {
				asset: fromJS(nextProps.asset),
				issuer: fromJS(nextProps.issuer),
			};
		}
		return null;
	}

	componentDidMount() {
		if (!this.state.asset) {
			this.updateAssetData(this.props.router.query.id);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.router.query.id !== this.props.router.query.id) {
			this.updateAssetData(this.props.router.query.id);
		}
	}

	updateAssetData(id) {
		this.props.getAssetInfo(id)
			.then(({ asset, issuer }) => {
				this.setState({
					asset: fromJS(asset),
					issuer: fromJS(issuer),
				});
				this.props.setTitle(TITLE_TEMPLATES.ASSET.replace(/name/, asset.symbol));
			});
	}

	renderLoader() {
		return <Loader />;
	}

	renderAsset() {
		const { asset, issuer } = this.state;
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
				.div(new BN(quoteAmount).div(`1e${assetPrecision}`)).toString(10);
			poolBalance = feePool === 0 ? 0 : FormatHelper
				.formatAmount(new BN(feePool).div(baseAmount).toString(10), ECHO_ASSET.PRECISION);
			unclamedIssuerBalances = accumulatedFees === 0 ? 0 : FormatHelper
				.formatAmount(new BN(accumulatedFees).div(quoteAmount).toString(10), assetPrecision);
		}

		const maxSupplyFormated = FormatHelper.formatAmount(maxSupply, assetPrecision);

		return (
			<div className="asset-container">
				<div className="title">Asset: {assetSymbol}</div>
				<div className="help-container">
					<div className="asset-elem">
						<div className="title">Asset info</div>
						<div className="list">
							<div className="block">
								<div className="title">Issuer</div>
								<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrl(issuerName)}>
									<a className="blue">{issuerName}</a>
								</Link>
							</div>
							<div className="block">
								<div className="title">Precision</div>
								<div className="val">{assetPrecision}</div>
							</div>
							<div className="block">
								<div className="title">Current supply</div>
								<div className="val">
									<span>{currentSupply}</span>
								</div>
							</div>
							<div className="block">
								<div className="title">Max supply</div>
								<div className="val">
									<span>{maxSupplyFormated}</span>
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
											<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO_ASSET.ID)}>
												<a className="blue">{ECHO_ASSET.SYMBOL}</a>
											</Link>
											<span className="gray">&nbsp;/&nbsp;</span>
											<span className="gray">{assetSymbol}</span>
										</div>
									</div>
									<div className="block">
										<div className="title">Pool balance</div>
										<div className="val">
											<span className="txt">{poolBalance}</span>
											<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO_ASSET.ID)} >
												<a className="blue">{ECHO_ASSET.SYMBOL}</a>
											</Link>
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
		const { asset, issuer } = this.state;
		const assetSymbol = asset && asset.get('symbol');
		const issuerName = issuer && issuer.get('name');
		const assetPrecision = asset && asset.get('precision');
		const currentSupply = asset && asset.getIn(['dynamic', 'current_supply']);
		const maxSupply = asset && asset.getIn(['options', 'max_supply']);
		const isbitAsset = asset && !!asset.get('bitasset_data_id');
		return (
			<div className="inner-container indent-lg">
				{(asset === null && issuer === null) ?
					<Loader /> :
					<React.Fragment>
						<InnerHeader title={`Asset: ${assetSymbol}`} className="committee-members" />
						<InfoBlock settings={settings}>
							<InfoBlockItem
								title="Issuer"
								value={issuerName}
								isLink
								href={SSR_ACCOUNTS_PATH}
								as={URLHelper.createAccountUrl(issuerName)}
								className="issuer"
							/>
							<InfoBlockItem title="Precision" value={`${assetPrecision} kb`} className="precision" />
							<InfoBlockItem title="Current supply" value={currentSupply} className="current-supply" />
							<InfoBlockItem title="Max supply" value={maxSupply} className="max-supply" />
							<InfoBlockItem title="Bit asset" value={isbitAsset ? 'yes' : 'no'} className="bit-asset" />
						</InfoBlock>
					</React.Fragment>
				}
			</div>
		);
	}

}

Asset.propTypes = {
	router: PropTypes.object.isRequired,
	getAssetInfo: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
};

Asset.defaultProps = {};

Asset.getInitialProps = async ({ query, store }) => {
	const { asset, issuer } = await store.dispatch(getFullAssetInformation(query.id));
	const title = TITLE_TEMPLATES.ASSET.replace(/name/, asset.symbol);
	await store.dispatch(GlobalActions.setTitle(title));
	return { asset, issuer };
};

export default Asset;
