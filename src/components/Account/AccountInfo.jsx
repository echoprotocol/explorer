import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CROPPED_ACCOUNT_SIZE, ECHO_ASSET, MAX_ACCOUNT_LETTERS_SIZE } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import MediaAssetTooltip from '../MediaAssetTooltip';


class AccountInfo extends React.Component {

	render() {
		const { id, name, echo } = this.props;

		const assetAmount = FormatHelper.formatAmount(echo.amount, echo.asset.get('precision'));

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
								<span className="txt">
									<MediaAssetTooltip
										maxWidth={800}
										assetAmount={assetAmount}
										maxSize={MAX_ACCOUNT_LETTERS_SIZE}
										croppedSize={CROPPED_ACCOUNT_SIZE}
									/>
								</span>
								<span className="accent">
									<Link to={URLHelper.createUrlById(ECHO_ASSET.ID)} className="blue">
										&nbsp;{ECHO_ASSET.SYMBOL}
									</Link>
								</span>
							</div> : <div className="val"><span className="txt">None</span></div>
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
