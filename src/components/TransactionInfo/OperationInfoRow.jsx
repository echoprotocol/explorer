import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import InfoTooltip from '../../components/InfoTooltip';

import URLHelper from '../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH } from '../../constants/RouterConstants';

import Avatar from '../Avatar';
import AuthorityRow from './AuthorityRow';


const OperationInfoRow = ({
	title, description, account, id, tooltip, authority,
}) => (
	<div className="od-row">
		<div className="od-col">{title}</div>
		<div className="od-col">
			{(description && !tooltip) && <span className="description"><span className="description-main">{description}</span></span>}
			{(description && tooltip) &&
				<span className="description">
					<span className="description-main">
						{description}
					</span>
					<span className="description-secondary">
						<InfoTooltip
							overlay={tooltip}
							iconFilled={false}
							placement="topLeft"
						/>
						<span className="description-secondary__name">Treshold:&nbsp;</span>
						<span className="description-secondary__value">1</span>
					</span>
				</span>}
			{account &&
				<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createUrlById(account.id)}>
					<a className="avatar-wrap">
						<Avatar accountName={account.name} />
						<span>{account.name}</span>
					</a>
				</Link>
			}
			{id &&
				<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createUrlById(id)}>
					<a className="avatar-wrap">
						{URLHelper.createUrlById(id)}
					</a>
				</Link>
			}
			{authority.length !== 0 &&
				authority.map((item) => <AuthorityRow value={item.value} weight="1" />)
			}
		</div>
	</div>
);

OperationInfoRow.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	account: PropTypes.object,
	id: PropTypes.string,
	tooltip: PropTypes.string,
	authority: PropTypes.array,
};

OperationInfoRow.defaultProps = {
	description: '',
	account: null,
	id: '',
	authority: [],
	tooltip: '',
};

export default OperationInfoRow;
