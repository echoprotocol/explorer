import React from 'react';
import { LineChart, Line } from 'recharts';
import PropTypes from 'prop-types';
import InfoTooltip from '../../components/InfoTooltip';
import { SIDEBAR_CHART_WIDTH, SIDEBAR_CHART_HEIGHT } from '../../constants/UiConstants';

const BlockchainRates = ({
	pinned, delegationRate, delegationRates, decentralizationRate, decentralizationRates,
}) => (
	<div className="sidebar-el-wrap">
		<div className="sidebar-el">
			<div className="sidebar-element-block-title">
				Delegation rate
				<InfoTooltip overlay="Percentage of consensus messages sent by the delegate on behalf of the original user" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">{delegationRate}%</div>
				<LineChart
					width={pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH}
					height={SIDEBAR_CHART_HEIGHT}
					data={delegationRates}
				>
					<Line
						dot={false}
						isAnimationActive={false}
						type="monotone"
						dataKey="rate"
						stroke="#2995D8"
					/>
				</LineChart>
			</div>
		</div>
		<div className="sidebar-el">
			<div className="sidebar-element-block-title">
				Decentralisation rate
				<InfoTooltip overlay="Percentage of unique accounts participated in the consensus" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">{decentralizationRate}%</div>
				<LineChart
					width={pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH}
					height={SIDEBAR_CHART_HEIGHT}
					data={decentralizationRates}
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

BlockchainRates.propTypes = {
	pinned: PropTypes.bool.isRequired,
	delegationRate: PropTypes.number.isRequired,
	decentralizationRate: PropTypes.number.isRequired,
	delegationRates: PropTypes.array.isRequired,
	decentralizationRates: PropTypes.array.isRequired,
};


export default BlockchainRates;
