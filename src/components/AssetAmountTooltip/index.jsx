import React from 'react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';

class AssetAmountTooltip extends React.Component {

	assetRender(assetAmount, maxSize, croppedSize, symbol) {
		if (assetAmount.length > maxSize) {
			return (
				<Tooltip
					placement="top"
					overlayClassName="verify-contract-tooltip"
					trigger={['hover']}
					overlay={assetAmount}
				>
					<span className="txt">{assetAmount.slice(0, croppedSize).concat('...')} {symbol}</span>
				</Tooltip>
			);
		}

		return (<span className="txt">{assetAmount} {symbol}</span>);
	}

	render() {

		const {
			assetAmount, maxSize, croppedSize, symbol,
		} = this.props;

		return this.assetRender(assetAmount, maxSize, croppedSize, symbol);
	}

}

AssetAmountTooltip.propTypes = {
	assetAmount: PropTypes.string,
	maxSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	croppedSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	symbol: PropTypes.string,
};

AssetAmountTooltip.defaultProps = {
	assetAmount: '',
	maxSize: '',
	croppedSize: '',
	symbol: '',
};

export default AssetAmountTooltip;
