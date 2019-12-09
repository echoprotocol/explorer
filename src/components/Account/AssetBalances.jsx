import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import { CROPPED_ACCOUNT_SIZE, MAX_ACCOUNT_LETTERS_SIZE } from '../../constants/GlobalConstants';
import MediaAssetTooltip from '../MediaAssetTooltip';

class AssetBalances extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoadedMore: false,
			DEFAULT_COUNT: 4,
		};
	}

	onLoadMore(e) {
		e.preventDefault();

		this.setState({ isLoadedMore: !this.state.isLoadedMore });
	}

	renderElement(id, asset, amount, isOwner) {
		const assetAmount = FormatHelper.formatAmount(amount, asset.get('precision'));
		return (
			<div key={id} className={classnames('inner-elem', { 'is-owner': isOwner })}>
				<MediaAssetTooltip
					maxWidth={800}
					assetAmount={assetAmount}
					maxSize={MAX_ACCOUNT_LETTERS_SIZE}
					croppedSize={CROPPED_ACCOUNT_SIZE}
				/>
				<span className="accent">
					<Link to={URLHelper.createUrlById(asset.get('id'))} className="blue">
						{asset.get('symbol')}
					</Link>
				</span>
			</div>
		);
	}

	render() {
		const { owner, balances, title } = this.props;
		const { isLoadedMore, DEFAULT_COUNT } = this.state;
		const count = balances.size || balances.length;

		const elements = isLoadedMore ? balances : balances.slice(0, DEFAULT_COUNT);

		return (
			<div className="elem">
				<div className="title">
					{title}: {count || <span className="gray">none</span>}
				</div>
				<div className="elements-container">
					{
						elements.map(({ amount, asset, id }) => this.renderElement(
							id,
							asset,
							amount,
							owner ? owner.includes(asset.get('id')) : false,
						))
					}
				</div>
				{
					count > DEFAULT_COUNT ?
						<a href="" className="load-more" onClick={(e) => this.onLoadMore(e)}>
							{isLoadedMore ? 'Show less' : `View ${count - DEFAULT_COUNT} more`}
						</a> : null
				}
			</div>
		);
	}

}

AssetBalances.propTypes = {
	balances: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	owner: PropTypes.object,
	title: PropTypes.string.isRequired,
};

AssetBalances.defaultProps = {
	balances: null,
	owner: null,
};

export default AssetBalances;
