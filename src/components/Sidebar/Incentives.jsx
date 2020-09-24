import React from 'react';
import { LineChart, Line } from 'recharts';
import PropTypes from 'prop-types';
import InfoTooltip from '../../components/InfoTooltip';
import { SIDEBAR_CHART_WIDTH, SIDEBAR_CHART_HEIGHT } from '../../constants/UiConstants';

const Incentives = ({
	pinned, incentivesPool, incentive, incentiveRates,
}) => (
	<div className="blockchain-rates-wrap">
		<div className="sidebar-element-block">
			<div className="sidebar-element-block-title">
				Incentive Pool
				<InfoTooltip overlay="Current Echo's Reward Pool" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">{incentivesPool}%</div>
			</div>
		</div>
		<div className="sidebar-element-block">
			<div className="sidebar-element-block-title">
				Incentives
				<InfoTooltip overlay="Staking profitability and current Echo's Reward increasing" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">{incentive}%</div>
				<LineChart
					width={pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH}
					height={SIDEBAR_CHART_HEIGHT}
					data={incentiveRates}
				>
					<Line
						isAnimationActive={false}
						dot={false}
						type="monotone"
						dataKey="rate"
						stroke="#2995D8"
					/>
				</LineChart>
			</div>
		</div>
	</div>
);

Incentives.propTypes = {
	pinned: PropTypes.bool.isRequired,
	incentivesPool: PropTypes.number.isRequired,
	incentive: PropTypes.number.isRequired,
	incentiveRates: PropTypes.array.isRequired,
};


export default Incentives;
