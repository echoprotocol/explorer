import React from 'react';
import { LineChart, Line } from 'recharts';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { SIDEBAR_CHART_WIDTH, SIDEBAR_CHART_HEIGHT } from '../../constants/UiConstants';
import FormatHelper from '../../helpers/FormatHelper';
import URLHelper from '../../helpers/URLHelper';
import { ECHO_ASSET } from '../../constants/GlobalConstants';
import { SSR_ASSET_PATH } from '../../constants/RouterConstants';

const FrozenFunds = ({ currentFrozenData, frozenData }) => (
	<React.Fragment>
		<div className="frozen-funds-wrap">
			<div className="sidebar-element-block">
				<div className="sidebar-element-block-title">Comitee amount</div>
				<div className="frozen-funds-block-info">
					<div className="comitee-amount">
						<div className="comitee-amount-value">
							{FormatHelper.formatAmount(currentFrozenData.committee_freeze_sum)}
						</div>
						<div className="comitee-amount-coin">
							<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO_ASSET.ID)}>
								<a href="" className="total-supply-coin">
									{ECHO_ASSET.SYMBOL}
								</a>
							</Link>
						</div>
					</div>
					<LineChart
						width={SIDEBAR_CHART_WIDTH}
						height={SIDEBAR_CHART_HEIGHT}
						data={frozenData}
					>
						<Line
							isAnimationActive={false}
							dot={false}
							type="monotone"
							dataKey="committee_freeze_sum"
							stroke="#2995D8"
						/>
					</LineChart>
				</div>
			</div>
			<div className="sidebar-element-block">
				<div className="sidebar-element-block-title">Users amount</div>
				<div className="frozen-funds-block-info">
					<div className="users-amount">
						<div className="users-amount-value">
							{FormatHelper.formatAmount(currentFrozenData.accounts_freeze_sum)}
						</div>
						<div className="users-amount-coin">
							<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO_ASSET.ID)}>
								<a href="" className="total-supply-coin">
									{ECHO_ASSET.SYMBOL}
								</a>
							</Link>
						</div>
					</div>
					<LineChart
						width={SIDEBAR_CHART_WIDTH}
						height={SIDEBAR_CHART_HEIGHT}
						data={frozenData}
					>
						<Line
							isAnimationActive={false}
							dot={false}
							type="monotone"
							dataKey="accounts_freeze_sum"
							stroke="#2995D8"
						/>
					</LineChart>
				</div>
			</div>
		</div>
		{/* <a href="" className="sidebar-element-link">View all Frozen funds</a> */}

	</React.Fragment>
);

FrozenFunds.propTypes = {
	currentFrozenData: PropTypes.object.isRequired,
	frozenData: PropTypes.array.isRequired,
};

export default FrozenFunds;
