import React from 'react';
import Link from 'next/link';
import Tooltip from 'rc-tooltip';

import { ECHO } from '../../constants/TotalSupplyConstants';

import { TotalSupplyIcon } from '../Icons/TotalSupplyIcon';
import FormatHelper from '../../helpers/FormatHelper';
import { SSR_ASSET_PATH } from '../../constants/RouterConstants';
import URLHelper from '../../helpers/URLHelper';

class TotalSupply extends React.Component {

	constructor() {
		super();
		this.state = {
			isOpenAssets: false,
			assets: null,
		};
	}

	static getDerivedStateFromProps(nextProps) {
		if (nextProps.assets) {
			return {
				assets: nextProps.assets.toJS(),
			};
		}
		return nextProps;
	}

	onToggleAssets(e) {
		e.preventDefault();
		this.setState({
			isOpenAssets: !this.state.isOpenAssets,
		});
	}

	render() {
		const { assets } = this.state;
		const amount = assets && assets[ECHO.ID] ? FormatHelper.formatAmount(assets[ECHO.ID].dynamic.current_supply, ECHO.PRECISION) : '0';
		return (
			<React.Fragment>
				<div className="total-supply">
					<TotalSupplyIcon />
					<Tooltip
						placement="top"
						overlayClassName="verify-contract-tooltip"
						trigger={['hover']}
						overlay={amount}
					>
						<div className="total-supply-value">
							{amount}
						</div>
					</Tooltip>
					<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO.ID)}>
						<a href="" className="total-supply-coin">
							{ECHO.SYMBOL}
						</a>
					</Link>
				</div>
				{/* <a className="sidebar-element-link" href="" onClick={(e) => this.onToggleAssets(e)}>
					View all Assets
				</a> */}
			</React.Fragment>
		);
	}

}

TotalSupply.propTypes = {};

TotalSupply.defaultProps = {};

export default TotalSupply;
