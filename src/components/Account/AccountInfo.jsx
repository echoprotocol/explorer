import React from 'react';
import PropTypes from 'prop-types';

import { ECHO_ASSET } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';

class AccountInfo extends React.Component {

	render() {
		const { name, echo } = this.props;

		return (
			<div className="left-card">
				<div className="line">
					<div className="title">Account name</div>
					<div className="val">{name}</div>
				</div>
				{
					echo ?
						<div className="line">
							<div className="title">Echo balance</div>
							<div className="val">
								<span className="txt">
									{
										FormatHelper.formatAmount(
											echo.stats.get('balance'),
											echo.asset.get('precision'),
										)
									}
								</span>
								<span className="accent">{ECHO_ASSET.SYMBOL}</span>
							</div>
						</div> : null
				}
			</div>
		);
	}

}

AccountInfo.propTypes = {
	echo: PropTypes.object,
	name: PropTypes.string.isRequired,
};

AccountInfo.defaultProps = {
	echo: null,
};

export default AccountInfo;
