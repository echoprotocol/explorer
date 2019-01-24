import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RecentBlockSidebar from '../../containers/RecentBlockSection/RecentBlockSidebar';

import URLHelper from '../../helpers/URLHelper';

class Asset extends React.Component {

	componentDidMount() {
		this.props.getAssetInfo();
	}

	// shouldComponentUpdate(nextProps) {
	//     this.props.getAssetInfo(nextProps.match.params.id);
	//     return true;
	// }

	renderLoader() {
		// TODO loader
		return null;
	}

	renderAsset() {

		const {
			asset, issuer, history,
		} = this.props;

		const issuerName = issuer.get && issuer.get('name');
		const issuerId = issuer.get && issuer.get('id');

		const assetSymbol = asset.get && asset.get('symbol');
		const assetPrecision = asset.get && asset.get('precision');
		const currentSupply = asset.get && asset.get('dynamic').current_supply;
		const feePool = asset.get && asset.get('dynamic').fee_pool;
		const maxSupply = asset.getIn && asset.getIn(['options', 'max_supply']);

		return (
			<React.Fragment>
				<div className="recent-block-section">
					<div className="wrap">
						<div className="table-container inner-information-container block-information account-asset-page">
							{
								assetSymbol && <div className="asset-container">
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
													<div className="val">{currentSupply}</div>
												</div>
												<div className="block">
													<div className="title">Max supply</div>
													<div className="val">{maxSupply}</div>
												</div>
											</div>
										</div>
										<div className="asset-elem">
											<div className="title">FreePool info</div>
											<div className="list">
												<div className="block">
													<div className="title">Echo exchange rate</div>
													<a href="" className="val blue">10000000.000042</a>
												</div>
												<div className="block">
													<div className="title">Pool balance</div>
													<div className="val"><span className="txt">12.30349</span><a href="" className="blue">ECHO</a></div>
												</div>
												<div className="block">
													<div className="title">Unclaimed issuer Balance</div>
													<div className="val"><span className="txt">555555</span><span className="gray">E-ZSCH</span></div>
												</div>
											</div>
										</div>
									</div>
								</div>
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
