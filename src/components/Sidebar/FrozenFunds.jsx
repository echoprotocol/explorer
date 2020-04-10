import React from 'react';
import { LineChart, Line } from 'recharts';
import PropTypes from 'prop-types';
import { SIDEBAR_CHART_WIDTH, SIDEBAR_CHART_HEIGHT } from '../../constants/UiConstants';
import { ECHO_ASSET } from '../../constants/GlobalConstants';

const FrozenFunds = ({ currentFrozenData, frozenData }) => (
	<React.Fragment>
		<div className="frozen-funds-wrap">
			<div className="sidebar-element-block">
				<div className="sidebar-element-block-title">Comitee amount</div>
				<div className="frozen-funds-block-info">
					<div className="comitee-amount">
						<div className="comitee-amount-value">
							{currentFrozenData.committee_freeze_sum / (10 ** ECHO_ASSET.PRECISION)}
						</div>
						<div className="comitee-amount-coin">ECHO</div>
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
							{currentFrozenData.accounts_freeze_sum / (10 ** ECHO_ASSET.PRECISION)}
						</div>
						<div className="users-amount-coin">ECHO</div>
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
