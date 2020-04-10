import React from 'react';

import { ECHO } from '../../constants/TotalSupplyConstants';

import { TotalSupplyIcon } from '../Icons/TotalSupplyIcon';
import { subscribeAssetUpdate } from '../../services/subscriptions/asset';
import FormatHelper from '../../helpers/FormatHelper';

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
					<div className="total-supply-coin">{ECHO.SYMBOL}</div>
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
