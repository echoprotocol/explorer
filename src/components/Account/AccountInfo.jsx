import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ECHO_ASSET } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';

class AccountInfo extends React.Component {

	render() {
		const { name, echo } = this.props;

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
									{
										FormatHelper.formatAmount(
											echo.amount,
											echo.asset.get('precision'),
										)
									}
								</span>
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
					<Link to="" className="raw-link blue">
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
};

AccountInfo.defaultProps = {
	echo: null,
};

export default AccountInfo;
