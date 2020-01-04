import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from 'rc-tooltip';
import Media from 'react-media';

import { ECHO_ASSET } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';


class AccountInfo extends React.Component {

	renderEcho() {
		const { echo } = this.props;
		if (!echo) return <div className="val"><span className="txt">None</span></div>;
		const assetAmount = FormatHelper.formatAmount(echo.amount, echo.asset.get('precision'));
		return (
			<div className="val">
				<Media query="(max-width: 760px)">
					{
						(matches) => (matches ? (
							<Tooltip
								placement="top"
								overlayClassName="verify-contract-tooltip"
								trigger={['hover']}
								overlay={assetAmount}
							>
								<span className="txt">{assetAmount}</span>
							</Tooltip>
						) : <span>{assetAmount}</span>)
					}
				</Media>
				<span className="accent">
					<Link to={URLHelper.createUrlById(ECHO_ASSET.ID)} className="blue">
						&nbsp;{ECHO_ASSET.SYMBOL}
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
					<div className="val">{name}</div>
				</div>
				<div className="line">
					<div className="title">Echo balance</div>
					{this.renderEcho()}
				</div>
				<div className="line">
					<Link to={URLHelper.createObjectsUrl(id)} className="raw-link blue">
						Raw account object
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
