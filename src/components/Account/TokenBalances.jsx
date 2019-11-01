import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

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
		console.log(decimals);
		return (
			<div key={id} className={classnames('inner-elem')}>
				<span className="txt">
					{FormatHelper.formatAmount(amount, parseInt(decimals, 10))}
				</span>
				<span className="accent">
					<Link to={URLHelper.createUrlById(id)} className="blue">
						{symbol}
					</Link>
				</span>
			</div>
		);
	}

	render() {
		const { owner, tokens, title } = this.props;
		const { isLoadedMore, DEFAULT_COUNT } = this.state;
		const count = tokens.size || tokens.length;

		const elements = isLoadedMore ? tokens : tokens.slice(0, DEFAULT_COUNT);

		return (
			<div className="elem">
				<div className="title">
					{title}: {count || <span className="gray">none</span>}
				</div>
				<div className="elements-container">
					{
						elements.map(({ amount, contract }) => this.renderElement(
							amount,
							contract,
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

TokenBalances.propTypes = {
	tokens: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	owner: PropTypes.object,
	title: PropTypes.string.isRequired,
};

TokenBalances.defaultProps = {
	tokens: null,
	owner: null,
};

export default TokenBalances;
