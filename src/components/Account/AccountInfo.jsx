import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Tooltip from 'rc-tooltip';
import Media from 'react-media';

import { ECHO_ASSET } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import { OBJECTS_PATH, SSR_ASSET_PATH } from '../../constants/RouterConstants';

class AccountInfo extends React.Component {

	renderEcho() {
		const { echo } = this.props;
		if (!echo) return <div className="val"><span className="txt">None</span></div>;
		console.log('echo.asset', echo.asset.get);
		const assetAmount = FormatHelper.formatAmount(echo.amount, echo.asset.get('precision'));
		return (
			<div className="val">
				{/*<Media query="(max-width: 760px)">*/}
				{/*	{*/}
				{/*		(matches) => (matches ? (*/}
				{/*			<Tooltip*/}
				{/*				placement="top"*/}
				{/*				overlayClassName="verify-contract-tooltip"*/}
				{/*				trigger={['hover']}*/}
				{/*				overlay={assetAmount}*/}
				{/*			>*/}
				{/*				<span className="txt">{assetAmount}</span>*/}
				{/*			</Tooltip>*/}
				{/*		) : <span className="amount">{assetAmount}</span>)*/}
				{/*	}*/}
				{/*</Media>*/}
				<span className="blue">
					<Link href={SSR_ASSET_PATH} as={URLHelper.createUrlById(ECHO_ASSET.ID)} >
						<span className="blue">&nbsp;{ECHO_ASSET.SYMBOL}</span>
					</Link>
				</span>
			</div>
		);
	}

	render() {
		const { id, name } = this.props;
		return (
			<div className="left-card">
				<div className="line">
					<div className="title">Account name</div>
					<div className="divider" />
					<div className="val">{name}</div>
				</div>
				<div className="line">
					<div className="title">ECHO Balance</div>
					<div className="divider" />
					{this.renderEcho()}
				</div>
				<div className="line">
					<Link href={OBJECTS_PATH} as={URLHelper.createObjectsUrl(id)}>
						<a className="raw-link blue">Raw account object</a>
					</Link>
				</div>
			</div>
		);
	}

}

AccountInfo.propTypes = {
	echo: PropTypes.object,
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

AccountInfo.defaultProps = {
	echo: null,
};

export default AccountInfo;
