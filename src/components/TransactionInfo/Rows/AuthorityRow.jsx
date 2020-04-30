import React from 'react';
import PropTypes from 'prop-types';
import { validators } from 'echojs-lib';
import Link from 'next/link';

import { SSR_ACCOUNTS_PATH } from '../../../constants/RouterConstants';

import InfoTooltip from '../../../components/InfoTooltip';
import URLHelper from '../../../helpers/URLHelper';

const AuthorityRow = ({
	title, authority, tooltip, weightThreshold,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{tooltip &&
				<span className="description">
					<span className="description-main">
						Public keys and accounts
					</span>
					<span className="description-secondary">
						<InfoTooltip
							overlay={tooltip}
							iconFilled={false}
							placement="topLeft"
						/>
						<span className="description-secondary__name">Treshold:&nbsp;</span>
						<span className="description-secondary__value">{weightThreshold}</span>
					</span>
				</span>}
			{authority.map((item) => (
				<div className="authority-field" key={item.value}>
					<div className="authority-field__info">
						{!validators.isAccountId(item.link) ? (
							<span>{item.value}</span>
						) : (
							<Link href={SSR_ACCOUNTS_PATH} className="link" as={URLHelper.createAccountUrl(item.value)}>
								<a href="">{item.value}</a>
							</Link>
						)}
						{item.weight &&
						<span className="authority-field__info-description">
							<span>Weight:&nbsp;</span>
							<span>{item.weight}</span>
						</span>}
					</div>
				</div>
			))
			}
		</div>
	</div>
);

AuthorityRow.propTypes = {
	title: PropTypes.string.isRequired,
	authority: PropTypes.array,
	tooltip: PropTypes.string,
	weightThreshold: PropTypes.number,
};

AuthorityRow.defaultProps = {
	authority: [],
	tooltip: '',
	weightThreshold: 1,
};

export default AuthorityRow;
