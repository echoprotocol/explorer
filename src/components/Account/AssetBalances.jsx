import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import { SSR_ASSET_PATH } from '../../constants/RouterConstants';

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
		return (
			<div key={id} className={classnames('inner-elem', { 'is-owner': isOwner })}>
				<span className="txt" title={FormatHelper.formatAmount(amount, asset.get('precision'))}>
					{FormatHelper.formatAmount(amount, asset.get('precision'))}
				</span>
				<span className="name">
					<Link href={SSR_ASSET_PATH} as={URLHelper.createUrlById(asset.get('id'))}>
						<a className="link">{asset.get('symbol')}</a>
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
					{title}: <span className="gray">{count || 'None'}</span>
				</div>
				{ elements.length !== 0 &&
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
				}
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
