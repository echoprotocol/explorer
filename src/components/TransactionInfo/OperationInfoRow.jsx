import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import InfoTooltip from '../../components/InfoTooltip';

import URLHelper from '../../helpers/URLHelper';

import Avatar from '../Avatar';
import AccountField from './AccountField';
import SettingsField from './SettingsField';
import MultyField from './MultyField';
import ProducersField from './ProducersField';

const OperationInfoRow = ({
	title, description, account, link, tooltip, authority, isText, settings, fields, accounts,
}) => {
	console.log(authority);
	return (
		<div className="od-row">
			<div className="od-col">{title}:</div>
			<div className="od-col">
				{(description && !tooltip) && <span className={cn('description', { text: isText })}><span className="description-main">{description}</span></span>}
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
				<Link className="avatar-wrap" to={URLHelper.createUrlById(account.link)}>
					<Avatar accountName={account.value} />
					<span>{account.value}</span>
				</Link>
				}
				{link &&
				<Link to={link}>
					{link}
				</Link>
				}
				{authority.length !== 0 &&
				authority.map((item, idx) => {
					if (idx === 0) {
						return <AccountField value={item.value} weight="1" withButton key={item.value} />;
					}
					return <AccountField value={item.value} weight="1" key={item.value} />;
				})
				}
				{settings.length !== 0 && <SettingsField settings={settings} />}
				{fields.length !== 0 && <MultyField fields={fields} />}
				{accounts.length !== 0 && <ProducersField accounts={accounts} />}
			</div>
		</div>
	);
};

OperationInfoRow.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	account: PropTypes.object,
	link: PropTypes.string,
	tooltip: PropTypes.string,
	authority: PropTypes.array,
	isText: PropTypes.bool,
	settings: PropTypes.array,
	fields: PropTypes.array,
	accounts: PropTypes.array,
};

OperationInfoRow.defaultProps = {
	description: '',
	account: null,
	link: '',
	authority: [],
	tooltip: '',
	isText: false,
	settings: [],
	fields: [],
	accounts: [],
};

export default OperationInfoRow;
