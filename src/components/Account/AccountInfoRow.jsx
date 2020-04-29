import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import InfoTooltip from '../InfoTooltip';

const AccountInfoRow = React.memo(({
	title, value, link, amount, tooltip, amountLink, additionalLink,
}) => (
	<React.Fragment>
		{!additionalLink &&
		<div className="line">
			{title &&
			<div className="title">
				<span>{title}</span>
				{tooltip &&
				<InfoTooltip overlay={tooltip} iconFilled={false} />
				}
			</div>
			}
			<div className="divider" />
			{value &&
			<div className="val name">
				{link ?
					<Link
						href={link.href}
						as={link.as}
					>
						<a className="link">{value}</a>
					</Link> : value
				}
			</div>
			}
			{amount &&
			<div className="val">
				<span className="amount">
					{amount.value}
				</span>
				<span className="currency">
					{amountLink ?
						<Link href={amountLink.href} as={amountLink.as}>
							<a className="link">&nbsp;{amount.symbol}</a>
						</Link> : <span>&nbsp;{amount.symbol}</span>}
				</span>
			</div>
			}
		</div>}
		{additionalLink &&
			<div className="line additional">
				<Link href={additionalLink.href} as={additionalLink.as}>
					<a className="raw-link blue">{additionalLink.value}</a>
				</Link>
			</div>}
	</React.Fragment>
));

AccountInfoRow.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	tooltip: PropTypes.string,
	amount: PropTypes.object,
	link: PropTypes.object,
	amountLink: PropTypes.object,
	additionalLink: PropTypes.object,
};

AccountInfoRow.defaultProps = {
	value: '',
	tooltip: '',
	amount: null,
	link: null,
	amountLink: null,
	additionalLink: null,
};

export default AccountInfoRow;
