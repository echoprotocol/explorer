import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import AssetAmountTooltip from './AssetAmountTooltip';

class MediaAssetTooltip extends React.Component {

	tooltipRender(maxWidth, assetAmount, maxSize, croppedSize, symbol) {
		return (
			<Media query={`(max-width: ${maxWidth}px)`}>
				{(matches) =>
					(matches ? (
						<AssetAmountTooltip
							assetAmount={assetAmount}
							maxSize={maxSize}
							symbol={symbol}
						/>
					) : (
						<AssetAmountTooltip
							assetAmount={assetAmount}
							maxSize={maxSize}
							croppedSize={croppedSize}
							symbol={symbol}
						/>
					))
				}
			</Media>
		);
	}

	render() {
		const {
			maxWidth, assetAmount, maxSize, croppedSize, symbol,
		} = this.props;

		return this.tooltipRender(maxWidth, assetAmount, maxSize, croppedSize, symbol);
	}

}

MediaAssetTooltip.propTypes = {
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	assetAmount: PropTypes.string,
	maxSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	croppedSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	symbol: PropTypes.string,
};

MediaAssetTooltip.defaultProps = {
	maxWidth: '',
	assetAmount: '',
	maxSize: '',
	croppedSize: '',
	symbol: '',
};

export default MediaAssetTooltip;
