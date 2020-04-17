import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { ECHO_ASSET } from '../../../constants/GlobalConstants';
import { SSR_ACCOUNTS_PATH, SSR_ASSET_PATH } from '../../../constants/RouterConstants';
import URLHelper from '../../../helpers/URLHelper';

import Avatar from '../../Avatar';
import SsrHrefHelper from '../../../helpers/SsrHrefHelper';
import FormatHelper from '../../../helpers/FormatHelper';

const LinkRow = ({
	title, account, link, isLinkOut, objectId, asset, amount, rate, className,
}) => (
	<div className={`od-row ${className}`}>
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{account &&
				<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createUrlById(account.link)}>
					<a className="avatar-wrap">
						<Avatar accountName={account.value} />
						<span>{account.value}</span>
					</a>
				</Link>
			}
			{asset &&
				<div>
					<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(asset.link)} >
						<a className="blue">{asset.value}</a>
					</Link>
				</div>
			}
			{amount &&
				<div>
					<span className="txt">{FormatHelper.formatAmount(amount.amount, amount.precision)} </span>
					<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(amount.asset_id)} >
						<a className="blue">{amount.symbol}</a>
					</Link>
				</div>
			}
			{objectId &&
				<Link href={SsrHrefHelper.getHrefByObjectId(objectId)} as={URLHelper.createUrlById(objectId)}>
					<a>{objectId}</a>
				</Link>
			}
			{rate &&
				<div>
					<span className="txt">{rate.amount} </span>
					<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO_ASSET.ID)}>
						<a className="blue">{ECHO_ASSET.SYMBOL}</a>
					</Link>
					{/* <span className="gray">&nbsp;/&nbsp;</span> */}
					{/* <span className="gray">{rate.symbol}</span> */}
				</div>
			}
			{link && !isLinkOut &&
				<Link href={link} as={URLHelper.createUrlById}>
					<a href="">{link}</a>
				</Link>
			}
			{link && isLinkOut &&
				<a href={link} className="link" target="_blank" rel="noopener noreferrer">{link}</a>
			}
		</div>
	</div>
);

LinkRow.propTypes = {
	title: PropTypes.string.isRequired,
	account: PropTypes.object,
	amount: PropTypes.object,
	rate: PropTypes.object,
	objectId: PropTypes.string,
	asset: PropTypes.object,
	link: PropTypes.string,
	isLinkOut: PropTypes.bool,
	className: PropTypes.string,
};

LinkRow.defaultProps = {
	account: null,
	amount: null,
	asset: null,
	rate: null,
	link: '',
	objectId: '',
	isLinkOut: false,
	className: '',
};

export default LinkRow;
