import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InfoTooltip from '../../components/InfoTooltip';

import URLHelper from '../../helpers/URLHelper';

import Avatar from '../Avatar';
import AuthorityRow from './AuthorityRow';


const OperationInfoRow = ({
	title, description, account, link, tooltip, authority,
}) => {
	console.log(authority);
	return (
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
				<Link className="avatar-wrap" to={URLHelper.createUrlById(account.id)}>
					<Avatar accountName={account.name} />
					<span>{account.name}</span>
				</Link>
				}
				{link &&
				<Link className="avatar-wrap" to={link}>
					{link}
				</Link>
				}
				{authority.length !== 0 &&
				authority.map((item, idx) => {
					if (idx === 0) {
						return <AuthorityRow value={item.value} weight="1" withButton key={item.value} />;
					}
					return <AuthorityRow value={item.value} weight="1" key={item.value} />;
				})
				}
			</div>
		</div>
	);
};

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
