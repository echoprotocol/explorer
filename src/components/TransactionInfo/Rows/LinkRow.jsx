import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { ECHO_ASSET } from '../../../constants/GlobalConstants';
import { SSR_ACCOUNTS_PATH, SSR_ASSET_PATH, SSR_CONTRACT_PATH } from '../../../constants/RouterConstants';
import URLHelper from '../../../helpers/URLHelper';

import Avatar from '../../Avatar';
import SsrHrefHelper from '../../../helpers/SsrHrefHelper';
import FormatHelper from '../../../helpers/FormatHelper';

const LinkRow = ({
	title, account, link, isLinkOut, objectId, asset, amount,
	rate, value, className, contract, linkTitle, token,
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
			{contract &&
				<div>
					<Link href={SSR_CONTRACT_PATH} as={URLHelper.createContractUrl(contract)} >
						<a className="blue">{contract}</a>
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
			{token &&
				<div>
					<span className="txt">{FormatHelper.formatAmount(token.amount, token.precision)} </span>
					<Link href={SSR_CONTRACT_PATH} as={URLHelper.createContractUrl(token.link)} >
						<a className="blue">{token.symbol}</a>
					</Link>
				</div>
			}
			{objectId &&
				<Link href={SsrHrefHelper.getHrefByObjectId(objectId)} as={URLHelper.createUrlById(objectId)}>
					<a>{linkTitle || objectId}</a>
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
					<a href={link}>{linkTitle || link}</a>
				</Link>
			}
			{link && isLinkOut &&
				<a href={link} className="link" target="_blank" rel="noopener noreferrer external" >{value || link}</a>
			}
		</div>
	</div>
);

LinkRow.propTypes = {
	title: PropTypes.string.isRequired,
	account: PropTypes.object,
	contract: PropTypes.string,
	amount: PropTypes.object,
	rate: PropTypes.object,
	objectId: PropTypes.string,
	asset: PropTypes.object,
	token: PropTypes.object,
	link: PropTypes.string,
	value: PropTypes.string,
	isLinkOut: PropTypes.bool,
	className: PropTypes.string,
	linkTitle: PropTypes.string,
};

LinkRow.defaultProps = {
	account: null,
	token: null,
	contract: '',
	amount: null,
	asset: null,
	rate: null,
	link: '',
	value: '',
	objectId: '',
	isLinkOut: false,
	className: '',
	linkTitle: '',
};

export default LinkRow;
