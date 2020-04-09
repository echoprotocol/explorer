import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import { SSR_CONTRACT_PATH } from '../../constants/RouterConstants';

class TokenBalances extends React.Component {

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

	renderElement(amount, contract) {
		const { id, token: { symbol, decimals } } = contract;

		return (
			<div key={id} className={classnames('inner-elem')}>
				<span className="txt" title={FormatHelper.formatAmount(amount, parseInt(decimals, 10))}>
					{FormatHelper.formatAmount(amount, parseInt(decimals, 10))}
				</span>
				<span className="blue">
					<Link href={SSR_CONTRACT_PATH} as={URLHelper.createUrlById(id)}>
						<a className="blue">{symbol}</a>
					</Link>
				</span>
			</div>
		);
	}

	render() {
		const { tokens, title } = this.props;
		const { isLoadedMore, DEFAULT_COUNT } = this.state;
		const count = tokens.size || tokens.length;

		const elements = isLoadedMore ? tokens : tokens.slice(0, DEFAULT_COUNT);

		return (
			<div className="elem">
				<div className="title">
					{title}: <span className="gray">{count || 'None'}</span>
				</div>
				{ elements.length !== 0 &&
					<div className="elements-container">
						{
							elements.map(({ amount, contract }) => this.renderElement(
								amount,
								contract,
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

TokenBalances.propTypes = {
	tokens: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	title: PropTypes.string.isRequired,
};

TokenBalances.defaultProps = {
	tokens: null,
};

export default TokenBalances;
