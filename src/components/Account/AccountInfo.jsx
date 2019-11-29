import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from 'rc-tooltip';

import { ECHO_ASSET, MAX_ACCOUNT_LETTERS_SIZE } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

class AccountInfo extends React.Component {

	render() {
		const { id, name, echo } = this.props;

		const assetAmount = FormatHelper.formatAmount(echo.amount, echo.asset.get('precision'));
		// assetAmount = '3000000000000000030000000000000000';

		return (
			<div className="left-card">
				<div className="line">
					<div className="title">Account name</div>
					<div className="val">{name}</div>
				</div>
				<div className="line">
					<div className="title">Echo balance</div>
					{
						echo ?
							<div className="val">
								{assetAmount.length > MAX_ACCOUNT_LETTERS_SIZE ? (
									<Tooltip
										placement="top"
										overlayClassName="verify-contract-tooltip"
										trigger={['hover']}
										overlay={assetAmount}
									>
										<span className="txt">
											{
												assetAmount.length > MAX_ACCOUNT_LETTERS_SIZE ?
													assetAmount.slice(0, 22).concat('...') : assetAmount
											}
										</span>
									</Tooltip>
								) : (
									<span className="txt">
										{
											assetAmount.length > MAX_ACCOUNT_LETTERS_SIZE ?
												assetAmount.slice(0, 22).concat('...') : assetAmount
										}
									</span>
								)
								}
								<span className="accent">
									<Link to={URLHelper.createUrlById(ECHO_ASSET.ID)} className="blue">
										{ECHO_ASSET.SYMBOL}
									</Link>
								</span>
							</div> :
							<div className="val"><span className="txt">None</span></div>
					}
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
