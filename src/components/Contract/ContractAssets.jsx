import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { MAX_WIDTH_SCREEN } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';

class ContractAssets extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMore: false,
		};
	}

	renderAsset(id, asset, amount) {
		return (
			<li key={id}>
				<span className="value">{FormatHelper.formatAmount(amount, asset.get('precision'))}</span>
				<span className="currency">{asset.get('symbol')}</span>
			</li>
		);
	}

	render() {
		const { data } = this.props;
		const { showMore } = this.state;
		const balances = data.get('balances');
		const countAssets = data.get('balances').size;

		return (
			<React.Fragment>
				<div className="assets-title">assets:{countAssets || <span className="gray">none</span>}</div>
				<ul className="assets-list">
					{
						balances.slice(0, 2).map(({ amount, asset, id }) => this.renderAsset(
							id,
							asset,
							amount,
						))
					}
					{/* if max-width: 768px show 2 assets in preview, else show 4 */}
					<Media query={`(max-width: ${MAX_WIDTH_SCREEN})`}>
						{(matches) =>
							!matches && balances.slice(2, 2).map(({ amount, asset, id }) => this.renderAsset(
								id,
								asset,
								amount,
							))
						}
					</Media>
					{showMore && balances.slice(window.innerWidth > MAX_WIDTH_SCREEN ? 4 : 2).map(({ amount, asset, id }) => this.renderAsset(
						id,
						asset,
						amount,
					))}
				</ul>
				{countAssets > 2 && (
					<button className="text-button" onClick={() => this.setState({ showMore: !showMore })}>
						{!showMore ? 'Show less' : `View ${window.innerWidth > MAX_WIDTH_SCREEN ? (countAssets - 4) : (countAssets - 2)} more`}
					</button>
				)}
			</React.Fragment>
		);
	}

}


ContractAssets.propTypes = {
	data: PropTypes.object.isRequired,
};

ContractAssets.defaultProps = {};

export default ContractAssets;
