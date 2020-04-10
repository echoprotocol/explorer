import React from 'react';
import Link from 'next/link';

import { ECHO } from '../../constants/TotalSupplyConstants';

import { TotalSupplyIcon } from '../Icons/TotalSupplyIcon';
import { subscribeAssetUpdate } from '../../services/subscriptions/asset';
import FormatHelper from '../../helpers/FormatHelper';
import { SSR_ASSET_PATH } from '../../constants/RouterConstants';
import URLHelper from '../../helpers/URLHelper';

class TotalSupply extends React.Component {

	constructor() {
		super();
		this.updateAssetSubscriber = null;
		this.state = {
			isOpenAssets: false,
			assets: null,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.assets && !prevState.assets) {
			return {
				assets: nextProps.assets.toJS(),
			};
		}
		return null;
	}

	componentDidMount() {
		this.subscribe();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onToggleAssets(e) {
		e.preventDefault();
		this.setState({
			isOpenAssets: !this.state.isOpenAssets,
		});
	}

	unsubscribe() {
		if (!this.updateAssetSubscriber) { return; }
		this.updateAssetSubscriber.unsubscribe();
		this.updateAssetSubscriber = null;
	}

	async subscribe() {
		const updateAsset = await subscribeAssetUpdate([ECHO.ID]);

		const nextUpdate = ({ data: { assetUpdated } }) => this.updateAssetInfo(assetUpdated);

		this.updateAssetSubscriber = updateAsset.subscribe({
			next: nextUpdate.bind(this),
			error: (err) => { console.log('Update asset error: ', err.message || err); },
		});
	}

	updateAssetInfo(asset) {
		this.setState({
			assets: {
				[asset.id]: asset,
			},
		});
	}

	render() {
		const { assets } = this.state;

		return (
			<React.Fragment>
				<div className="total-supply">
					<TotalSupplyIcon />
					<div className="total-supply-value">
						{assets && assets[ECHO.ID] ? FormatHelper.formatAmount(assets[ECHO.ID].dynamic.current_supply) : '-'}
					</div>
					<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO.ID)}>
						<a href="" className="total-supply-coin">
							{ECHO.SYMBOL}
						</a>
					</Link>
				</div>
				{/* <a className="sidebar-element-link" href="" onClick={(e) => this.onToggleAssets(e)}> */}
				{/*	View all Assets */}
				{/* </a> */}
			</React.Fragment>
		);
	}

}

TotalSupply.propTypes = {};

TotalSupply.defaultProps = {};

export default TotalSupply;
