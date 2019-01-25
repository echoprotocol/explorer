import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

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

	renderElement(asset, stats, isOwner) {
		return (
			<div key={stats.get('id')} className={classnames('inner-elem', { 'is-owner': isOwner })}>
				<span className="txt">
					{FormatHelper.formatAmount(stats.get('balance'), asset.get('precision'))}
				</span>
				<span className="accent">
					<Link to={URLHelper.createUrlById(asset.get('id'))} className="blue">
						{asset.get('symbol')}
					</Link>
				</span>
			</div>
		);
	}

	render() {
		const { owner, balances } = this.props;
		const { isLoadedMore, DEFAULT_COUNT } = this.state;
		const count = balances.count();

		const elements = isLoadedMore ? balances : balances.slice(0, DEFAULT_COUNT);

		return (
			<div className="elem">
				<div className="title">
					other assets: {count || <span className="gray">none</span>}
				</div>
				<div className="elements-container">
					{
						elements.reduce((arr, { stats, asset }) => ([
							...arr,
							this.renderElement(
								asset,
								stats,
								owner.includes(asset.get('id')),
							),
						]), [])
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
	balances: PropTypes.object,
	owner: PropTypes.object,
};

AssetBalances.defaultProps = {
	balances: null,
	owner: null,
};

export default AssetBalances;
